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
		acr.remove = remove;
		acr.newUser = newUser;
		acr.currentState = $state.current.name;
		acr.editListOfUsers = editListOfUsers;
		acr.users = [];
		
		
		if(acr.currentState == 'adminUsers' || acr.currentState == 'admin' || acr.currentState == 'adminPage') {
			acr.user = localStorageService.get('admin');
		} else if(acr.currentState == 'userEdit') {
			acr.user = localStorageService.get('editUser');
		} else if(acr.currentState == 'newUser') {
			acr.user = {};
			acr.user.image = 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg';
			return;
		}
		
		acr.nameAndSurname = acr.user.firstname + ' ' + acr.user.lastname;
		
		if(localStorageService.get('listOfUsers') == null || localStorageService.get('listOfUsers') == undefined){
			User.getList().then(function(users) {
				for(var i=0; i<users.length; i++) {
					acr.user = localStorageService.get('admin');
					if(users[i].id === acr.user.id) {
						continue;
					} else {
						acr.users.push(users[i]);
					}
				}
				if(acr.currentState == 'adminUsers' || acr.currentState == 'admin' || acr.currentState == 'adminPage') {
					acr.user = localStorageService.get('admin');
				} else if(acr.currentState == 'userEdit') {
					acr.user = localStorageService.get('editUser');
				}
			});
		} else {
			acr.users = localStorageService.get('listOfUsers');
		}
		
		
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
						if(acr.currentState == 'userEdit') {
							return;
						}
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
			
			if(acr.currentState == 'adminUsers' || acr.currentState == 'admin' || acr.currentState == 'adminPage') {
				acr.user = localStorageService.get('admin');
			} else if(acr.currentState == 'userEdit') {
				acr.user = localStorageService.get('editUser');
			}
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
						if(acr.currentState == 'userEdit') {
							return;
						}
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
					localStorageService.set('editUser', acr.users[i]);
					break;
				}
			}	
			
			$state.go('userEdit', {id:id});
		}
		
		function remove(id){
				
			User.getList().then(function(users) {
				for(var i=0; i<users.length; i++) {
					if(id === users[i].id) {
						var editedUser = users[i];
						editedUser.remove();
						break;
					}
				}
			});
			
			for(var i=0; i<acr.users.length; i++){
				if(id == acr.users[i].id){
					acr.users.splice(i, 1);
					localStorageService.set('listOfUsers', acr.users);
					break;
				}
			}
			
			$state.go('adminUsers');
		}
		
		function newUser() {
			$state.go('newUser');
		}
	}
})();
