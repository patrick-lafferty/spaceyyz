(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.directive('vehicleSearch', function() {
			return {
				/*scope: {
					searchType: '=search_type',
					search_name: '=search_name',
					search_payload: '=search_payload'
				},*/
				templateUrl: 'launch-vehicles/search-directive.html'
			};
		});
})();
