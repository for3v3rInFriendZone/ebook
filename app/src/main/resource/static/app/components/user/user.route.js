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
		})
		.state("adminUsers", {
			url: '/users',
			views:{
				navbar: {
					templateUrl: "app/components/admin/navbar.html",
					controller: "AdminController",
					controllerAs: "acr"
				},
				main: {

					templateUrl: "app/components/admin/adminUsers.html",
					controller: "AdminController",
					controllerAs: "acr"
				},
				footer: {
					templateUrl: "app/components/core/footer.html"
				}
			}
		});
		
	}
})();
