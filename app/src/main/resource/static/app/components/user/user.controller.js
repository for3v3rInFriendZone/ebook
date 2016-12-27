(function() {
	'use strict';

	angular
		.module('ebook-user')
		.controller('UserController', UserController);

	UserController.$inject = ['User', '$anchorScroll', '$state', 'localStorageService', 'users'];
	function UserController(User, $anchorScroll, $state, localStorageService, users) {
		var ucr = this;
		ucr.listOfUsers = users;
		ucr.submitForm = submitForm;
		ucr.focus = focus;
		ucr.loginFailed = false;
		
		
		function submitForm() {

			for(var i=0; i<ucr.listOfUsers.length; i++) {
				if(ucr.username === ucr.listOfUsers[i].username) {
					if(ucr.password === ucr.listOfUsers[i].password) {
						var userObject = ucr.listOfUsers[i];
						localStorageService.set('admin', userObject);
						$state.go('admin', {username: ucr.username});
						return;
					}
				}	
			}
			
			ucr.loginFailed = true;
		}
		
		function focus() {
			ucr.loginFailed = false;
		}
		
	}
	
})();
