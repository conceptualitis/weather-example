var gulp = require('gulp'),
    reactify = require('reactify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

var paths = {
    js: {
        app: './node_modules/app/index.js',
        bundle: './public/js/',
        watch: './node_modules/app/**/*.{js,jsx}'
    }
};

gulp.task('js', function () {
    return browserify(paths.js.app)
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(paths.js.bundle));
});


gulp.task('watch', function () {
    gulp.watch(paths.js.watch, ['js']);
});
