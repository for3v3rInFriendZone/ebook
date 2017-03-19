(function() {
	"use strict";

	angular
		.module('ebook-book')
		.factory('BookPdfSearch', BookPdfSearch);

	BookPdfSearch.$inject = ['$resource'];
	function BookPdfSearch($resource) {

		var bookPdfSearchService = $resource('/book/search/:id',
				{id: "@_id"},
				{search: {method: 'POST', 
					      isArray:true}});
	
		
		return bookPdfSearchService;
	}
	
})();