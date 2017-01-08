(function() {
	"use strict";

	angular
		.module('ebook-book')
		.factory('Book', Book);

	Book.$inject = ['$resource'];
	function Book($resource) {

		var bookService = $resource('/book/:id',
			{id: "@_id"},
			{ update: { method: 'PUT' } },
			{ delete: { method: 'DELETE', params: {id: "@_id"}}});

		//Mogli smo da ekstendujemo companyService, pa da onda u kontroleru koristimo Company.$saveOrUpdate(cc.company, successCallback)
		//Kada extendujemo prototip onda kažemo da će ovu metodu imati svaka instanca companyService-a.
		angular.extend(bookService.prototype, {
			$saveOrUpdate: function(successCallback) {
				if(!this._id) {
					this.$save(successCallback);
				} else {
					this.$update(successCallback);
				}
			}
		});
		return bookService;
	}
})();