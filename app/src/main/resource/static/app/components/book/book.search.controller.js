(function() {
	'use strict';

	angular
		.module('ebook-book')
		.controller('BookSearchController', BookSearchController);

	BookSearchController.$inject = ['localStorageService', '$state', 'books', 'categories', 'languages', 'BookPdfSearch'];
	function BookSearchController(localStorageService, $state, books, categories, languages, BookPdfSearch) {
		
		var bsc = this;	
		bsc.user = localStorageService.get('user');
		bsc.books = books;
		bsc.categories = categories;
		bsc.languages = languages;
		bsc.cancel = cancel;
		bsc.search = search;
		bsc.searchResults = [];
		
		function cancel() {
			$state.go('main.listBook');
		}
		
		function search() {
			var term = bsc.book.title;
			var ssss = BookPdfSearch.search({query: term}, function(results){
				bsc.searchResults = results;
			});
		}
		
		
		
	}
})();
