(function() {
	'use strict';

	angular
		.module('ebook-admin')
		.controller('AdminController', AdminController);

	AdminController.$inject = ['$scope', '$location', '$anchorScroll', 'localStorageService', '$state', 'User', 'Restangular', '$fancyModal' ];
	function AdminController($scope, $location, $anchorScroll, localStorageService, $state, User, Restangular, $fancyModal) {
		var acr = this;
		
		acr.adminPage = adminPage;
		acr.signOut = signOut;
		acr.edit = edit;
		acr.done = done;
		acr.cancel = cancel;
		acr.newPass = newPass;
		acr.savePass = savePass;
		acr.closeModal = closeModal;
		acr.editListOfUsers = editListOfUsers;
		acr.users = [];
		acr.user = localStorageService.get('admin');
		acr.nameAndSurname = acr.user.firstname + ' ' + acr.user.lastname;
		
	
		User.getList().then(function(users) {
			for(var i=0; i<users.length; i++) {
				if(users[i].id === acr.user.id) {
					continue;
				} else {
					acr.users.push(users[i]);
				}
			}
		});
		
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
						editedUser.image = acr.user.image;
						
						editedUser.put();
						acr.editFlag = false;
						acr.user = editedUser;
						acr.nameAndSurname = acr.user.firstname + ' ' + acr.user.lastname;
						localStorageService.set('admin', acr.user);
						return;
					}
				}
			});
			acr.newPassFlag = false;
		}
		
		function cancel() {
			acr.editFlag = false;
			acr.newPassFlag = false;
			acr.user = localStorageService.get('admin');
		}
		
		function newPass() {
			//acr.newPassFlag = true;
			$fancyModal.open({ templateUrl: 'app/components/admin/changePassModal.html', 
							   controller: 'AdminController as acr'});
		}
		
		function savePass() {
			
			User.getList().then(function(users) {
				for(var i=0; i<users.length; i++) {
					if(acr.user.id === users[i].id) {
						var editedUser = users[i];
						editedUser.password = acr.newPassword;
						editedUser.put();
						acr.user = editedUser;
						localStorageService.set('admin', acr.user);
						break;
					}
				}
			});

			$fancyModal.close(); 
		}
		
		function closeModal() {
			$fancyModal.close(); 
		}
		
		function editListOfUsers(id) {
			
			for(var i=0; i<acr.users.length; i++) {
				if(id === acr.users[i].id) {
					acr.editedUser = acr.users[i];
					break;
				}
			}	
			
		}
		
	}
})();
