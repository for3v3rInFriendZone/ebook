(function() {
	'use strict';

	angular
		.module('ebook-admin')
		.controller('AdminUserController', AdminUserController);

	AdminUserController.$inject = ['localStorageService', '$state', 'selectedUser', 'categories', 'listOfUsers'];
	function AdminUserController(localStorageService, $state, selectedUser, categories, listOfUsers) {
		
		var auc = this;
		auc.user = selectedUser;
		auc.remove = remove;
		auc.cancelNewUser = cancelNewUser;
		auc.saveNewUser = saveNewUser;
		auc.types = [{id: 1, name: 'Admin'}, {id: 2, name: 'Subscriber'}];
		auc.categories = categories;
		auc.listOfUsers = listOfUsers;
		auc.cleanInput = cleanInput;
		
		function remove(id){
			
		}
		
		function cancelNewUser() {
			$state.go('main.adminUsers');
		}
		
		function saveNewUser() {
			auc.submitted = true;
			if(auc.form.$invalid) {
				return;
			}
			if(!validationOfUsername(auc.user.username)){
				auc.usernameExist = true;
				return;
			}
			if(auc.user.password != auc.retypePassword) {
				auc.notEqualPass = true;
				return;
			}
			
			if(auc.user.image != null && auc.user.image != undefined && auc.user.image != '') {
				if(auc.user.image.indexOf('image') == -1) {
					auc.notAnImage = true;
	            	return;
	            }
			}
			
			auc.user.type = auc.user.type.name.toLowerCase();
			if(auc.user.image == null || auc.user.image == undefined || auc.user.image == '') {
				auc.user.image = 'https://diasp.eu/assets/user/default.png';
			}
			
			auc.user.$saveOrUpdate(cancelNewUser);
		}
		
		function validationOfUsername(username){
			for(var i=0; i<auc.listOfUsers.length; i++) {
				if(auc.listOfUsers[i].username == username){
					return false;
				}
			}
			return true;
		}
		
		function cleanInput(){
			auc.usernameExist = false;
		}
	}
})();
