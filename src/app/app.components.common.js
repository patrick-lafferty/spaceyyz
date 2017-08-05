import angular from 'angular';
import combobox from '../common/combobox';

const common = angular
    .module('spaceyyz.components.common', [
        combobox
    ])
    .name;

export default common;