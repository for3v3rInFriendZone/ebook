(function() {
	'use strict';
	
	angular
	.module('ebook-user')
	.directive("fileread", fileread);
	
	fileread.$inject = ['BookPdf', 'Book'];
	function fileread(BookPdf, Book) { 
	    return { 
	        scope: {
	            fileread: "="
	        },
	        link: function (scope, element, attributes) {
	            element.bind("change", function (changeEvent) {
	                var reader = new FileReader();
	                reader.onload = function (loadEvent) {
	                    scope.$apply(function () {
	                        scope.fileread = loadEvent.target.result;
	                        var bookPdf = new BookPdf();
	                        var ebook = new Book();
	                        bookPdf.filename = scope.fileread;
	                        bookPdf.$setPdf(function(info) {
	                        	ebook.filename = info.filename;
	                        	ebook.author = info.author;
	                        	ebook.title = info.title;
	                        	ebook.keywords = info.keywords;
	                        	scope.fileread = ebook;
	                        });
	                    });
	                }
	                reader.readAsDataURL(changeEvent.target.files[0]);
	            });
	        }
	    }
	};
})();