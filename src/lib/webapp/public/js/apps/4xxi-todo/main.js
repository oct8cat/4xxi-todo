;(function (require) { 'use strict';
    require.config({
        baseUrl: 'js/apps/4xxi-todo',
        paths: {
            'angular': '../../../vendors/angular/angular',
            'angular.ui.router': '../../../vendors/angular-ui-router/release/angular-ui-router',
            'angular.all': '../../shims/angular.all',
            'bootstrap': '../../../vendors/bootstrap/dist/js/bootstrap',
            'helpers.template': '../../helpers/template',
            'icanhaz': '../../../vendors/icanhaz/ICanHaz',
            'jquery': '../../../vendors/jquery/dist/jquery',
            'parse': '../../../vendors/parse/parse'
        },
        shim: {
            'angular': {exports: 'angular', deps: ['jquery']},
            'angular.ui.router': {deps: ['angular']},
            'bootstrap': {deps: ['jquery']},
            'icanhaz': {exports: 'ich', deps: ['jquery']}
        }
    })

    window.name = 'NG_DEFER_BOOTSTRAP!'
    require(['angular.all', 'app', 'bootstrap'], function (angular, app) {
        angular.element(document).ready(function () {
            angular.bootstrap(document, [app.default.name])
        })
    })

})(require)
