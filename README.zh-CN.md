# vue-cli-plugin-env-enhance

一个增强env的vue-cli插件，使其获得类似vite的体验, 还支持使用 "import.meta.env"。

## 安装

```
npm install vue-cli-plugin-env-enhance -D
```

## 动机

`vue-cli`是一个非常好用的vue脚手架，尽管`vite`成为了主流，但仍有部分场景需要`vue-cli`， 比如：兼容低版本浏览器、微前端、代码混淆。

但是`vue-cli`的配置相比`vite`并不友好，比如以下几点：

1. 无法在`vue.config.js`以及项目文件中获取当前执行命令的`mode`
2. `mode`与`NODE_ENV`的概念没有完全分离，譬如使用`build`命令时，如果指定了`mode`，可能会使`NODE_ENV`也发生改变，此时必须重新设置
   `NODE_ENV`
3. 无法像`vite`一样设置`.env`文件的目录和暴露到客户端的`env`变量的前缀

我决定增强`vue-cli`的`env`，达到堪比`vite`的使用体验

## 用法

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

## 选项

| 属性名              | 值                                                   | 描述                              |
|------------------|-----------------------------------------------------|---------------------------------|
| envDir           | String (default: process.env())                     | 用于加载 .env 文件的目录                 |
| envPrefix        | String \| String[] (default: ["VUE_APP_", "VITE_"]) | 以 envPrefix 开头的环境变量会暴露在你的客户端源码中 |
| useImportMetaEnv | Boolean (default: true)                             | 是否把环境变量注入到 "import.meta.env"    |

## 示例

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

## 注意事项

当你在`vue.config.js`中使用`process.env`时，插件还未执行！如果你修改了`envDir`的值，此时将无法获取到正确的`env`变量！

为此，插件暴露了两个工具函数`getCurrentMode`和`loadEnv`。

如果你一定要修改`envDir`,并在`vue.config.js`中使用`env`变量，请参考以下用法：

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

## 相关

- [vue-cli-plugin-import-meta](https://github.com/yuewuzhijian/vue-cli-plugin-import-meta)
- [vue-cli-plugin-tsconfig](https://github.com/yuewuzhijian/vue-cli-plugin-tsconfig)
