/*global angular, jQuery */

(function($, angular){
  'use strict';
  var app = angular.module('AdobeSandbox', ['vui', 'ngRoute', 'ngSanitize', 'vuiFloodlight']);
  
  /**    
  * Run of the application.  Executes when the MyApp module is bootloaded. Run will execute after config     
  * 1.) Initialize and persist division specific variables    
  */   
  
  app.run(['vuiAdobeAnalyticsService', '$http', '$location', function(vuiAdobeAnalyticsService, $http, $location) {
    $http.get('/json/adobe.json').then(function(response) {
      if(response && response.data) {
        var data = response.data;
        vuiAdobeAnalyticsService.updateData(data);
         }
      });
    }]);
  
  /**     
  * Configuration     
  * 1.) Set up routing rules     
  * 2.) Enable XSRF interceptor     
  */    
  app.config(['$routeProvider', '$locationProvider', 'vuiXsrfInterceptorProvider', '$httpProvider',
              function($routeProvider, $locationProvider, vuiXsrfInterceptorProvider, $httpProvider) {
                $httpProvider.interceptors.push('vuiXsrfInterceptor');
                $routeProvider.when('/events', { templateUrl: '/views/events.html', controller: 'EventsCtrl', viewId: 'events' }).
                when('/trackLink', { templateUrl: '/views/trackLink.html', controller: 'TrackLinkCtrl', viewId: 'trackLink' }).
                when('/scenario', { templateUrl: '/views/scenario.html', controller: 'ScenarioCtrl', viewId: 'scenario' }).
                when('/cookies', { templateUrl: '/views/cookies.html', controller: 'CookiesCtrl', viewId: 'cookies' }).
                when('/floodlight', { templateUrl: '/views/floodlight.html', controller: 'FloodlightCtrl', viewId: 'floodlight' }).
                when('/activityMap', { templateUrl: '/views/activityMap.html', controller: 'ActivityMapCtrl', viewId: 'activityMap' }).
                when('/activityMap_nextPage', { templateUrl: '/views/activityMap_nextPage.html', controller: 'ActivityMapCtrl', viewId: 'activityMap' }).
                otherwise({ redirectTo : '/events' });
              }]);
  
  /**     
  * Main Application Controller     
  * 1.) Adobe Analytics Route-change logging     
  */
  
  app.controller('SandboxCtrl', [ '$scope', '$location', 'vuiAdobeAnalyticsService',
                                 function($scope, $location, vuiAdobeAnalyticsService){
                                   $scope.steps = [
                                     { title: 'Events', state: 'active', view: 'events'},
                                     { title: 'Track Link', state: '', view: 'trackLink'},
                                     { title: 'Scenario', state: '', view: 'scenario'},
                                     { title: 'Cookies', state: '', view: 'cookies'},
                                     { title: 'Floodlight', state: '', view: 'floodlight'},
                                     { title: 'Activity Map', state: '', view: 'activityMap'}
                                   ];            
                                   $scope.goToView = function(view) {
                                     $location.path(view);
                                   };
                                   $scope.$on('$routeChangeSuccess', function (event, currentRoute) {
                                     var steps = $scope.steps,
                                         index = steps.length,
                                         state = 'disabled',
                                         viewId, step;
                                     if(currentRoute) {
                                       viewId = currentRoute.viewId;
                                       while(index--) {
                                         step = steps[index];
                                         step.state = state;
                                         if(step.view === currentRoute.viewId) {
                                           step.state = 'active';
                                           state = 'complete';
                                           if((index + 1) <= (steps.length -1)) {
                                             steps[index + 1].state = '';
                                           }                        
                                         }                    
                                       }                    
                                      vuiAdobeAnalyticsService.updateData({subViewId: currentRoute.viewId});
                                      vuiAdobeAnalyticsService.track();
               }            
        });        
    }]);
}(jQuery, angular));
