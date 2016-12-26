(function() {
	"use strict";

	angular
		.module('ebook-admin')
		.config(config);


	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){

		$stateProvider
		.state("admin", {
			url: '/:username',
			views:{
				navbar: {
					templateUrl: "app/components/admin/navbar.html",
					controller: "AdminController",
					controllerAs: "acr"
				},
				main: {
					templateUrl: "app/components/admin/main.html",
					controller: "AdminController",
					controllerAs: "acr"
				},
				footer: {
					templateUrl: "app/components/core/footer.html"
				}
			}
		})
		.state("adminPage", {
			url: '/profile/:username',
			views:{
				navbar: {
					templateUrl: "app/components/admin/navbarAdminPage.html",
					controller: "AdminController",
					controllerAs: "acr"
				},
				main: {
					templateUrl: "app/components/admin/mainAdminPage.html",
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
