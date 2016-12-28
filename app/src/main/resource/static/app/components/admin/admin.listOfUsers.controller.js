(function() {
	'use strict';

	angular
		.module('ebook-admin')
		.controller('AdminListUsersController', AdminListUsersController);

	AdminListUsersController.$inject = ['localStorageService', '$state', 'User', 'listOfUsers'];
	function AdminListUsersController(localStorageService, $state, User, listOfUsers) {
		
		var aluc = this;
		aluc.newUser = newUser;
		aluc.editListOfUsers = editListOfUsers;
		aluc.users = listOfUsers;
		
		function editListOfUsers(id) {	
			
			$state.go('main.usersEdit', {id:id});
		}
		
		function newUser() {
			$state.go('main.newUser');
		}
		

	}
})();
