import angular from 'angular';

const groupBy =	angular
    .module('spaceyyz.filter', [])
		.filter('groupBy', function () {
			return function (input, group) {
				var groups = {};

				if (input === undefined) {
					return groups;
				}

        for(const element of input) {
					const groupName = element[group];

					if (groups[groupName] === undefined) {
						groups[groupName] = {
							name: groupName,
							spaceports: []
						};
					}

					groups[groupName].spaceports.push(element);
				}

				return groups;
			};
		})
    .name;

export default groupBy;
