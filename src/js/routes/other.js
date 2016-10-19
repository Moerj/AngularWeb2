var otherRouter = angular.module('myModule');
otherRouter.config(function($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.otherwise('/baidu');
    $stateProvider
    .state('other',{
        url:'/other',
        templateUrl: 'pages/other/other.html'
    })
    .state('other.baidu',{
        url:'/baidu',
        templateUrl: 'pages/other/baidu.html'
    })
    .state('other.google',{
        url:'/google',
        templateUrl: 'pages/other/google.html'
    })
});
