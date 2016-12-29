(function() {
	'use strict';

	angular
		.module('ebook-category')
		.controller('CategoryController', CategoryController);

	CategoryController.$inject = ['localStorageService', '$state', 'category', 'title'];
	function CategoryController(localStorageService, $state, category, title) {
		
		var ccr = this;	
		
		ccr.category = category;
		ccr.title = title;
		ccr.currentState = $state.current.name;
		ccr.cancel = cancel;
		ccr.done = done;
		ccr.remove = remove;
		
		function cancel() {
			$state.go('main.listCategory');
		}
		
		function done() {
			ccr.category.$saveOrUpdate(cancel);
		}
		
		function remove() {
			ccr.category.$delete({id: ccr.category.id}, cancel);
		}
		
	}
})();
