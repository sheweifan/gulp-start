var gulp = require('gulp')
var less = require('gulp-less')
// var server = require('gulp-server-livereload')
var autoprefixer = require('gulp-autoprefixer')
var base64 = require('gulp-base64')
var cssmin = require('gulp-minify-css')
var sourcemaps = require('gulp-sourcemaps')
var plumber = require('gulp-plumber')
var browserSync = require('browser-sync').create()


var reload = browserSync.reload
var styleDir = './Styles/'
var autoprefixerOptions= {
    browsers:['android 4','ios 7'], // if PC ["> 5%", "Firefox >= 20",'last 2 versions','IE 7'],
    remove:true
}
var base64Options= {
    extensions: ['png'],
    maxImageSize: 10 * 1024,
    debug: false
}
 
var _less = function(input,output){
    gulp.src(input)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write())
        .pipe(plumber.stop())
        .pipe(gulp.dest(output))
        .pipe(reload({stream: true}));
}


gulp.task('less', function() {
  _less([styleDir+'**/*.less'],styleDir);
});

gulp.task('build', function(){
    gulp.src(styleDir+'**/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(base64(base64Options))
        .pipe(cssmin())
        .pipe(plumber.stop())
        .pipe(gulp.dest(styleDir))
})


// 静态服务器
gulp.task('default', function() {
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
        }
    });

    gulp.watch([styleDir+'/**/*.less'],['less'])
    
});

// 代理
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "你的域名或IP"
//     });
// });