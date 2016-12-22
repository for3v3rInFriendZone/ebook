(function() {
	'use strict';

	angular
		.module('ebook-core')
		.controller('CoreController', CoreController);

	CoreController.$inject = ['$location', '$anchorScroll', '$state', 'localStorageService'];
	function CoreController($location, $anchorScroll, $state, localStorageService) { 
		var ccr = this;
		ccr.goToSection = goToSection;
		
		if(localStorageService.get('admin') != null || localStorageService.get('admin') != undefined) {
			$state.go('admin', {username: localStorageService.get('admin').username});
		} else if(localStorageService.get('subscriber') != null || localStorageService.get('subscriber') != undefined) {
			$state.go('subscriber', {username: localStorageService.get('subscriber').username});
		}
		
		function goToSection(section) {
			
			$location.hash(section);
	  
		    $anchorScroll();
		}
		
		
		
	}
})();
