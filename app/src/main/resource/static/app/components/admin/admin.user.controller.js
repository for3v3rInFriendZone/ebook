(function() {
	'use strict';

	angular
		.module('ebook-admin')
		.controller('AdminUserController', AdminUserController);

	AdminUserController.$inject = ['localStorageService', '$state', 'selectedUser', 'categories'];
	function AdminUserController(localStorageService, $state, selectedUser, categories) {
		
		var auc = this;
		auc.user = selectedUser;
		auc.remove = remove;
		auc.cancelNewUser = cancelNewUser;
		auc.saveNewUser = saveNewUser;
		auc.types = [{id: 1, name: 'Admin'}, {id: 2, name: 'Subscriber'}];
		auc.categories = categories;
		
		function remove(id){
			
		}
		
		function cancelNewUser() {
			$state.go('main.adminUsers');
		}
		
		function saveNewUser() {
			auc.user.type = auc.user.type.name;
			if(auc.user.image == null || auc.user.image == undefined || auc.user.image == '') {
				auc.user.image = 'https://diasp.eu/assets/user/default.png';
			}
			
			auc.user.$saveOrUpdate(cancelNewUser);
		}
	}
})();
