(function() {
	"use strict";

	angular
		.module('ebook-user')
		.factory('User', User);

	User.$inject = ['$resource'];
	function User($resource) {

		var userService = $resource('/user/:id',
			{id: "@_id"},
			{ update: { method: 'PUT' } });

		//Mogli smo da ekstendujemo companyService, pa da onda u kontroleru koristimo Company.$saveOrUpdate(cc.company, successCallback)
		//Kada extendujemo prototip onda kažemo da će ovu metodu imati svaka instanca companyService-a.
		angular.extend(userService.prototype, {
			$saveOrUpdate: function(successCallback) {
				if(!this._id) {
					this.$save(successCallback);
				} else {
					this.$update(successCallback);
				}
			}
		});
		return userService;
	}
})();