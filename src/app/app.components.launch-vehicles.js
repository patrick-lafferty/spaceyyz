import angular from 'angular';
import inventoryFactory from '../launch-vehicles/inventory.factory';
import orderFactory from '../launch-vehicles/order.factory';
import vehicleVariantFactory from '../launch-vehicles/vehicle-variant.factory';
import orderNew from '../launch-vehicles/order-new';
import vehicle from '../launch-vehicles/vehicle';
import vehicleOrderDetail from '../launch-vehicles/vehicle-order-detail';
import orderModal from '../launch-vehicles/order-modal';
import orderDeleteModal from '../launch-vehicles/order-delete-modal';
import orderConfirmation from '../launch-vehicles/order-confirmation';
import development from '../launch-vehicles/development';
/*import inventory from '../launch-vehicles/inventory';
import config from '../launch-vehicles/config';
import configConfirmModal from '../launch-vehicles/config-confirm-modal';
*/
const launchVehicles = angular
    .module('spaceyyz.components.launchVehicles', [
        inventoryFactory,
        orderFactory,
        vehicleVariantFactory,
        orderNew,
        vehicle,
        vehicleOrderDetail,
        orderModal,
        orderDeleteModal,
        orderConfirmation,
        development,
        /*inventory,
        config,
        configConfirmModal*/
    ])
    .name;

export default launchVehicles;