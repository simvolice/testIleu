var gulp = require('gulp');
var uglify = require('gulp-uglify');

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');





var path = {

    MINIFIED_OUT: 'build.min.js',
    OUT: 'build.js',

    DEST_BUILD: '.tmp/public/js',
    DEST_SRC: '.tmp/public/js',
    ENTRY_POINT: __dirname + '/api/components/renderMyWork'
};


gulp.task('watch', function() {


    var watcher  = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on('update', function () {
        watcher.bundle()
            .pipe(source(path.OUT))
            .pipe(gulp.dest(path.DEST_SRC))
        console.log('Updated');
    })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('build', function(){
    browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify]
    })
        .bundle()
        .pipe(source(path.MINIFIED_OUT))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(path.DEST_BUILD));
});


gulp.task('default', ['watch']);


gulp.task('production', ['build']);

