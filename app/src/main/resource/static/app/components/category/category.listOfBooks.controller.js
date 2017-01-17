(function() {
	'use strict';

	angular
		.module('ebook-category')
		.controller('CategoryBooksController', CategoryBooksController);

	CategoryBooksController.$inject = ['localStorageService', '$state', 'categories'];
	function CategoryBooksController(localStorageService, $state, categories) {
		
		var cbc = this;	
		cbc.user = localStorageService.get('user');
		
		
	}
})();
