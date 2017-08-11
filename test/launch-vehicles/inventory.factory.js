import {assert} from 'chai';
import {firebase} from '../mocks/firebase';
window.firebase = firebase;

describe('Vehicle Inventory Factory', function () {
	let factory = undefined;

	firebase.store = {
		vehicles: {
			'aa11b': {
				name: 'test',
				description: 'test',
				key: 'aa11b',
				familyKey: 'allInThe'
			}
		},

		inventory: {
			'aa11b': {
				variants: {
					'2b||!2b': {
						count: 1
					}
				}
			}
		},

		variants: {
			'a': {
				key: 'allInThe',

				variants: {
					'small': {
						name: 'block1',
						capacity: 200
					},
					'medium': {
						name: 'blockThrice',
						capacity: 12000
					},
					'heavy': {
						name: 'blockSchfiftyFive',
						capacity: 25000
					},
					'superHeavy': {
						name: 'johnCena',
						capacity: 55000
					}
				}
			}
		}
	};

	let vehicles = [];
	let variants = [];	

	beforeEach(function () {
		angular.mock.module('spaceyyz');
		inject(function(_vehicleInventoryService_) {
			factory = _vehicleInventoryService_;
		});

		vehicles = Object.keys(firebase.store.vehicles).map(
			function (key) { return firebase.store.vehicles[key];});
		variants = Object.keys(firebase.store.variants).map(
			function (key) { 
				var family = firebase.store.variants[key];

				return {
					key: family.key,
					variants: Object.keys(family.variants).map(function (variantKey) { return family.variants[variantKey];})
				};
			});
	});

	it('should exist', function () {
		assert.isDefined(factory);
	});

	describe('combineVehiclesWithVariants', function () {
		it('should exist', function () {
			assert.isDefined(factory.combineVehiclesWithVariants);
			assert.isFunction(factory.combineVehiclesWithVariants);
		});
		
		it('should add variant to vehicle', function () {
			factory.combineVehiclesWithVariants(vehicles, variants);

			assert.isDefined(vehicles[0].variants);
			assert.include(vehicles[0].variants, variants[0].variants[0]);

		});

	});

	describe('categorizeVehicles', function () {
		it('should exist', function () {
			assert.isDefined(factory.categorizeVehicles);
			assert.isFunction(factory.categorizeVehicles);
		});

		it('should group vehicles by capacity', function () {
			factory.combineVehiclesWithVariants(vehicles, variants);
			let categories = factory.categorizeVehicles(vehicles);

			assert.isDefined(categories.smallVehicles);
			assert.isDefined(categories.mediumVehicles);
			assert.isDefined(categories.heavyVehicles);
			assert.isDefined(categories.superHeavyVehicles);

			assert.equal(categories.smallVehicles[0].variant.capacity, variants[0].variants[0].capacity);
			assert.equal(categories.mediumVehicles[0].variant.capacity, variants[0].variants[1].capacity);
			assert.equal(categories.heavyVehicles[0].variant.capacity, variants[0].variants[2].capacity);
			assert.equal(categories.superHeavyVehicles[0].variant.capacity, variants[0].variants[3].capacity);
		});
	});
});
