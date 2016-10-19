
# angular前端项目架构2

<pre>
|____dist/ (运行目录，发布时的目录)
| |____css/ (样式目录，放置编译后或外部样式库)
| | |____bootstrap.min.css(bootstrap样式库)
| |____js/ (js目录，放置编译/打包后的js或外部js库)
| | |____common.bundle.js(由webpack打包的js公共部分)
| | |____main.bundle.js(由webpack打包的主js部分)
| |____pages/ (存放html页面)
| | |____index.html(首页)
| |____tpls/ (存放页面模板)
| |____images/ (存放图片)
| |____lib/ (存放字体、插件包等)

|____src/ (工程目录，编译/打包前的目录)
| |____jade/ (存放jade模板引擎)
| |____js/ (存放公共js，包括Angluar结构的js)
| | |____entry.js (webpack打包入口)
| | |____plugins/ (存放来之外部，并且需要一并打包的js库)
| | |____config/ (配置)
| | |____controllers/ (控制器)
| | |____directives/ (指令)
| | |____routes/ (路由)
| | |____services/ (公共服务)
| |____sass/ (存放sass)
| |____modules/ (存放模块，包含html、js、css)


|____.gitignore (git命令过滤掉的目录或文件)
|____gulpfile.js (gulp配置文件)
|____node_modules (内部模块文件，由npm安装)
|____package.json (模块文件的依赖和版本列表)
|____webpack.config.js (webpack的配置文件，可以由gulpfile中的配置代替)


详细模块依赖以及版本请查看gulpfile.js和package.json
</pre>

<h3>Let's work together</h3>
http://moerj.com
