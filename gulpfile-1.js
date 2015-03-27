'use strict';

var gulp           = require('gulp'),
	jshint         = require('gulp-jshint'),
	browserify     = require('gulp-browserify'),
	browserify1    = require('browserify'),
	uglify         = require('gulp-uglify'),
	sass           = require('gulp-sass'),
	rename         = require('gulp-rename'),
	rimraf         = require('gulp-rimraf'),
	source         = require('vinyl-source-stream'),
	ngAnnotate     = require('gulp-ng-annotate');

/************************************************
  Gulp Tasks
 ***********************************************/

// JSHint task
gulp.task('lint', function() {
	gulp.src('./app/js/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('browserify1', function() {
	return browserify1('./app/js/main.js')
		.bundle()
		//Pass desired output filename to vinyl-source-stream
		.pipe(source('bundle.js'))
		// Start piping stream to tasks!
		.pipe(gulp.dest('./build/'));
});

// Browserify task
gulp.task('browserify', function() {
	// Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
	gulp.src(['app/js/main.js'])
	.pipe(ngAnnotate())
	.pipe(browserify({
		insertGlobals: true,
		debug: true
	}))
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('build/js'));
});

// Styles task
gulp.task('styles', function() {
	gulp.src('app/styles/main.scss')
	// The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
	.pipe(sass({style: 'compressed', onError: function(e) { console.log(e); } }))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('build/css/'));
});

// Views task
gulp.task('views', function() {
	// Get our index.html
	gulp.src('app/index.html')
	// And put it in the dist folder
	.pipe(gulp.dest('build/'));

	// Any other view files from app/views
	gulp.src('./app/views/**/*')
	// Will be put in the dist/views folder
	.pipe(gulp.dest('build/views/'));
});

gulp.task('watch', function() {
	// Watch our scripts
	gulp.watch(['app/js/**/*.js'],[
		'lint',
		'browserify'
	]);
	// Watch our styles
	gulp.watch(['app/styles/**/*.scss'], [
		'styles'
	]);
	// Watch our views
	gulp.watch(['app/index.html', 'app/views/**/*.html'], [
		'views'
	]);
});

// Cleans up directory before deployment.
gulp.task('clean', function() {
	return gulp.src(['./build/css/', './build/js/', './build/views/'], {read: false})
		.pipe(rimraf());
});


// The default task (called when you run `gulp` from cli)
// gulp.task('default', ['watch']);

gulp.task('default', ['clean'], function() {
	gulp.start('browserify', 'lint', 'styles', 'views');
});

function errorHandler (error) {
	console.log(error.toString());
	console.log(error);
	this.emit('end');
}