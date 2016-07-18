var gulp = require('gulp')
var nodemon = require('gulp-nodemon')

// Node-sync task
gulp.task('nodemon', () => {
    nodemon({
        script: 'dev-server.js',
        ignore: ['./gulpfile.js','./node_modules','./db', './src', './dist']
    })
})