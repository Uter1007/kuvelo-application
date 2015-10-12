/**
 * Created by Christoph on 12.10.2015.
 */
(function() {
    'use strict';

    var app = angular.module('app', ['ngRoute']);

    app.config(function($locationProvider, $routeProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

    app.service('messageService', ['$http', function($http){

        var urlBase = '/api/messages';

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

    app.controller('messageDetailCtrl', ['$scope','$location' ,'messageService', function($scope, $location, messageService){

        $scope.message = null;
        $scope.status = null;
        $scope.id = null;

        function loadMessage(id){
            messageService.getMessage(id)

                .success(function (message) {
                    $scope.message = message;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load messages: ' + error.message;
                });
        }

        (function init() {
            var id = $location.path().split("/")[2];
            console.log(id);
            $scope.id = id;
            loadMessage(id);
        })();


    }]);

    app.controller('messageCtrl', ['$scope', 'messageService', function($scope, messageService){

        $scope.messages = null;
        $scope.status = null;


        function loadMessages(){
            messageService.getMessages()

            .success(function (messages) {
                $scope.messages = messages;
            })
            .error(function (error) {
                $scope.status = 'Unable to load messages: ' + error.message;
            });
        }

        (function init() {
            loadMessages();
        })();

    }]);


})();