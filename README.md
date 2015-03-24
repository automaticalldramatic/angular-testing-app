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

This is closely based on the boilerplate code posted by Jake Marsh on https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate
