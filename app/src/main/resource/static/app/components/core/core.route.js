(function() {
	"use strict";

	angular
		.module('ebook-core')
		.config(config);


	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise("/home");

		$stateProvider
		.state("main", {
			abstract: true,
			views:{
				'navbar': {
					templateUrl: "app/components/core/navbar.html",
					controller: "NavbarController",
					controllerAs: "nbc"
				},
				'footer': {
					templateUrl: "app/components/core/footer.html"
				}
			}
		})	
		.state("main.home", {
			url: "/home",
			views:{
				'main@': {
					templateUrl: "app/components/core/main.html"
				},
			}
		})
		.state("main.adminUsers", {
			url: '/users',
			views:{
				'main@': {
					resolve: {
						listOfUsers: getUsers
					},
					templateUrl: "app/components/admin/adminUsers.html",
					controller: "AdminListUsersController",
					controllerAs: "aluc"
				}
			}
		});
		
		getUsers.$inject = ['User'];
		function getUsers(User) {
			return User.query().$promise;
		}
	}
})();
