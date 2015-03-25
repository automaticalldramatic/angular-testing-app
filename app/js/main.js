'use strict'

var angular = require('angular');

// angular modules
require('angular-ui-router');
require('./templates');
require('./controllers/_index');
require('./services/_index');
require('./directives/_index');

angular.element(document).ready(function() {

	var requires = [
		'ui.router',
		'templates',
		'app.controllers',
		'app.services',
		'app.directives'
	];

	window.app = angular.module('app', requires);

	angular.module('app').constant('AppSettings', require('./constants'))

	angular.module('app').config(require('./routes'));

	angular.bootstrap(document, ['app']);
})