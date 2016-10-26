(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('spaceportStatus', {
			templateUrl: 'spaceports/spaceport-status.html',
			controller: Spaceports,
		});

	function Spaceports(spaceportFactory) {
		this.spaceports = spaceportFactory.getSpaceports();
	}
})();
