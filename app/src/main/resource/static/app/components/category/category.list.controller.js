(function() {
	'use strict';

	angular
		.module('ebook-category')
		.controller('CategoryListController', CategoryListController);

	CategoryListController.$inject = ['localStorageService', '$state', 'categories'];
	function CategoryListController(localStorageService, $state, categories) {
		
		var clc = this;	
		clc.categories = categories;
		clc.newCategory = newCategory;
		clc.editCategory = editCategory;
		
		function newCategory() {
			$state.go('main.newCategory');
		}
		
		function editCategory(id) {
			$state.go('main.editCategory', {id: id});
		}
		
	}
})();
