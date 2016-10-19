var app = angular.module('myModule');
app.controller('DialogCtrl', function ($scope, $timeout, ngDialog) {
    // 开启一个弹出层
    $scope.start = function () {
        ngDialog.open({
            // template: 'myDialogTpls',//指定script模板
            template: 'tpls/dialog/dialog.html',//指定html模板
            width: 700,
            className: 'ngdialog-theme-default',//样式
            controller: 'DialogCtrl',//指定控制器
        });
    };

    // 确认按钮
    $scope.ok = function (){
        $scope.closeThisDialog()
        var okDialog = ngDialog.open({
            template: '<div class="ngdialog-message"><p>你点击了确定</p></div>',
            className: 'ngdialog-theme-default',
            plain: true
        });
        $timeout(function () {
            okDialog.close()
        }, 2000);

    }
});
