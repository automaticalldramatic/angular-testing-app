(function () {
   'use strict';
}());

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function HomeCtrl() {

  // ViewModel
  var vm = this;

  vm.title = 'Angular Test Application using AngularJS, Gulp, and Browserify!';
  vm.author = 'Rizwan Iqbal';

}

controllersModule.controller('HomeCtrl', HomeCtrl);