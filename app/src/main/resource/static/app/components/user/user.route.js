(function() {
	"use strict";

	angular
		.module('ebook-user')
		.config(config);


	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){

		$stateProvider
		.state("login", {
			url: '/login',
			views:{
				main: {
					templateUrl: "app/components/user/login.html",
					controller: "UserController",
					controllerAs: "ucr"
				}
			}
		});
	}
})();
