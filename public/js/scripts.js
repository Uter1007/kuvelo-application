/**
 * Created by Christoph on 12.10.2015.
 */
(function() {
    'use strict';

    var app = angular.module('app');


    app.service('messageService', ['$http', function($http){

        var urlBase = 'api/messages';

        this.getMessages = function(){
            return $http.get(urlBase);
        };

        this.getMessage = function(id){
            return $http.get(urlBase + '/' + id);
        };

        this.addMessage = function(message){
            return $http.post(urlBase, message);
        };

        this.delMessage = function(id){
            return $http.delete(urlBase + '/' + id);
        };

        this.putMessage = function(message){
            return $http.put(urlBase + '/' + message.ID, message);
        };

    }]);

    app.controller('messageCtrl', ['$scope', 'messageService', function($scope, messageService){

    }]);


})();