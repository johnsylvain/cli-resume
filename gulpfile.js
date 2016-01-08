var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');


gulp.task('sass', function(){
  gulp.src('./scss/**/*.scss')
    .pipe( sass().on('error', sass.logError) )
    .pipe(autoprefix())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe( gulp.dest('./css/'));
});

gulp.task('watch', function(){
  gulp.watch('./scss/**/*.scss', ['sass']);
})

gulp.task('default',['watch']);