'use strict';

import {appModule} from '../app'

appModule.controller('AppCtrl', [
    '$scope', '$mdSidenav',
    function ($scope, $mdSidenav) {

        /**
         * Called when the 'Menu' button is clicked
         */
        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };
    }
]);