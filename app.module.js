
angular
	.module('spaceyyz', [
		'ui.bootstrap',
		'ui.router'
	]);

/* for using webpack, require all the files so it will bundle them together
 * */

require('./app.config.js')

require('./filter.js')

require('./launch-vehicles/inventory.factory.js')
require('./launch-vehicles/order.factory.js')
require('./user.factory.js')
require('./solar-system-factory.js')
require('./flight/flight-factory.js')
require('./research-development/engine.factory.js')

require('./launch-vehicles/combobox.js')

require('./login/login.js')
require('./home.js')
require('./about.js')
require('./user.js')
require('./launch-vehicles/order-new.js')
require('./launch-vehicles/vehicle.js')
require('./launch-vehicles/vehicle-order-detail.js')
require('./launch-vehicles/order-modal.js')
require('./launch-vehicles/order-delete-modal.js')
require('./launch-vehicles/order-confirmation.js')
require('./launch-vehicles/development.js')
require('./launch-vehicles/inventory.js')
require('./launch-vehicles/config.js')
require('./launch-vehicles/config-confirm-modal.js')

require('./flight/schedule.js')
require('./flight/progress.js')
require('./flight/details.js')
require('./spaceports/spaceport-status.js')
require('./spaceports/spaceport-factory.js')
require('./spaceports/configure.js')
require('./spaceports/config-confirm-modal.js')
require('./research-development/engines.js')
