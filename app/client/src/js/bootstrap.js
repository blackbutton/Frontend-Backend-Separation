 (function() {


     var initInjector = angular.injector(['ng']);
     var $http = initInjector.get('$http');


     // API 服务器地址 以及 版本
     var options = {};

     options.baseUrl = "/xgk";
     options.apiBaseUrl = '/xgk/api';
     options.apiVersion = 1;



     $http.get(options.apiBaseUrl + '/who?noCache=' + (new Date().getTime())).then(
         function(response) {

             if (!response.data || !response.data.type) {
                  window.location.href = '/datacenter/';
                 return;
             }

             angular.module('config', []).constant('CONFIG', {
                 currentUserId: response.data.id,
                 currentUserType: response.data.type,
                 token: response.data.token,
                 baseUrl: options.baseUrl,
                 apiBaseUrl: options.apiBaseUrl,
                 apiVersion: options.apiVersion
             });

             angular.element(document).ready(function() {
                 angular.bootstrap(document, ['xkApp']);
             });
         },
         function(response) {
             if (response.status == 401) {
                 console.log('您未授权登录');
             }

             window.location.href = '/datacenter/'
         }
     );

 })();
