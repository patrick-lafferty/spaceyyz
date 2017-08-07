import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import components from './app.components';
import configure from './app.config';

angular
    .module('spaceyyz', [
        components,
        uirouter,
        'ui.bootstrap'
    ]);

configure();
