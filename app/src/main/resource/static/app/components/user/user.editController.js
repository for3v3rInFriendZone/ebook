(function() {
	'use strict';

	angular
		.module('ebook-user')
		.controller('UserEditController', UserEditController);

	UserEditController.$inject = ['User', '$state', 'localStorageService', '$fancyModal', 'selectedUser', 'categories'];
	function UserEditController(User, $state, localStorageService, $fancyModal, selectedUser, categories) {
		
		var uec = this;
		uec.user = selectedUser;
		uec.currentState = $state.current.name;
		uec.cancel = cancel;
		uec.newPass = newPass;
		uec.done = done;
		uec.remove = remove;
		uec.categories = categories;
		
		uec.nameAndSurname = uec.user.firstname + ' ' + uec.user.lastname;
		
		function cancel() {
			if($state.current.name == 'main.usersEdit') {
				$state.go('main.adminUsers');
				return;
			} 
			$state.go('main.userPage', {username: uec.user.username});
		}
		
		function newPass() {
			//acr.newPassFlag = true;
			$fancyModal.open({ templateUrl: 'app/components/user/changePassModal.html', 
				   			   controller: 'UserController as ucr'});
		}
		
		function done() {
			if(localStorageService.get('newPassword') !== null && localStorageService.get('newPassword') !== undefined && localStorageService.get('newPassword') != '') {
				if(localStorageService.get('newPassword') != uec.user.password) {
					uec.user.password = localStorageService.get('newPassword');
					localStorageService.remove('newPassword');
				}
			}
			if(uec.user.id === localStorageService.get('user').id){
				localStorageService.set('user', uec.user);
			}
			uec.user.$saveOrUpdate(cancel);
		}
		
		function remove() {
			uec.user.$delete({id: uec.user.id}, cancel);
		}
	}
	
})();
