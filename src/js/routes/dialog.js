var dialogRouter = angular.module('myModule');
dialogRouter.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('dialog',{
        url:'/dialog',
        templateUrl: 'pages/dialog/routerPage.html'
    })
})
