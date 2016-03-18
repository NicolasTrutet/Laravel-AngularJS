/**
* [module.js]
*
*/

var app = angular.module('whishListApp', ['ngRoute'], function($interpolateProvider) {
    
    /* Change curly brackets for double brackets to not interfered with blade templating engine. */
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

