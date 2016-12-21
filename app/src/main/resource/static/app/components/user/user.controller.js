(function() {
	'use strict';

	angular
		.module('ebook-user')
		.controller('UserController', UserController);

	UserController.$inject = ['Restangular', '$anchorScroll'];
	function UserController(Restangular, $anchorScroll) {
		var ucr = this;
		
		var userRest = Restangular.all('user');
		
		userRest.getList().then(function(users) {
			  ucr.users = users;
		});

		
	}
})();
