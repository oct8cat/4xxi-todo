import angular from 'angular.all'
import tpl, {init as initTemplates} from 'helpers.template'
import services from './services'
import controllers from './controllers'

export var app = angular.module('4xxi-todo', [
        'ui.router', services.name, controllers.name])
    .config([
            '$stateProvider', '$urlRouterProvider',
            ($stateProvider, $urlRouterProvider) => {
        initTemplates()
        $urlRouterProvider.otherwise('/todos')
        $stateProvider
            .state('_', {
                abstract: true,
                controller: '4xxi-todo.controllers._',
                template: tpl('_')
            })
            .state('_.sign', {
                abstract: true,
                url: '/sign',
                template: tpl('empty')
            })
            .state('_.sign.in', {
                url: '/in',
                template: tpl('sign'),
                controller: '4xxi-todo.controllers.sign'
            })
            .state('_.sign.up', {
                url: '/up',
                template: tpl('sign'),
                controller: '4xxi-todo.controllers.sign'
            })
            .state('_.sign.out', {
                url: '/out',
                template: tpl('empty'),
                controller: '4xxi-todo.controllers.sign'
            })
            .state('_.todo', {
                abstract: true,
                template: tpl('todo'),
                controller: '4xxi-todo.controllers.todo',
                resolve: {
                    user: ['4xxi-todo.services.user', (User) => User.current()]
                }
            })
            .state('_.todo.list', {
                abstract: true,
                template: tpl('todo.list')
            })
            .state('_.todo.list._', {
                url: '/todos',
                views: {
                    'form': {
                        template: tpl('todo.list.form'),
                        controller: '4xxi-todo.controllers.todo.form'
                    },
                    'list': {
                        template: tpl('todo.list.list'),
                        controller: '4xxi-todo.controllers.todo.list'
                    }
                }
            })
    }])
    .run([
            '$rootScope', '$state', '4xxi-todo.services.user',
            ($rootScope, $state, User) => {
        $rootScope.$on('$stateChangeStart', (e, toState) => {
            let isSignState = toState.name.match(/^_\.sign\./)
            if (!User.current() && !isSignState) {
                e.preventDefault()
                $state.go('_.sign.in')
            }
        })
    }])

export default app
