(function() {
	'use strict';

	angular
		.module('ebook-book')
		.controller('BookController', BookController);

	BookController.$inject = ['$scope', 'localStorageService', '$state', 'book', 'title', 'users', 'categories', 'languages', 'BookPdf'];
	function BookController($scope, localStorageService, $state, book, title, users, categories, languages, BookPdf) {
		
		var bcr = this;	
		
		bcr.book = book;
		bcr.title = title;
		bcr.users = users;
		bcr.categories = categories;
		bcr.languages = languages;
		bcr.currentState = $state.current.name;
		bcr.cancel = cancel;
		bcr.done = done;
		bcr.remove = remove;
		
		function cancel() {
			$state.go('main.listBook');
		}
		
		function done() {
			bcr.submitted = true;
			if(bcr.form.$invalid) {
				return;
			}
			if(bcr.book.image == null || bcr.book.image == undefined || bcr.book.image == '') {
				bcr.book.image = 'http://psicoterapeutas.eu/imagenes-psicoterapeutas-eu/Photoxpress_4839887.jpg';
			}
			
			bcr.book.$saveOrUpdate(cancel);
		}
		
		function remove() {
			bcr.book.$delete({id: bcr.book.id}, successRemoveModal);
		}
		
		function successRemoveModal() {
			alert('Book with id: '+ bcr.book.id + ' has been successfully removed.');
			$state.go('main.listBook');
		}
	}
})();
