(function () {
	'use strict';

	angular
		.module('spaceyyz')
		.filter('groupBy', function () {
			return function (input, group) {
				var groups = {};

				if (typeof input === 'undefined') {
					return groups;
				}

				for(let i = 0; i < input.length; i++) {
					const element = input[i];
					const groupName = element[group];

					if (typeof groups[groupName] === 'undefined') {
						groups[groupName] = {
							name: groupName,
							spaceports: []
						};
					}

					groups[groupName].spaceports.push(element);
				}

				return groups;
			};
		});
})();
