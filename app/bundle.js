/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	angular
		.module('spaceyyz', [
				'ui.bootstrap',
				'ui.router'
		]);
	__webpack_require__(1)
	__webpack_require__(2)
	__webpack_require__(3)
	__webpack_require__(4)
	__webpack_require__(5)
	__webpack_require__(6)
	__webpack_require__(7)
	__webpack_require__(8)
	__webpack_require__(9)
	__webpack_require__(10)
	__webpack_require__(11)
	__webpack_require__(12)
	__webpack_require__(13)
	__webpack_require__(14)
	__webpack_require__(15)
	__webpack_require__(16)
	__webpack_require__(17)
	__webpack_require__(18)
	__webpack_require__(19)
	__webpack_require__(20)
	__webpack_require__(21)



/***/ },
/* 1 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.config(function ($stateProvider) {
				var states = [ 
					{
						name: 'home',
						url: '/home',
						component: 'home'
					},
					{
						name: 'login',
						url: '/login',
						component: 'login'
					},
					{
						name: 'orderNew',
						url: '/launchVehicles/orderNew',
						component: 'orderLaunchVehicle',
						resolve: {authenticate: authenticate}
					},
					{
						name: 'vehicleOrderDetail',
						url: '/launchVehicles/orderNew/:name',
						component: 'vehicleOrderDetail',
						resolve: {authenticate: authenticate}
					},
					{
						name: 'orderConfirmation',
						url: '/launchVehicles/order/:orderNumber',
						component: 'orderConfirmation',
						params: {
							order: {},
							hiddenParam: 'YES'
						},
						resolve: {authenticate: authenticate, 
							/*order: ['$stateParams', function($stateParams) {
								return $stateParams.order;
							}]*/
						}
					},
					{
						name: 'development',
						url: '/launchVehicles/development',
						component: 'vehicleDevelopment',
						resolve: {authenticate: authenticate}
					},
					{
						name: 'completed',
						url: '/launchVehicles/inventory',
						component: 'vehicleInventory',
						resolve: {authenticate: authenticate}
					},
					{
						name: 'config',
						url: '/launchVehicles/config',
						component: 'configVehicle',
						resolve: {authenticate: authenticate}
					},
					{
						name: 'schedule',
						url: '/flight/schedule',
						component: 'scheduleFlight',
						resolve: {authenticate: authenticate}
					},
					{
						name: 'progress',
						url: '/flight/progress',
						component: 'flightProgress',
						resolve: {authenticate: authenticate}
					},
					{
						name: 'northAmericanSpaceports',
						url: '/spaceports/north-america',
						component: 'spaceports',
						resolve: {
							location: function(){return 'north america';},
							authenticate: authenticate
						}
					},
					{
						name: 'europeanSpaceports',
						url: '/spaceports/europe',
						component: 'spaceports',
						resolve: {
							location: function(){return 'europe';},
							authenticate: authenticate
						}
					},
					{
						name: 'asianSpaceports',
						url: '/spaceports/asia',
						component: 'spaceports',
						resolve: {
							location: function(){return 'asia';},
							authenticate: authenticate
						}
					},
					{
						name: 'researchEngine',
						url: '/research/engine',
						component: 'researchEngine',
						resolve: {authenticate: authenticate}
					},
					{
						name: 'designStage',
						url: '/research/stage',
						component: 'designStage',
						resolve: {authenticate: authenticate}
					},
					{
						name: 'default',
						url: '*path',
						component: 'home'
					}
				];

				states.forEach(function(state) {
					$stateProvider.state(state);
				});
			});

		function authenticate($q, $state, $timeout) {
			var user = firebase.auth().currentUser;

			//alert(user == null);
			if (user) {
				return $q.when();
			} else {
				for(var key in localStorage) {
					if (key.startsWith("firebase:authUser"))
					{
						return $q.when();
					}
				}
				
				$timeout(function() {

					$state.go('login');
				});

				return $q.reject();
			}
		}


		angular
			.module('spaceyyz')
			.run(['$state', function($state) {
				$state.defaultErrorHandler(function() {});
			}]);
					   
	})();


/***/ },
/* 2 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.factory('vehicleInventoryFactory', InventoryFactory);

		function InventoryFactory() {

			function minimumCapacity(capacity) {
				return function(vehicle) {
					return vehicle.capacity >= capacity;
				};
			}

			function maximumCapacity(capacity) {
				return function(vehicle) {
					return vehicle.capacity < capacity;
				};
			}

			function capacityBetween(minimum, maximum) {
				return function(vehicle) {
					return vehicle.capacity >= minimum && vehicle.capacity < maximum;
				};
			}

			function sortByCapacity(a, b) {
				return b.capacity - a.capacity;
			}

			function getVehicles() {

				return firebase.database().ref().child("vehicles").once('value').then(function(snapshot) {

					var gv = {};
					var vehicleObject = snapshot.val();
					var vehicles = [];
					Object.keys(vehicleObject).forEach(function (key) {
						var object = vehicleObject[key];
						object.key = key;
						object.nameWithoutSpaces = object.name.replace(/\s+/g, "-");
						vehicles.push(object);
					});

					return getInventory().then(function (inventory) {
						inventory.forEach(function (vehicle) {
							vehicles.forEach(function(v) {
								if (v.key === vehicle.key) {
									v.inventory = vehicle.count;
								}
							});
						});

						gv.vehicles = vehicles;
						gv.smallVehicles = vehicles.filter(maximumCapacity(2000)).sort(sortByCapacity);
						gv.mediumVehicles = vehicles.filter(capacityBetween(2000, 20000)).sort(sortByCapacity);
						gv.heavyVehicles = vehicles.filter(capacityBetween(20000, 50000)).sort(sortByCapacity);
						gv.superHeavyVehicles = vehicles.filter(minimumCapacity(50000)).sort(sortByCapacity);

						return gv;
					});

				});
			}

			function getVehicle(name, then) {
				getVehicles().then(function(vehicles) {
					then(vehicles.vehicles.filter(function(vehicle) {
						return vehicle.nameWithoutSpaces == name;
					})[0]);
				});
			}

			function getInventory() {
				return firebase.database().ref().child("inventory").once('value').then(function(snapshot) {
					var inventoryObject = snapshot.val();

					var inventory = [];

					Object.keys(inventoryObject).forEach(function (key) {
						var object = inventoryObject[key];
						object.key = key;
						inventory.push(object);
					});

					//then(inventory);
					return inventory;
				});
			}

			function addVehicle(vehicle) {
				var key = firebase.database().ref().child("vehicles").push().key;
				var updates = {};

				var inventory = {
					count: 0
				};

				updates["/vehicles/" + key] = vehicle;
				updates["/inventory/" + key] = inventory;

				firebase.database().ref().update(updates);
			}

			function updateVehicle(vehicle)
			{
				/*firebase.database().ref().child("inventory/" + vehicle.key).update({
					count: vehicle.count 
				});*/

				firebase.database().ref().child("vehicles/" + vehicle.key).set({
					capacity: vehicle.capacity,
					cost: vehicle.cost,
					name: vehicle.name,
					description: vehicle.description
				});
			}

			function deleteVehicle(vehicle)
			{
				firebase.database().ref().child("vehicles/" + vehicle.key).remove();
			}

			return {
				getVehicle: getVehicle,
				getVehicles: getVehicles,
				getInventory: getInventory,
				updateVehicle: updateVehicle,
				deleteVehicle: deleteVehicle,
				addVehicle: addVehicle
			}

		}
	})();


/***/ },
/* 3 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.factory('orderFactory', OrderFactory);

		function OrderFactory() {

			function getOrders() {
				return firebase.database().ref().child("orders/current").once('value').then(function(snapshot) {
					var orderObject = snapshot.val();

					var orders = [];

					Object.keys(orderObject).forEach(function (key) {
						var object = orderObject[key];
						object.key = key;
						object.deliveryDate = new Date(object.deliveryTimestamp);
						object.orderDate = new Date(object.orderTimestamp);
						orders.push(object);
					});

					return orders;
				});
			}

			function getOrder(number) {
				return getOrders().then(function (orders) {
					var order = {};

					orders.forEach(function (o) {
						if (o.number === number) {
							order = o;
						}
					});

					return order;
				});
			}

			function getNewOrderNumber() {
				return firebase.database().ref().child("orders/nextId").transaction(
					function (currentValue) {
						return (currentValue || 0) + 1;
				});
			}

			function addOrder(order) {
				var key = firebase.database().ref().child("orders/current").push().key;
				var updates = {};

				order.deliveryTimestamp = order.deliveryDate.getTime();

				updates["/orders/current/" + key] = order;
				firebase.database().ref().update(updates);
			}

			return {
				getOrders: getOrders,
				getOrder: getOrder,
				getNewOrderNumber: getNewOrderNumber,
				addOrder: addOrder
			}

		}
	})();


/***/ },
/* 4 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.factory('userFactory', UserFactory);

		function UserFactory() {
			this.email = "";
			this.password = "";


			this.authChangeSubscribers = {};
			this.onAuthChange = function(subscriber, f) {self.authChangeSubscribers[subscriber] = f;}

			var factory = {
				email: this.email,
				user: {
					email: "" 
				},
				getEmail: getEmail,
				login: login,
				logout: logout,
				register: register,
				onAuthChange: this.onAuthChange
			};

			if (firebase.auth().currentUser) {
				//alert("still logged in");
				factory.user.email = firebase.auth().currentUser.email;
			}

			var self = this;
			firebase.auth().onAuthStateChanged(function(user) {
				if (user){
				//alert("auth statechange: " + user.email);

				/*if (user) {
					self.email = user.email;
				} else {
					self.email = "";
				}*/

					factory.user.email = user.email;
				} else {
					//alert("auth state change invalid");
					factory.user.email = "";
				}

				Object.keys(self.authChangeSubscribers).forEach(function(key) {
					self.authChangeSubscribers[key](user);
				});


			});

			//this.getEmail = function() {return this.email;};
			function getEmail() {
				return this.factory.user.email;
			}

			//this.login = function(email, password, then) {
			function login(email, password, theny) {
				//alert("Logging in with: " + email + ", " + password);

				firebase.auth()
					.signInWithEmailAndPassword(email, password).catch(function (error) {
						alert("Error logging in: " + error.code + ", " + error.message);
					})
					.then(theny());
			};

			//this.logout = function() {
			function logout() {
				//alert("logging out");
				firebase.auth().signOut().then(function() {
					//alert("logged out successfully");
					factory.user.email = "";
				}, function(error) {
					alert("error logging out: " + error);});	
			};

			//this.register = function(email, password) {
			function register(email, password) {

				alert("Registering with: " + email + ", " + password);

				firebase.auth()
					.createUserWithEmailAndPassword(email, password).catch(function (error) {
						alert("Error registering: " + error.code + ", " + error.message);
					});
			};


			/*var factory =  {
				email: this.email,
				user: {
					email: self.email
				},
				getEmail: this.getEmail,
				login: this.login,
				logout: this.logout,
				register: this.register,
				onAuthChange: this.onAuthChange
			};*/

			return factory;
		}

	})();


/***/ },
/* 5 */
/***/ function(module, exports) {

	(function () {
		'use strict';

		angular
			.module('spaceyyz')
			.component('login', {
				templateUrl: 'login/login.html',
				controller: Login
			});

		function Login(userFactory, $state) {

			this.email = "";
			this.password = "";
			this.login = function() {
				userFactory.login(this.email, this.password, function() {
					$state.go('home');
				});
			};
			this.register = function() {userFactory.register(this.email, this.password);};

	/*		this.email = "";
			this.password = "";

			this.login = function() {
				alert("Logging in with: " + this.email + ", " + this.password);

				firebase.auth()
					.signInWithEmailAndPassword(this.email, this.password).catch(function (error) {
						alert("Error logging in: " + error.code + ", " + error.message);
					});
			};

			this.register = function() {

				alert("Registering with: " + this.email + ", " + this.password);

				firebase.auth()
					.createUserWithEmailAndPassword(this.email, this.password).catch(function (error) {
						alert("Error registering: " + error.code + ", " + error.message);
					});

			};*/
		}
	})();


/***/ },
/* 6 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.component('home', {
				templateUrl: 'home.html',
				controller: Home
			});

		function Home() {
		}
	})();


/***/ },
/* 7 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.controller('userAccount', UserAccount);

		function UserAccount(userFactory, $state, $scope, $timeout) {
			this.user = userFactory;
			$scope.user = userFactory;
			this.getEmail = function(){return userFactory.getEmail();};
			this.email = function(){return userFactory.getEmail();};
			this.login = function(email, password) {
				userFactory.login(email, password, function() {
					$state.go('home');
				});
			};

			this.logout = function() {
				this.email = "";
				userFactory.logout();
				$state.go('home');
			};

			var self = this;
			this.isLoggedIn = function() {
				return self.user.user.email !== "";
			};

			userFactory.onAuthChange(self, function (user) {
				$timeout(function() {
					$scope.$apply();
				});
			});
		}
	})();


/***/ },
/* 8 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.component('orderLaunchVehicle', {
				templateUrl: 'launch-vehicles/order-new.html',
				controller: OrderLaunchVehicle 
			});	

		function OrderLaunchVehicle(vehicleInventoryFactory, $scope, $timeout) {
			this.primaries = [
				{name: "Earth", satellites: ["None", "Moon"], selectedSatellite: "None"},
				{name: "Mars", satellites: ["None", "Phobos", "Deimos"], selectedSatellite: "None"}
			];

			this.vehicles = {
				all: [],
				small: [],
				medium: [],
				heavy: [],
				superHeavy: []
			}

			this.selectedPrimary = this.primaries[0];
			this.search_name = "";
			this.search_payload = 10000;
			var self = this;

			vehicleInventoryFactory.getVehicles().then(set);
			vehicleInventoryFactory.getInventory().then(setInventory);

			function set(vehicles) {
				self.vehicles.all = vehicles.vehicles;
				self.vehicles.small = vehicles.smallVehicles;
				self.vehicles.medium = vehicles.mediumVehicles;
				self.vehicles.heavy = vehicles.heavyVehicles;
				self.vehicles.superHeavy = vehicles.superHeavyVehicles;

				$timeout(function() {
					$scope.$apply();
				});
			}
			
			function setInventory(inventory) {
				self.inventory = inventory;
			}

			this.search = function(type) {
				if (type === "name") {
					return function(vehicle) {
						return vehicle.name.toLowerCase().includes(self.search_name.toLowerCase());
					};
				} else if (type === "capacity") {
					return function(vehicle) {
						return vehicle.capacity >= self.search_payload;
					};
				} else {
					alert(type + " shouldn't get here");
				}
			}

			this.order = function(vehicle) {
				var inv = this.inventory.find(function(v) {return v.key === vehicle.key;});
				inv.count++;
				vehicleInventoryFactory.updateVehicle(inv);
			}
		}
	})();


/***/ },
/* 9 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.component('vehicleList', {
				templateUrl: 'launch-vehicles/vehicle.html',
				controller: Vehicle,
				bindings: {
					vehicles: '<',
				}
			});

		function Vehicle() {
			this.searchType = "name";
			this.search_name = "";
			this.search_payload = 10000;
			var self = this;

			this.search = function(type) {
				if (type === "name") {
					return function(vehicle) {
						return vehicle.name.toLowerCase().includes(self.search_name.toLowerCase());
					};
				} else if (type === "capacity") {
					return function(vehicle) {
						return vehicle.capacity >= self.search_payload;
					};
				} else {
					alert(type + " shouldn't get here");
				}
			}
		}
	})();


/***/ },
/* 10 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.component('vehicleOrderDetail', {
				templateUrl: 'launch-vehicles/vehicle-order-detail.html',
				controller: VehicleOrderDetail 
			});	

		function VehicleOrderDetail(vehicleInventoryFactory, 
				$scope, $timeout, $stateParams,
				$uibModal, $state, orderFactory) {

			this.vehicle = {};
			var self = this;

			vehicleInventoryFactory.getVehicle($stateParams.name, function(vehicle) {
				self.vehicle = vehicle;

				$timeout(function() {
					$scope.$apply();
				});
			});

			self.modalInstance = {};
			this.open = function() {
				self.modalInstance = $uibModal.open({
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'launch-vehicles/order-modal.html',
					component: 'orderVehicleModal',
					backdrop: 'static',
					resolve: {
						vehicle: function() {
							return self.vehicle;
						}
					}
				
				});

				self.modalInstance.result.then(function(thing) {

					var deliveryDate = new Date(); 
					deliveryDate.setFullYear(new Date().getFullYear() + 1);

					var order = {
						orderTimestamp: new Date().getTime(),
						deliveryDate: deliveryDate,
						vehicleName: self.vehicle.name
					};

					orderFactory.getNewOrderNumber().then(function(snapshot) {
						var orderNumber = snapshot.snapshot.val();
						order.number = orderNumber;
						orderFactory.addOrder(order);

						$state.go('orderConfirmation', {orderNumber: orderNumber, order: order});
					}, function (error) {
						console.error(error);
					});
				});

			};
		}
	})();


/***/ },
/* 11 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.component('orderVehicleModal', {
				controller: OrderVehicleModal,
				templateUrl: 'launch-vehicles/order-modal.html',
				bindings: {
					resolve: '<',
					modalInstance: '<'
				}
			});	

		function OrderVehicleModal(vehicleInventoryFactory, 
				$scope, $timeout, $stateParams) {

			this.vehicle = this.resolve.vehicle;
			var self = this;

			this.cancel = function() {
				self.modalInstance.dismiss('cancel');
			};

			this.confirm = function() {
				self.modalInstance.close({name: 0});
			};

		}
	})();


/***/ },
/* 12 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.component('orderConfirmation', {
				templateUrl: 'launch-vehicles/order-confirmation.html',
				controller: OrderConfirmation,
			});	

		function OrderConfirmation(orderFactory, 
				$scope, $timeout, $stateParams) {

			var self = this;
			this.order = $stateParams.order;

			if (typeof this.order.number === "undefined") {
				//possibly refreshed the page, see if we can pull up the order from the db
				orderFactory.getOrder(Number($stateParams.orderNumber)).then(function (order) {
					self.order = order;
					
					$timeout(function() {
						$scope.$apply();
					});
				});
			}

		}
	})();



/***/ },
/* 13 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.component('vehicleDevelopment', {
				templateUrl: 'launch-vehicles/development.html',
				controller: VehicleDevelopment 
			});	

		function VehicleDevelopment(orderFactory, $timeout, $scope) {
			this.orders = {
				all: []
			};

			var self = this;

			orderFactory.getOrders().then(function (orders) {
				self.orders.all = orders;

				var timestampNow = new Date().getTime();

				self.orders.all.forEach(function (order) {
					var t = timestampNow - order.orderTimestamp;
					
					order.progress = 100 * t / (order.deliveryTimestamp - order.orderTimestamp);
				});

				$timeout(function() {
					$scope.$apply();
				});
			});
		}
	})();


/***/ },
/* 14 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.component('vehicleInventory', {
				templateUrl: 'launch-vehicles/inventory.html',
				controller: Inventory
			});

		function Inventory(vehicleInventoryFactory, $timeout, $scope) {
			vehicleInventoryFactory.getVehicles().then(set);

			this.searchType = "name";
			this.search_name = "";
			this.search_payload = 0;

			var self = this;
			function set(vehicles) {
				self.smallVehicles = vehicles.smallVehicles;
				self.mediumVehicles = vehicles.mediumVehicles;
				self.heavyVehicles = vehicles.heavyVehicles;
				self.superHeavyVehicles = vehicles.superHeavyVehicles;

				$timeout(function() {
					$scope.$apply();
				});
			}
		}
	})();


/***/ },
/* 15 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.component('configVehicle', {
				templateUrl: 'launch-vehicles/config.html',
				controller: Config
			});

		function Config(vehicleInventoryFactory, $scope, $timeout, $uibModal) {

			var self = this;
			this.vehicles = {
				all: [],
			};

			this.newVehicle = {};

			this.search_name = "";
			this.search = function(vehicle) {
				return vehicle.name.toLowerCase().includes(self.search_name.toLowerCase());
			};

			this.editVehicle = function(vehicle) {
				vehicle.beingEdited = true;
			};

			this.cancelEditVehicle = function(vehicle) {
				vehicle.beingEdited = false;
			};

			this.saveVehicle = function(vehicle) {
				vehicle.beingEdited = false;
				vehicleInventoryFactory.updateVehicle(vehicle);

				var index = self.vehicles.all.findIndex(function(v) { return v.name === vehicle.name;});

				self.vehicles.all[index] = vehicle;
			};

			self.modalInstance = {};
			this.deleteVehicle = function (vehicle) {
				self.modalInstance = $uibModal.open({
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					component: 'confirmVehicleDeleteModal',
					backdrop: 'static',
					resolve: {
						vehicle: function() {
							return vehicle;
						}
					}
				
				});

				self.modalInstance.result.then(function (vehicle) {
					vehicleInventoryFactory.deleteVehicle(vehicle);
					
					self.vehicles.all.splice(self.vehicles.all.indexOf(vehicle), 1);
				});

			};

			this.createVehicle = function(vehicle) {
				vehicleInventoryFactory.addVehicle(vehicle);
				self.vehicles.all.push(vehicle);
				self.newVehicle = {};
			};

			vehicleInventoryFactory.getVehicles().then(function (vehicles) {
				self.vehicles.all = vehicles.vehicles;

				$timeout(function() {
					$scope.$apply();
				});
			});

		}
	})();


/***/ },
/* 16 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.component('confirmVehicleDeleteModal', {
				controller: ConfirmVehicleDeleteModal,
				templateUrl: 'launch-vehicles/config-confirm-modal.html',
				bindings: {
					resolve: '<',
					modalInstance: '<'
				}
			});	

		function ConfirmVehicleDeleteModal(vehicleInventoryFactory, 
				$scope, $timeout, $stateParams) {

			this.vehicle = this.resolve.vehicle;
			var self = this;

			this.cancel = function() {
				self.modalInstance.dismiss('cancel');
			};

			this.confirm = function() {
				self.modalInstance.close(self.vehicle);
			};

		}
	})();


/***/ },
/* 17 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.component('scheduleFlight', {
				templateUrl: 'flight/schedule.html',
				controller: ScheduleFlight
			});

		function ScheduleFlight(vehicleInventoryFactory, $timeout, $scope) {
			this.payload = 0;

			var self = this;

			this.filter = function(vehicle) {
				//alert(typeof self.payload);
				return vehicle.capacity >= Number(self.payload);
			};

			this.vehicles = {all: []};
			this.selectedVehicle = {};
			this.datePicker = {
				isOpen: false
			};

			vehicleInventoryFactory.getVehicles().then(function (vehicles) {
				self.vehicles.all = vehicles.vehicles;

				self.vehicles.all.forEach(function (vehicle) {
					vehicle.selected = false;
				});

				$timeout(function() {
					$scope.$apply();
				});
			});

		}
	})();


/***/ },
/* 18 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.component('flightProgress', {
				templateUrl: 'flight/progress.html',
				controller: FlightProgress
			});

		function FlightProgress() {
		}
	})();


/***/ },
/* 19 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.component('spaceports', {
				templateUrl: 'spaceports/spaceports.html',
				controller: Spaceports,
				bindings: {location: '<'}
			})
			/*.run(function ($rootScope, $state, $stateParams) {
				$rootScope.$state = $state;
				$rootScope.$stateParams = $stateParams;
			});*/
		;

		function Spaceports() {
			//this.location = $state.current.data.location;
			//this.location = location;
			//alert($rootScope.$state.data.location)
			/*$rootScope.$on('$stateChangeSuccess', 
					function(event, toState, toParams, fromState, fromParams) {
					   	//event.preventDefault();
						alert("test");
						console.log(toState.data.location);
				   		this.location = $state.current.data.location;
					}
					);*/		
		}

		//Spaceports.$inject = ['$rootScope'];
	})();


/***/ },
/* 20 */
/***/ function(module, exports) {

	(function() {
		'use strict';

		angular
			.module('spaceyyz')
			.component('researchEngine', {
				templateUrl: 'research-development/engine.html',
				controller: ResearchEngine
			});

		function ResearchEngine() {

		}
	})();


/***/ },
/* 21 */
/***/ function(module, exports) {

	(function () {
		'use strict';

		angular
			.module('spaceyyz')
			.component('designStage', {
				templateUrl: 'research-development/stage.html',
				controller: DesignStage
			});

		function DesignStage() {
		}
	})();


/***/ }
/******/ ]);