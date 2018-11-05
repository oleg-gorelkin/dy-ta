var gulp = require('gulp');
var source = require('vinyl-source-stream');

var del = require('del');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');

/**
 * Support fustions. These are called by gulp tasks (or other support functions)
 */
const getJsStream = () =>
  browserify({ entries: './src/jsx/main.jsx', debug: true })
    .transform(babelify, { presets: ["env", "react"], plugins: ["transform-object-rest-spread"] })
    .bundle()
    .on('error', function (err) { console.error(err); this.emit('end'); })
    .pipe(source('app.js'));

/**
 * Clearing tasks. Each must start with 'clear:' and task name
 * Each task must have it's own clearing task where applicable
 */
gulp.task('clean:index', () => del(['./dist/index.html']));
gulp.task('clean:css', () => del(['./dist/css']));
gulp.task('clean:js', () => del(['./dist/js']));
gulp.task('clean:images', () => del(['./dist/images/**/*']));

/**
 * Main tasks. Starts with a verb (copy, build, optimize etc.)
 * following by task name. Must use clearer tasks where applicable
 */
gulp.task(
  'copy:index',
  gulp.series(
    'clean:index',
    () => gulp.src('./src/index.html').pipe(gulp.dest('./dist'))
  )
);

gulp.task(
  'build:css',
  gulp.series(
    'clean:css',
    () => gulp.src('./src/sass/**/*.scss').pipe(sass().on('error', console.log)).pipe(gulp.dest('./dist/css'))
  )
);

gulp.task(
  'build:js',
  gulp.series(
    'clean:js',
    () => getJsStream().pipe(gulp.dest('./dist/js'))
  )
);

gulp.task(
  'copy:images',
  gulp.series(
    'clean:images',
    () => gulp.src('./src/images/**/*').pipe(gulp.dest('./dist/images'))
  )
);

// Just an accumulation of all the tasks
gulp.task(
  'default',
  gulp.parallel(
    ['copy:index', 'build:css', 'build:js', 'copy:images']
  )
);

//Watchers
gulp.task(
  'watch',
  () => {
    gulp.watch('./src/index.html', gulp.series('copy:index'));
    gulp.watch('./src/jsx/**/*', gulp.series('build:js'));
    gulp.watch('./src/sass/**/*.scss', gulp.series('build:css'));
    gulp.watch('./src/images/**/*', gulp.series('copy:images'));
  }
)
