# vue-cli-plugin-env-enhance

A vue-cli plugin enhances env for a vite-like experience, also supporting the use of "import.meta.env".

## Translations

This README is also available in other languages:
- [简体中文](https://github.com/yuewuzhijian/vue-cli-plugin-env-enhance/blob/main/README.zh-CN.md) (Chinese)

## Install
```
npm install vue-cli-plugin-env-enhance -D
```

## Motivation
`vue-cli` is a great scaffolding for vue, and even though `vite` is becoming mainstream, 
there are still some scenarios where `vue-cli` is needed, e.g.: compatibility with lower versions of browsers, micro-frontends, code obfuscation.

But the configuration of `vue-cli` is not friendly compared to `vite`, such as the following:

1. Can't get the `mode` of the currently executed command in `vue.config.js` or in the project file.
2. The concept of `mode` and `NODE_ENV` are not completely separated, for example, when using the `build` command, if you specify `mode`, it may change `NODE_ENV` as well, and you have to reset `NODE_ENV`.
3. Unable to set the directory of `.env` files and the prefix of `env` variables exposed to clients like `vite`.

I decided to enhance the `env` of `vue-cli` to achieve a `vite`-like experience.

## Usage
```js
// vue.config.js
module.exports = {
  /* ... */
  pluginOptions: [
    "env-enhance": {
      /* ...options... */
    },
    
    // also support hump
    "envEnhance": {
      /* ...options... */
    }
  ],
}
```

## Options

| name             | value                                               | description                                                                      |
|------------------|-----------------------------------------------------|----------------------------------------------------------------------------------|
| envDir           | String (default: process.env())                     | The directory from which .env files are loaded                                   |
| envPrefix        | String \| String[] (default: ["VUE_APP_", "VITE_"]) | Env variables starting with envPrefix will be exposed to your client source code |
| useImportMetaEnv | Boolean (default: true)                             | Whether to inject env variables to "import.meta.env"                             |

## Examples
```
// .env.example
VUE_APP_EXAMPLE = a
VITE_EXAMPLE = b
EXAMPLE = c

// cmd
npx vue-cli-service serve --mode example
```

```js
// in project file
console.log(process.env)
// {
//   "NODE_ENV": "development",
//   "BASE_URL": "/",
//   "MODE": "example",
//   "PROD": false,
//   "DEV": true,
//   "VUE_APP_EXAMPLE": "a",
//   "VITE_EXAMPLE": "b"
// }
console.log(import.meta.env)
// {
//   "BASE_URL": "/",
//   "MODE": "example",
//   "PROD": false,
//   "DEV": true,
//   "VUE_APP_EXAMPLE": "a",
//   "VITE_EXAMPLE": "b"
// }
```

## Caveats
When you use `process.env` in `vue.config.js`, the plugin is not yet executed! 
If you change the value of `envDir`, you will not get the correct `env` variable at this point!

To do this, the plugin exposes two utility functions `getCurrentMode` and `loadEnv`.

If you must modify `envDir` and use the `env` variable in `vue.config.js`, see the following usage:

```js
// vue.config.js
const { getCurrentMode,loadEnv } = require('vue-cli-plugin-env-enhance/utils')

const mode = getCurrentMode()
console.log(mode)
// 'example'

const env = loadEnv(mode, 'your_env_dir', ['VUE_APP_', 'VITE_'])
console.log(env)
// { VUE_APP_EXAMPLE: 'a', VITE_EXAMPLE: 'b' }

module.exports = {
    /* ... */
}
```

## Related
- [vue-cli-plugin-import-meta](https://github.com/yuewuzhijian/vue-cli-plugin-import-meta)
- [vue-cli-plugin-tsconfig](https://github.com/yuewuzhijian/vue-cli-plugin-tsconfig)
