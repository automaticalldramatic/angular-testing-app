## Setting up this app from scratch

 When you clone this repository, you will not have to run the steps I have mentioned here. You simply run nom and gulp and the app is setup. The steps here explain how I got to the stage of making my boilerplate code available for you.

 This is what you need to do exactly:

* You need to have node (for npm), sass, gulp and browserify installed. You can visit their respective websites for installation steps.
* Install project dependencies. Now, I am installing everything I need at once - because I have gone through this process and know what all is required. Usually, you figure as you move along. For now, run this command.

```
npm install gulp browserify gulp-browserify gulp-rimraf gulp-concat gulp-jshint gulp-util gulp-embedlr gulp-livereload tiny-lr connect-livereload express --save-dev
```

The `--save-dev` flag saves the module in the local node_modules directory.

* Create a .gitignore file. Mine looks like this:

```
.DS_Store

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed

# Compiled binary addons (http://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules
bower_components

# Build files
build
templates.js

# Sublime
sftp-config.json
```

A .gitignore file is the safest way to keep project dependencies out of the repository.