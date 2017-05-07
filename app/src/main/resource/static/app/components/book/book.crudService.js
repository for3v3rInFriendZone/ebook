(function() {
	"use strict";

	angular
		.module('ebook-book')
		.factory('Book', Book);

	Book.$inject = ['Restangular'];
	function Book(Restangular) {

		return {
			save: function(book, callback) {
				return Restangular.all('book').post(book).then(function(data) {
					callback();
				});
			},
			findAll: function() {
				return Restangular.all('book').getList();
			},
			findOne: function(bookId) {
				return Restangular.one('book', bookId).get();
			},
			remove: function(bookId, callback) {
				return Restangular.one('book', bookId).remove().then(function(data) {
					callback();
				});
			}
		};
	}
})();