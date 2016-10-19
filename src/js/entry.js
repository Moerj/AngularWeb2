/*************
 * webpack入口 *
 *************/

// 引入css
// require('../sass/_main.scss');

// 引入公共CDN模块
// index页面script标签引入（必须在打包好的js前引入）


// 引入node_modules下依赖模块
window.$ = require("jquery");
var angular = require('angular');

// 引入非npm安装的模块，plugins目录下。注意：该方式仅在无法使用npm安装模块时使用
// ....


// 注册模块
angular.module('myModule', ['ui.router']);


// requires and returns all modules that match
function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

// 引入目录结构 (引入文件夹下所有js)
// 参数(模块文件夹路径, 是否包含子目录, 文件匹配的正则)
requireAll(require.context("./config", true, /^\.\/.*\.js$/));
requireAll(require.context("./controllers", true, /^\.\/.*\.js$/));
requireAll(require.context("./directives", true, /^\.\/.*\.js$/));
requireAll(require.context("./routes", true, /^\.\/.*\.js$/));
requireAll(require.context("./services", true, /^\.\/.*\.js$/));
requireAll(require.context("../modules", true, /^\.\/.*\.js$/));
