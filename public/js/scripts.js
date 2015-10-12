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
            return $http.put(urlBase + '/' + message.cid, message);
        };

    }]);

    app.controller('messageDetailCtrl', ['$scope','$location' ,'messageService', '$window', function($scope, $location, messageService, window){

        $scope.message = null;
        $scope.status = null;
        $scope.id = null;


        function update(message){
            messageService.putMessage(message)
                .success(function (message) {
                    console.log("Success");
                    $scope.status = "Success";
                })
                .error(function (error) {
                    $scope.status = 'Unable to load messages: ' + error.message;
                });
        }

        function create(message){
            messageService.addMessage(message)
                .success(function (message) {
                    console.log("Success");
                    $scope.status = "Success";
                })
                .error(function (error) {
                    $scope.status = 'Unable to load messages: ' + error.message;
                });
        }

        function remove(id){
            messageService.delMessage(id)
                .success(function (message) {
                    console.log("Success");
                    $scope.status = "Success";
                })
                .error(function (error) {
                    $scope.status = 'Unable to load messages: ' + error.message;
                });
        }

        function loadMessage(id){
            messageService.getMessage(id)

                .success(function (message) {
                    $scope.message = message;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load messages: ' + error.message;
                });
        }

        $scope.save = function(){
            console.log("Save");

            if ($scope.message.cid != null){
                update($scope.message);
            }else{
                create($scope.message);
            }

        };

        $scope.delete = function(){
            console.log("Delete");
            remove($scope.message.cid);
        };



        (function init() {
            var id = $location.path().split("/")[2];

            if (id && id !="add"){

                console.log(id);
                $scope.id = id;
                loadMessage(id);
            }
        })();


    }]);

    app.controller('messageCtrl', ['$scope', 'messageService', '$location','$window', function($scope, messageService, $location, $window){

        $scope.messages = null;
        $scope.status = null;

        $scope.createMessage = function(){
            $window.location.href = '/details/add';
        }

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