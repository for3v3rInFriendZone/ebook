(function() {
	"use strict";

	angular
		.module('ebook-user')
		.factory('User', User);

	User.$inject = ['Restangular'];
	function User(Restangular) {
		var collectionName = 'user';
		return Restangular.all(collectionName);
	}
	
})();