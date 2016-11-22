(function () {
	'use strict';

	angular
		.module('spaceyyz')
		.component('combobox', {
			templateUrl: 'src/launch-vehicles/combobox.html',
			controller: Combobox,
			bindings: {
				items: '=',
				display: '@display',
				selectedItem: '='
			}
		});

	function Combobox() {
		var self = this;

		this.filterName = "";
		this.isOpen = false;
		this.selectedValidItem = false;

		this.filterNameChanged = function () {
			self.isOpen = true;
			self.selectedItem = {};
			self.selectedValidItem = false;

			for (var i = 0; i < self.items.length; i++) {
				var item = self.items[i];

				if (item[self.display] == self.filterName) {
					self.selectedItem = item;
					self.selectedValidItem = true;

					break;
				}
			}
		};

		this.itemSelected = function (item) {
			self.selectedItem = item;
			self.selectedValidItem = true;
			self.filterName = item[self.display];
		};

		this.itemFilter = function (item) {
			return item[self.display].toLowerCase().includes(self.filterName.toLowerCase());
		};

	}
})();
