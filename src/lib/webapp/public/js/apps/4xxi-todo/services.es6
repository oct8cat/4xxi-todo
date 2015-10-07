import angular from 'angular.all'
import Parse from 'parse'

export var services = angular.module('4xxi-todo.services', [])

services.factory('4xxi-todo.services.parse', [() => {
    Parse.initialize('M5VBrm8GNSWxvZxm6AQhmh17Wwp5BQQydnL5lse0', '1XPYFjhJJet9p66fbmqZUgt7AC4vGtgbDj97mMYZ')
    return Parse
}])

services.factory('4xxi-todo.services.user', ['4xxi-todo.services.parse', (Parse) => {
    return Parse.User
}])

services.factory('4xxi-todo.services.todo', ['4xxi-todo.services.parse', (Parse) => {
    return Parse.Object.extend('Todo')
}])


export default services
