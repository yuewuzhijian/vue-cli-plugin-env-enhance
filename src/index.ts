import { resolve } from 'node:path'
import type { ServicePlugin } from '@vue/cli-service'
import { loadEnv, pluginName } from './utils'

function getHumpPluginName(pluginName: string) {
  const arr = pluginName.split('-')
  for (let i = 1; i < arr.length; i++) {
    const first = arr[i].at(0)
    if (first) {
      arr[i] = first.toUpperCase() + arr[i].slice(1)
    }
  }
  return arr.join('')
}

const envEnhancePlugin: ServicePlugin = function (api, options) {
  const pluginOptions = (options.pluginOptions ?? {}) as any
  const config = pluginOptions[pluginName] || pluginOptions[getHumpPluginName(pluginName)]
  const root = process.cwd()
  const envDir: string = config?.envDir || root
  const envPrefix: string | string[] = config?.envPrefix || ['VUE_APP_', 'VITE_']
  const useImportMetaEnv =
    config?.useImportMetaEnv === undefined ? true : Boolean(config.useImportMetaEnv)

  api.chainWebpack(config => {
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })

      const processEnv = definitions[0]['process.env'] as Record<string, string>
      const MODE = api.service.mode as string
      const PROD = processEnv.NODE_ENV === JSON.stringify('production')
      const DEV = !PROD

      if (resolve(envDir) !== root) {
        const oldEnv = loadEnv(MODE, root, '', false)
        const newEnv = loadEnv(MODE, envDir, '', false)

        Object.keys(oldEnv).forEach(key => {
          delete process.env[key]
        })
        Object.entries(newEnv).forEach(([key, value]) => {
          process.env[key] = value
        })
      }

      const env = loadEnv(MODE, envDir, envPrefix)

      Object.keys(processEnv).forEach(key => {
        if (!['NODE_ENV', 'BASE_URL'].includes(key)) {
          delete processEnv[key]
        }
      })
      Object.assign(processEnv, {
        MODE: JSON.stringify(MODE),
        PROD: JSON.stringify(PROD),
        DEV: JSON.stringify(DEV),
      })
      Object.entries(env).forEach(([key, value]) => {
        processEnv[key] = JSON.stringify(value)
      })

      if (useImportMetaEnv) {
        definitions[0]['import.meta.env'] = JSON.stringify({
          MODE,
          BASE_URL: JSON.parse(processEnv.BASE_URL),
          PROD,
          DEV,
          ...env,
        })
      }

      return definitions
    })
  })
}

export default envEnhancePlugin
