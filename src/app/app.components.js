import angular from 'angular';
//import flight from 'app.components.flight';
import launchVehicles from './app.components.launch-vehicles';
import user from './app.components.user';
//import researchDevelopment from 'app.components.researchDevelopment';
//import spaceports from 'app.components.spaceports';
import about from '../about';

const components = angular
    .module('spaceyyz.components', [
        //flight,
        launchVehicles,
        user,
        //researchDevelopment,
        //spaceports
        about
    ])
    .name;

export default components;