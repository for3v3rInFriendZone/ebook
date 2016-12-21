(function() {
	"use strict";

	angular
		.module('ebook-core')
		.config(config);


	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise("/home");

		$stateProvider
		.state("home", {
			url: '/home',
			views:{
				navbar: {
					templateUrl: "app/components/core/navbar.html",
					controller: "CoreController",
					controllerAs: "ccr"
				},
				main: {
					templateUrl: "app/components/core/main.html",
					controller: "CoreController",
					controllerAs: "ccr"
				},
				footer: {
					templateUrl: "app/components/core/footer.html",
					controller: "CoreController",
					controllerAs: "ccr"
				}
			}
		});
	}
})();
