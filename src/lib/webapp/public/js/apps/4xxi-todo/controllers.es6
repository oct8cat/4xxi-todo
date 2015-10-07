import angular from 'angular.all'
import services from './services'

export var controllers = angular.module('4xxi-todo.controllers', [
        'ui.router', services.name])

controllers.controller('4xxi-todo.controllers._', [
        '$scope', '$state',
        ($scope, $state) => {

}])

controllers.controller('4xxi-todo.controllers.sign', [
        '$scope', '$state', '$timeout', '4xxi-todo.services.user',
        ($scope, $state, $timeout, User) => {

    $scope.is = {
        signIn: $state.current.name === '_.sign.in',
        signUp: $state.current.name === '_.sign.up',
        signOut: $state.current.name === '_.sign.out'
    }

    $scope.credentials = {
        username: '',
        password: ''
    }

    $scope.error = null

    $scope.onSubmitSignForm = (e) => {
        e.preventDefault()
        let user = new User($scope.credentials)
        if ($scope.is.signIn) {
            user.logIn().then((user) => {
                $state.go('_.todo.list._')
            }, (err) => {
                $timeout(() => { $scope.error = err })
            })
        }
        if ($scope.is.signUp) {
            user.signUp().then((user) => {
                $state.go('_.sign.in')
            }, (err) => {
                $timeout(() => { $scope.error = err })
            })
        }
    }

    if ($scope.is.signOut) {
        User.logOut().then(() => {
            $state.go('_.sign.in')
        })
    }
}])

controllers.controller('4xxi-todo.controllers.todo', [
        '$scope', 'user',
        ($scope, user) => {

    $scope.me = user ? user.toJSON() : user
}])

controllers.controller('4xxi-todo.controllers.todo.list', [
        '$scope', '$rootScope', '$timeout', '4xxi-todo.services.parse', '4xxi-todo.services.todo',
        ($scope, $rootScope, $timeout, Parse, Todo) => {

    $scope.todos = []

    $scope.complete = (todo) => {
        todo.set('completed', true)
        todo.save().then((todo) => {})
    }

    $scope.restore = (todo) => {
        todo.unset('completed')
        todo.save().then(() => {})
    }

    $scope.remove = (todo) => {
        todo.destroy().then(() => {
            $timeout(() => {
                let indexOf = $scope.todos.indexOf(todo)
                $scope.todos.splice(indexOf, 1)
            })
        })
    }

    ;(new Parse.Query(Todo))
            .equalTo('user', Parse.User.current().id)
            .find()
            .then((todos) => {
        $timeout(() => { $scope.todos = todos })
    })

    let subscriptions = [
        $rootScope.$on('todo:created', (e, data) => {
            console.log(data.todo.get('updatedAt'))
            $scope.todos.push(data.todo)
        })
    ]

    $scope.$on('$destroy', () => {
        subscriptions.forEach((unsubscribe) => unsubscribe())
    })
}])

controllers.controller('4xxi-todo.controllers.todo.form', [
        '$scope', '$rootScope', '$timeout', '4xxi-todo.services.user', '4xxi-todo.services.todo',
        ($scope, $rootScope, $timeout, User, Todo) => {

    $scope.todo = {
        title: ''
    }

    $scope.onSubmitTodoForm = (e) => {
        e.preventDefault()
        let todo = new Todo($scope.todo)
        todo.set('user', User.current().id)
        todo.save().then((todo) => {
            $timeout(() => {
                $scope.todo = {}
                $rootScope.$emit('todo:created', {todo: todo})
            })
        })
    }

}])

controllers.controller('4xxi-todo.controllers.todo.details', ['$scope', ($scope) => {
    $scope.text = 'todo.details'
}])

export default controllers
