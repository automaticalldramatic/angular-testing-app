(function () {
   'use strict';
}());

var controllersModule = require('./_index');

var WelcomeCtrl = function() {
	// ViewModel
	var vm = this;

	vm.heading = 'Angular Test Application using AngularJS, Gulp, and Browserify!';
	vm.author = 'Rizwan Iqbal';
};

controllersModule.controller('WelcomeCtrl', WelcomeCtrl);