(function() {
	"use strict";

	angular
		.module('ebook-book')
		.factory('BookPdf', BookPdf);

	BookPdf.$inject = ['$resource'];
	function BookPdf($resource) {

		var bookPdfService = $resource('/book/pdf/:id',
				{id: "@_id"},
				{setPdf: {method: 'POST'}});
		
		return bookPdfService;
	}
})();