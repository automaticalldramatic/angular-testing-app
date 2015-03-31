'use strict';

var gulp 			= require('gulp'),
	browserSync 	= require('browser-sync'),
	gutil 			= require('gulp-util'),
	gulpif 			= require('gulp-if'),
	jshint 			= require('gulp-jshint'),
	browserify 		= require('browserify'),
	babelify 		= require('babelify'),
	debowerify 		= require('debowerify'),
	source 			= require('vinyl-source-stream'),
	sourcemaps 		= require('gulp-sourcemaps'),
	streamify 		= require('gulp-streamify'),
	buffer 			= require('vinyl-buffer'),
	ngAnnotate 		= require('browserify-ngannotate'),
	handleErrors 	= require('./gulp/util/handleErrors'),
	concat 			= require('gulp-concat'),
	uglify 			= require('gulp-uglify'),
	rename         	= require('gulp-rename'),
	sass 			= require('gulp-sass'),
	refresh 		= require('gulp-livereload'),
	watchify 		= require('watchify'),
	lrserver 		= require('tiny-lr')(),
	express 		= require('express'),
	livereload 		= require('connect-livereload'),
	rimraf         	= require('gulp-rimraf'),
	livereloadport 	= 35729,
	serverport 		= 3000,
	createSourcemap = true,
	clean 			= require('gulp-clean'),
	templateCache  	= require('gulp-angular-templatecache'),
	http    		= require('http'),
	morgan  		= require('morgan'),
	runSequence 	= require('run-sequence');

global.isProd = false;

// JSHint task
gulp.task('lint', function() {
	return gulp.src(['app/js/**/*.js', '!app/js/templates.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Browserify task
// gulp.task('browserify', function() {
// 	// Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
// 	gulp.src(['app/js/main.js'])
// 	.pipe(browserify({
// 		insertGlobals: true,
// 		debug: true
// 	}))
// 	// Bundle to a single file
// 	// .pipe(concat('bundle.js'))
// 	.pipe(uglify())
// 	.pipe(rename({suffix: '.min'}))																																							
// 	// Output it to our dist folder
// 	.pipe(gulp.dest('build/js/'));
// });
// 
function buildScript(file) {

  var bundler = browserify({
	entries: ['./app/js/main.js'],
	debug: true,
	cache: {},
	packageCache: {},
	fullPaths: true
  }, watchify.args);

  if ( !global.isProd ) {
	bundler = watchify(bundler);
	bundler.on('update', function() {
		rebundle();
	});
  }

  var transforms = [
	babelify,
	debowerify,
	ngAnnotate,
	'brfs',
	'bulkify'
  ];

  transforms.forEach(function(transform) {
	bundler.transform(transform);
  });

  function rebundle() {
	var stream = bundler.bundle();
	var createSourcemap = global.isProd && createSourcemap;

	gutil.log('Rebundle...');

	return stream.on('error', handleErrors)
		.pipe(source(file))
		.pipe(gulpif(createSourcemap, buffer()))
		.pipe(gulpif(createSourcemap, sourcemaps.init()))
		.pipe(gulpif(global.isProd, streamify(uglify({
			compress: { drop_console: true }
		}))))
		.pipe(gulpif(createSourcemap, sourcemaps.write('./')))
		.pipe(gulp.dest('build/js'))
		.pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
  }

  return rebundle();

}

gulp.task('browserify', function() {

  return buildScript('main.js');

});

// Views task
gulp.task('views', function() {
	// Get our index.html
	gulp.src('./app/index.html')
	// And put it in the dist folder
	.pipe(gulp.dest('./build/'));

	// Any other view files from app/views
	return gulp.src('./app/views/**/*')
	// Will be put in the dist/views folder
	.pipe(templateCache({
		standalone: true
	}))
	.pipe(gulp.dest('./app/js'))
	.pipe(refresh(lrserver)); // Tell the lrserver to refresh
});


gulp.task('styles', function() {
	gulp.src('app/styles/main.scss')
	// The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
	.pipe(sass({style: 'compressed', onError: function(e) { console.log(e); } }))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./build/css/'))
	.pipe(refresh(lrserver)); // Tell the lrserver to refresh
});

// gulp.task('watch', ['lint'], function() {
// 	// Watch our scripts
// 	gulp.watch(['app/js/*.js', 'app/js/**/*.js'],[
// 		'views',
// 		'lint',
// 		'styles',
// 		'browserify'
// 	]);
// });

gulp.task('server', function() {

	var server = express();

	// log all requests to the console
	server.use(morgan('dev'));
	server.use(express.static('build'));

	// Serve index.html for all routes to leave routing up to Angular
	server.all('/*', function(req, res) {
	  res.sendFile('index.html', { root: 'build' });
	});

	// Start webserver if not already running
	var s = http.createServer(server);
	s.on('error', function(err){
	if(err.code === 'EADDRINUSE'){
	  gutil.log('Development server is already started at port ' + serverport);
	}
	else {
	  throw err;
	}
	});

	s.listen(serverport);

});

gulp.task('browserSync', function() {
	browserSync({
		proxy: 'localhost:' + serverport
	});

});

gulp.task('watch', ['browserSync', 'server'], function() {

  // Scripts are automatically watched and rebundled by Watchify inside Browserify task
  gulp.watch(['app/js/**/*.js'], ['lint']);
  gulp.watch(['app/styles/**/*.scss'],  ['styles']);
  // gulp.watch(config.images.src,  ['images']);
  // gulp.watch(config.fonts.src,   ['fonts']);
  gulp.watch(['app/index.html', 'app/views/**/*.html'], ['views']);

});

// // Set up an express server (but not starting it yet)
// var server = express();
// // Add live reload
// server.use(livereload({port: livereloadport}));
// // Use our 'dist' folder as rootfolder
// server.use(express.static('./build'));
// // Because I like HTML5 pushstate .. this redirects everything back to our index.html
// server.all('/*', function(req, res) {
// 	res.sendfile('index.html', { root: 'build' });
// });

// Cleans up directory before deployment.
gulp.task('clean', function() {
	return gulp.src(['./build/css/', './build/js/', './build/views/'], {read: false})
		.pipe(rimraf());
});

// gulp.task('default', ['clean'], function() {
// 	gulp.start('browserify', 'lint', 'views', 'styles');
// });

// Dev task
gulp.task('dev', ['clean'], function(cb) {

	cb = cb || function() {};

	global.isProd = false;

	runSequence(['styles', 'views', 'browserify'], 'watch', cb);

});