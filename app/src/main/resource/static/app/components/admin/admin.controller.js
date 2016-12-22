(function() {
	'use strict';

	angular
		.module('ebook-admin')
		.controller('AdminController', AdminController);

	AdminController.$inject = ['$location', '$anchorScroll', 'localStorageService', '$state', 'User', 'Restangular'];
	function AdminController($location, $anchorScroll, localStorageService, $state, User, Restangular) {
		var acr = this;
		acr.adminPage = adminPage;
		acr.signOut = signOut;
		acr.edit = edit;
		acr.done = done;
		acr.cancel = cancel;
		acr.user = localStorageService.get('admin');
		acr.nameAndSurname = acr.user.firstname + ' ' + acr.user.lastname;
		
		function adminPage() {
			$state.go('adminPage', {username: acr.user.username});
		}
		 
		function signOut() {
			localStorageService.clearAll();
			$state.go('home');
		}
		
		function edit() {
			acr.editFlag = true;
		}
		
		function done() {
			User.getList().then(function(users) {
				for(var i=0; i<users.length; i++) {
					if(acr.user.id === users[i].id) {
						var editedUser = users[i];
						editedUser.firstname = acr.user.firstname;
						editedUser.lastname = acr.user.lastname;
						editedUser.password = acr.user.password;
						editedUser.image = acr.user.image;
						
						editedUser.put();
						acr.editFlag = false;
						acr.user = editedUser;
						localStorageService.set('admin', acr.user);
						return;
					}
				}
			});
			
		}
		
		function cancel() {
			acr.editFlag = false;
			acr.user = localStorageService.get('admin');
		}
	}
})();
