var dialogRouter = angular.module('myModule');
dialogRouter.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('m1',{
        url:'/m1',
        templateUrl: 'pages/m1/m1.html'
    })
})