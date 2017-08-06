import angular from 'angular';
import common from './app.components.common';
//import flight from 'app.components.flight';
import launchVehicles from './app.components.launch-vehicles';
import user from './app.components.user';
import researchDevelopment from './app.components.research-development';
//import spaceports from 'app.components.spaceports';
import about from '../about';

const components = angular
    .module('spaceyyz.components', [
        common,
        //flight,
        launchVehicles,
        user,
        researchDevelopment,
        //spaceports
        about
    ])
    .name;

export default components;