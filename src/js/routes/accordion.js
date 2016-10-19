// accordion组件的路由

var accordionRouter = angular.module('myModule');
accordionRouter.config(function($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.otherwise('/baidu');
    $stateProvider
    .state('accordion',{
        url:'/accordion',
        templateUrl: 'tpls/accordion/Accordion-ngui.html'
    })
});
