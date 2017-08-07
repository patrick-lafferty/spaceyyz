import angular from 'angular';
import home from '../user/home';
import login from '../user/login';
import account from '../user/account';
import service from '../user/user.service';

const user = angular
    .module('spaceyyz.components.user', [
        home,
        login,
        account,
        service
    ])
    .name;

export default user;