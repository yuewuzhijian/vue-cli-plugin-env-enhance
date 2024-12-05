import minimist from 'minimist'

export const pluginName = 'env-enhance'

export interface PluginOptions {
  /** The directory from which .env files are loaded, refer to vite */
  envDir?: string

  /** Env variables starting with envPrefix will be exposed to your client source code, refer to vite */
  envPrefix?: string | string[]

  /** Whether to inject env variables to "import.meta.env" */
  useImportMetaEnv?: boolean
}

export function getCurrentMode() {
  const { mode, _ } = minimist(process.argv.slice(2))
  if (mode) {
    return mode as string
  }

  switch (_[0]) {
    case 'serve':
      return 'development'
    case 'build':
      return 'production'
    case 'test':
      return 'test'
    default:
      return 'development'
  }
}

export { loadEnv } from './vite/env'
