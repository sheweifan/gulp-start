const gulp = require('gulp')

gulp.task('default', ['clear', 'script:watch', 'style:watch', 'pug:watch', 'image:watch', 'serve'])

gulp.task('build', ['clear', 'script', 'style', 'pug', 'image'])
