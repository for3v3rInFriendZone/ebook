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
			//bsc.term = bsc.book.title + " " + bsc.book.author + " " + bsc.book.keywords + " " + bsc.book.content + " " + bsc.book.language;
			BookPdfSearch.search(bsc.book, function(results){
				bsc.searchResults = results;
			});
		}
		
		
		
	}
})();
