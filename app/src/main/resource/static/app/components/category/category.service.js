(function() {
	"use strict";

	angular
		.module('ebook-admin')
		.factory('Category', Category);

	Category.$inject = ['$resource'];
	function Category($resource) {

		var categoryService = $resource('/category/:id',
			{id: "@_id"},
			{ update: { method: 'PUT' } });

		//Mogli smo da ekstendujemo companyService, pa da onda u kontroleru koristimo Company.$saveOrUpdate(cc.company, successCallback)
		//Kada extendujemo prototip onda kažemo da će ovu metodu imati svaka instanca companyService-a.
		angular.extend(categoryService.prototype, {
			$saveOrUpdate: function(successCallback) {
				if(!this._id) {
					this.$save(successCallback);
				} else {
					this.$update(successCallback);
				}
			}
		});
		return categoryService;
	}
})();