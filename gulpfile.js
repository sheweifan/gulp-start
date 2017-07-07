var gulp = require('gulp');
var server = require('gulp-server-livereload');
var less = require('gulp-less');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var spriter = require('gulp-css-spriter');
var autoprefixer = require('gulp-autoprefixer');

var style_dir = __dirname+'/Styles/**/*.less';
var Image_dir = __dirname+'/Styles/**/*.less';

gulp.task('lesss', function () {
    gulp.src(style_dir)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(autoprefixer({
        	 browsers: ["> 5%", "Firefox >= 20",'last 2 versions','IE 7'],
            cascade: false,
            remove:false 
        }))
        // .pipe(spriter({
        // 	spriteSheet:'Images/spriter.png',
        // 	pathToSpriteSheetFromCSS:'Images/spriter.png'
        // }))
        .pipe(gulp.dest(__dirname+'/Styles/'));
});


gulp.task('watch_less', function () {
    gulp.watch(style_dir, ['lesss']);
});

gulp.task('default',['watch_less'],function() {
	gulp.src(__dirname+'/')
		.pipe(server({
			port: 3000,
			livereload: true,
			directoryListing: true,
			open: false
		})
	);
});


