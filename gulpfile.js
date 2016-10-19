/************
 * gulp配置文件 *
 ************/

var gulp = require('gulp'); //gulp主功能
var path = require('path'); //获取路劲的模块
var $ = require('gulp-load-plugins')();


//当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
var notify = require('gulp-notify'); //提示信息
var plumber = require('gulp-plumber');

// webpack
var webpack = require("webpack"); //webpack主功能
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js'); //webpack插件，用于提取个公共js
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin(); //js压缩插件
var ProvidePlugin = new webpack.ProvidePlugin({  //暴露jquery到全局
		$ : "jquery",
		jQuery : "jquery",
		"window.jQuery" : "jquery"
	});
var webpack = require('webpack-stream'); //将webpack转为gulp流形式调用

// 同步刷新浏览器
var browserSync = require('browser-sync');
var reload = browserSync.reload;


var paths = {
    html: {
        entry: './src/modules/*.*',
        all: 'src/modules/**/*.html'
    },
    sass: {
        entry: './src/css/*.scss',
        all: 'src/css/**/*.scss'
    },
    js: {
        entry: './src/js/*.js',
        all: 'src/js/**/*.js'
    },
    images: {
        all: 'src/images/**/*.js'
    },
    json:{
        all: 'src/json/**/*.json'
    }
}

// =================================
// 开始配置
// =================================

// webpack function
function _webpack(isonce) {
    return gulp.src('src/js/entry.js')
        .pipe(webpack({
            watch: isonce, //是否监听js变化，watch：true 时，会默认开启catch：true 增量编译。
            plugins: [
                // UglifyJsPlugin,
                commonsPlugin,
                ProvidePlugin
            ],
            resolve : {
                // 目录重定向
				alias : {
					'~' : path.resolve(__dirname),//设置插项目的根路径
					'pluginsPath' : path.resolve(__dirname, 'src/', 'js/plugins')//设置插件的根路径
				},
				extensions : ['', '.js']
			},
            externals: {
                // CDN外部资源,在此定义暴露的全局变量
                'angular': 'angular'
            },
            output: {
                filename: '[name].js'
            },
            module: {
                //加载器配置
                loaders: [
					{
	                    test: /src.*\.scss$/,
	                    loader: "style!css!sass"
	                }, {
	                    test: /src.*\.(js|jsx)$/,
	                    exclude: /node_modules/,
	                    loader: 'babel-loader',
	                    query: {
	                        presets: ['es2015'] // es6转es5
	                    }
	                }, {
	                    test: /src.*\.js$/,
	                    loader: 'ng-annotate' // 'ngInject';安全化依赖注入，防止混淆压缩报错。
	                }
				]
            }
        }, null, function(err, stats) {
            /* Use stats to do more things if needed */
            // console.log(stats); //这里可以输出状态值进行调试
        }))
        .pipe($.rename({
            suffix: '.bundle' //将处理后的文件加上.bundle后缀,代表该文件是打包的
        }))
        .pipe(gulp.dest('dist/js/')); //输出路径
}

// webpack  (单次运行，不监听)
gulp.task('js', function() {
    return _webpack(false);
});

// sass
// 以'_'开头的，交给webpack打包，这里不做编译
var sassSrc = ['./src/sass/**/*.scss', '!./src/sass/**/_*.scss'];
gulp.task('sass', function() {
    gulp.src(sassSrc)
        .pipe($.sourcemaps.init())
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload({
            stream: true //改变页面上的样式而不刷新页面
        }));
});

gulp.task('copy',['lib','images']);
gulp.task('lib', function () {
    gulp.src('./src/lib/**/*')
        .pipe(gulp.dest('./dist/lib/'));

});
gulp.task('images', function () {
    gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./dist/images/'));

});

//compile swig file
gulp.task('html', function () {
    gulp.src(paths.html.all)
        .pipe($.nunjucks.compile())
        .pipe(gulp.dest('./dist/pages'))
});

gulp.task('watch', function() {

    // 文件改变，自动同步浏览器刷新
    browserSync.init({

        // 需要监听的文件路径和类型
        // files: "**",
        files: ["./dist/**/*.css", "./dist/**/*.js", "./dist/**/*.html"],

        // 动态站点
        // proxy: "localhost:8080/xph/index.action"

        // 静态站点
        server: {
            baseDir: "./dist/",
            index: "pages/index.html"
        }
    });

    // 文件改变，自动执行编译或打包的任务
    gulp.watch(paths.html.all, ['html']);
    gulp.watch(paths.sass.all, ['sass']);
    gulp.watch(paths.js.all, ['js']);
    gulp.watch(paths.images.all, ['copy']);

    // 运行 webpack + 开启监听
    _webpack(true);

});

var commTask = ['copy', 'html', 'sass', 'js'];

gulp.task('dev', commTask.concat('watch'));
gulp.task('build', commTask);
gulp.task('default', ['dev']);
