var gulp = require('gulp')
var less = require('gulp-less')
// var server = require('gulp-server-livereload')
var autoprefixer = require('gulp-autoprefixer')
var base64 = require('gulp-base64')
var sourcemaps = require('gulp-sourcemaps')
var plumber = require('gulp-plumber')
var browserSync = require('browser-sync').create()
var argv = require('minimist')(process.argv.slice(2));
var cleanCSS = require('gulp-clean-css');
var gulpif = require('gulp-if');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
var spriter = require('gulp-css-spriter');
// var browserify = require('gulp-browserify');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var named = require('vinyl-named');
console.log(argv)

var reload = browserSync.reload;
var styleDir = __dirname+ '/Styles/'
var scriptDir = __dirname+ '/Scripts/'
var autoprefixerOptions= {
    browsers: ['iOS >= 7', 'Android >= 4.1'], // if PC ["> 5%", "Firefox >= 20",'last 2 versions','IE 7'],
    remove:true
}
var base64Options= {
    baseDir: './',
    extensions: ['png','gif','jpg','jpeg'],
    maxImageSize: 10 * 1024,
    debug: true
}
 
var _less = function(input,output,dev){
    gulp.src(input)
        .pipe(plumber())
        .pipe(gulpif(dev,sourcemaps.init()))
        .pipe(less())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulpif(!dev,cleanCSS()))
        // m
        .pipe(gulpif(!dev,base64(base64Options)))
        // pc  http://www.cnblogs.com/dreamback/p/gulp-css-spriter.html
        // .pipe(spriter({
        //     spriteSheet:'./images/spriter.png',
        //     pathToSpriteSheetFromCSS:'./images/spriter.png',
        // }))
        .pipe(gulpif(dev,sourcemaps.write()))
        .pipe(plumber.stop())
        .pipe(gulp.dest(output))
        .pipe(reload({stream: true}));
}

var _es = function(input,output,dev){
	gulp.src(input)
        .pipe(plumber())
        .pipe(named())
        .pipe(webpackStream({
            watch: dev,
            module: {
                rules: [
                    {
                        test: /\.(es|js)$/,
                        use: [{
                            loader: 'babel-loader',
                            options: {
                                presets: ['env']
                            }
                        }],

                    },
                ]
            }
        }))
        .pipe(gulpif(!dev,uglify({compress:{properties:false},output:{'quote_keys':true}})))
        .pipe(plumber.stop())
	    .pipe(gulp.dest(output))
}


gulp.task('less', function() {
  _less([styleDir+'**/*.less'],styleDir,true);
});

gulp.task('es', function() {
    _es([scriptDir+'**/*.es'],scriptDir,true);
});

gulp.task('build', function(){
    _less([styleDir+'**/*.less'],styleDir,false);
    _es([scriptDir+'**/*.es'],scriptDir,false);
})


// 静态服务器
gulp.task('default',['less','es'],function() {
    browserSync.init({
        server: {
            baseDir: "./",
            directory:true
        },
        logFileChanges:true,
        logConnections:true,
        files:[
          "./Scripts/**/*.js","./Styles/**/*.css","./Views/**/*.html",
          "./Scripts/*.js","./Styles/*.css","./Views/*.html"
        ],
        open:false,
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        port: argv.port || 3000
    });

    gulp.watch([styleDir+'/**/*.less'],['less'])
    gulp.watch([scriptDir+'/**/*.es'],['es'])
    
});

// 代理
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "你的域名或IP"
//     });
// });