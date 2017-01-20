(function() {
	"use strict";

	angular
		.module('ebook-book')
		.factory('BookPdfSearch', BookPdfSearch);

	BookPdfSearch.$inject = ['$resource'];
	function BookPdfSearch($resource) {

		var bookPdfSearchService = $resource('/book/search/:query',
				{id: "@_id"},
				{search: {method: 'GET', 
					      isArray:true,
					      params: {
					    	  query: '@query'
					      			}}});
	
		
		return bookPdfSearchService;
	}
	
})();