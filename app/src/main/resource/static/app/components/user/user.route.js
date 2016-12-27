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
					resolve: {
						users: getUsers
					},
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
		})
		.state("newUser", {
			url: '/user/new',
			views:{
				navbar: {
					templateUrl: "app/components/admin/navbarEmpty.html",
					controller: "AdminController",
					controllerAs: "acr"
				},
				main: {
					templateUrl: "app/components/admin/adminNewUser.html",
					controller: "AdminController",
					controllerAs: "acr"
				},
				footer: {
					templateUrl: "app/components/core/footer.html"
				}
			}
		});
		
		
		getUsers.$inject = ['User'];
		function getUsers(User) {
			return User.query().$promise;
		}
	}
})();
