import angular from 'angular';
import common from './app.components.common';
import flight from './app.components.flight';
import launchVehicles from './app.components.launch-vehicles';
import user from './app.components.user';
import researchDevelopment from './app.components.research-development';
import spaceports from './app.components.spaceports';
import about from '../about';
import groupBy from '../filter';
import solarSystem from '../solar-system-service';

const components = angular
    .module('spaceyyz.components', [
        common,
        flight,
        launchVehicles,
        user,
        researchDevelopment,
        spaceports,
        about,
        groupBy,
        solarSystem
    ])
    .name;

export default components;
