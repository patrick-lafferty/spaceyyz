import angular from 'angular';
import uiRouter from 'angular-ui-router';
import components from './app.components';
import configure from './app.config';

angular
    .module('spaceyyz', [
        components,
        uiRouter,
        'ui.bootstrap'
    ]);

configure();
