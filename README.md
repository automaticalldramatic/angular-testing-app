# Angular Testing App

### What are we building

* Using the browser Geolocation API, find the current user location and query any 3rd party API to fetch nearby restaurants list. [Hint: Google, Foursquare]

* The result should be visualised on a map by default and a toggle button should show them all in a list.

* Restaurants must be visually represented as a markers on a map layer (any library can be used).

* The markers need to be color-coded based on one of the available parameters. __[Hint: Restaurant with 5 star rating can be shown in a different color]__

* Clicking on a marker, should show basic details about the restaurant in an information panel (can be an overlay/sidebar). [Hint: Name, rating, address, photo, open timing, top reviews]

* The design of the information panel and the controls to show or hide it must be intuitive.

* On switching to list view, the restaurants should be shown in a table view with the rating as a sortable column.

### Requirements:

Since, this is a project to perfect Angular App design and build automation using gulp and browserify, these are the basic requirements.

The project uses latest versions of

- [AngularJS](http://angularjs.org/)
- [SASS](http://sass-lang.com/)
- [Gulp](http://gulpjs.com/)
- [Browserify](http://browserify.org/)

Along with many Gulp libraries (these can be seen in either `package.json`, or at the top of each task in `/gulp/tasks/`).

Controllers, services, directives, etc. should all be placed within their respective folders, and will be automatically required via their respective `_index.js` using `bulk-require`. Most other logic can be placed in an existing file, or added in new files as long as it is required inside `main.js`.

### Dependency Injection


Dependency injection is carried out with the `ng-annotate` library. In order to take advantage of this, a simple comment of the format:

```javascript
/**
 * @ngInject
 */
```

needs to be added directly before any Angular functions/modules. The Gulp tasks will then take care of adding any dependency injection, requiring you only to specify the dependencies 

### Inspirations and References

To learn how I setup this app, please refer to SETUP.md.

Also, this structure is closely based on the boilerplate code posted by [Jake Marsh](https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate) and [Hyra](https://github.com/Hyra/angular-gulp-browserify-livereload-boilerplate/tree/master/app/scripts)

### How the Angular app works:

**app/js/main.js**

* Initializes all the code. 
* We use `angular.bootstrap` in main.js because Angular will detect if it has been loaded into the browser more than once and only allow the first loaded script to be bootstrapped and will report a warning to the browser console for each of the subsequent scripts. This prevents strange results in applications, where otherwise multiple instances of Angular try to work on the DOM. Read more about this on https://docs.angularjs.org/guide/bootstrap

**_index.js**

* You will see that all modules; controllers, directives and services have an _index.js file. This is the main module on which all controllers, directives and services are mounted. Only this file is loaded in main.js using a `require` statement.
* We use [`bulk-require`](https://www.npmjs.com/package/bulk-require) to require the whole directory.

**constants.js**

* Define a simple object and use `module.export` to make it available on the app. This is also required in the `main.js` else there is no way angular will know about this file.

**on_run.js**

* This defines what runs. According to Angular documentation:

	Run blocks are the closest thing in Angular to the main method. A run block is the code which needs to run to kickstart the application. It is executed after all of the services have been configured and the injector has been created. Run blocks typically contain code which is hard to unit-test, and for this reason should be declared in isolated modules, so that they can be ignored in the unit-tests.

* I got more information from http://stackoverflow.com/questions/20663076/angularjs-app-run-documentation
