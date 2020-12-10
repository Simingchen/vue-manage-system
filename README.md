# 后台管理模板

后台管理项目基础搭建

## 目录结构

```
├── public                          项目配置
│   ├── index.html                  入口页面
│   └── favicon.ico
├── package.json                    npm包配置文件，依赖包等信息
├── .eslintrc.js                    eslint 规则，可自定义
├── src                             项目源码目录
│   ├── main.js                     入口js文件
│   ├── permission.js               路由守卫权限
│   ├── settings.js                 框架设置，比如主标题，导航栏是否固定，侧边是否打开
│   ├── app.vue                     根组件
│   ├── components                  公共组件目录
    │     ├── layout                页面布局组件目录
│   ├── assets                      资源目录
│   ├── plugins                     vue相关插件
│   ├── styles                      css样式目录
│   ├── icons                       svg 图标
│   ├── utils                       工具函数目录
│   ├── store                       应用级数据状态管理
│   │   └── index.js
│   └── views                       页面目录
└── vue.config.js                   VUE配置文件
```


## 开发统筹

1. 使用框架 VUE 2.0 + ElementUI + scss
2. webpack alias 别名，打包 img 图片限制
3. readme 文档等机制
4. 组件书写顺序  template script style(scoped) style(全局)
5. 统一缓存 api (h5 localStorage)
6. 路由变化，取消上一路由的所有请求
7. request 请求的配置封装，cancle 取消重复请求，取消所有请求
8. vue.config.js 插件 style-resources-loader 配置全局变量
9. css 不使用 > ~ 兄弟父子链接符，不用元素标签配对样式，层级不超过 3 层
10. 组件不能使用 css scoped, 使用外围 classname 进行限定，不推荐使用 /deep/
11. 测试页面 test/index.vue [http://localhost:8080/test](http://localhost:8080/test)
12. **慎用**获取 dom api，需注释代码需求
14. git 分支管理，参考[文档](https://github.com/Simingchen/git-document/blob/main/Git%20%E5%88%86%E6%94%AF%E7%AE%A1%E7%90%86%E7%AD%96%E7%95%A5.md)
15. 内置样式，尽量使用UI框架，例如单行，多行，单边框等
16. 项目部署统一由一人负责，发起部署请求，防止代码功能串行
17. store 模块化自动引入，文件夹命名，mutations 使用 restful 类格式（set, delete）,单个动词操作
18. vscode 配置扩展保存立即格式化，跟项目中 .eslintrc.js 搭配使用
19. lodash 等工具类，业务上引用即可，没必要全局使用
22. 存在异常的需要使用 try catch 包裹，防止阻塞代码。例如未知api, dom 的操作，localstoage 操作等
23. 主题 theme picker
24. 文字使用主题颜色  <el-link type="primary">{{ tag.title }}</el-link> 使用该标签对应

## 开发配置
1. 插件名：koroFileHeader  添加文件头、函数注释（文件类型无限制）,文件以该插件注释
2. 插件：editorconfig  编辑器代码格式化规则，可一般统一编辑器规则
  * .editorconfig配置

  ```
    root = true

    [*]
    charset = utf-8
    indent_style = tab
    indent_size = 2
    end_of_line = lf
    insert_final_newline = true
    trim_trailing_whitespace = true
  ```

3. 格式化插件： vetur 不换行
  // 对属性进行换行。
  // - auto: 仅在超出行长度时才对属性进行换行。
  // - force: 对除第一个属性外的其他每个属性进行换行。
  // - force-aligned: 对除第一个属性外的其他每个属性进行换行，并保持对齐。
  // - force-expand-multiline: 对每个属性进行换行。
  // - aligned-multiple: 当超出折行长度时，将属性进行垂直对齐。
  ```
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_attributes": "aligned-multiple"
        },
        "prettyhtml": {
            "printWidth": 100,
            "singleQuote": false,
            "wrapAttributes": false,
            "sortAttributes": false
        }
    },
    "vetur.format.defaultFormatter.html": "js-beautify-html",
  ```

## 项目须知

2. route 中文传参数
   * 传参数 const par = encodeURIComponent(JSON.stringify(item))
   * 接收参数 const detail = JSON.parse(decodeURIComponent(this.$route.query.item));
3. 页面命名，列表命名为 **List, 如 historyList
4. console.log(this.$store.getters['axios/list'])

## 代码特殊标记注释

**TODO ** 在该注释处有功能代码待编写，待实现的功能在说明中会简略说明
**FIXME ** 在该注释处代码需要修正，甚至代码是错误的，不能工作，需要修复，如何修正会在说明中简略说明
**XXX ** 在该注释处代码虽然实现了功能，但是实现的方法有待商榷，希望将来能改进，要改进的地方会在说明中简略说明
**NOTE ** 在该注释处说明代码如何工作
**HACK ** 在该注释处编写得不好或格式错误，需要根据自己的需求去调整程序代码
**BUG ** 在该注释处有 Bug

## 现行问题

