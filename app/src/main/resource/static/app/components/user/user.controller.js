(function() {
	'use strict';

	angular
		.module('ebook-user')
		.controller('UserController', UserController);

	UserController.$inject = ['User', '$anchorScroll', '$state'];
	function UserController(User, $anchorScroll, $state) {
		var ucr = this;
		
		ucr.submitForm = submitForm;
		ucr.focus = focus;
		ucr.loginFailed = false;
		ucr.listOfUsers = [];
		
		function submitForm() {
			
			User.getList().then(function(users) {
				ucr.listOfUsers = users;
				
			});
			
			for(var i=0; i<ucr.listOfUsers.length; i++) {
				if(ucr.username === ucr.listOfUsers[i].username) {
					if(ucr.password === ucr.listOfUsers[i].password) {
						$state.go('home');
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
