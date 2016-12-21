(function() {
	'use strict';

	angular
		.module('ebook-core')
		.controller('CoreController', CoreController);

	CoreController.$inject = ['$location', '$anchorScroll'];
	function CoreController($location, $anchorScroll) {
		var ccr = this;
		
		ccr.goToSection = goToSection;
		
		function goToSection(section) {
			
			$location.hash(section);
	  
		    $anchorScroll();
		}
		
	}
})();
