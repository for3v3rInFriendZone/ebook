(function() {
	"use strict";

	angular
		.module('ebook-book')
		.factory('Language', Language);

	Language.$inject = ['$resource'];
	function Language($resource) {

		var languageService = $resource('/language/:id',
			{id: "@_id"});

		//Mogli smo da ekstendujemo companyService, pa da onda u kontroleru koristimo Company.$saveOrUpdate(cc.company, successCallback)
		//Kada extendujemo prototip onda kažemo da će ovu metodu imati svaka instanca companyService-a.
		angular.extend(languageService.prototype, {
			$saveOrUpdate: function(successCallback) {
				if(!this._id) {
					this.$save(successCallback);
				} else {
					this.$update(successCallback);
				}
			}
		});
		return languageService;
	}
})();