import angular from 'angular';

class Combobox {

	constructor() {
		this.filterName = '';
		this.isOpen = false;
		this.selectedValidItem = false;
	}
	
	filterNameChanged() {
		this.isOpen = true;
		this.selectedItem = this.items.find(item => item[this.display] === this.filterName); 
		this.selectedValidItem = this.selectedItem !== undefined;
	}

	itemSelected(item) {
		this.selectedItem = item;
		this.selectedValidItem = true;
		this.filterName = item[this.display];
	}

	itemFilter(item) {
		return item[this.display].toLowerCase().includes(this.filterName.toLowerCase());
	}
}

const combobox = angular
		.module('spaceyyz.common.combobox', [])
		.component('combobox', {
			templateUrl: 'src/common/combobox.html',
			controller: Combobox,
			bindings: {
				items: '=',
				display: '@display',
				selectedItem: '='
			}
		})
		.name;

export default combobox;