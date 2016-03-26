var xkApp = angular.module('xkApp', ['ngRoute', 'config', '720kb.tooltips', 'ngDialog', 'localytics.directives', 'angular.laydate', 'chart.js', 'angular-loading-bar', 'ngAnimate']);

/* @ngInject */

xkApp.config(function($routeProvider) {
    $routeProvider.
    when('/admin', {
        templateUrl: 'partials/admin.index.tpl.html',
        controller: 'adminIndexCtrl',
        controllerAs: 'vm'
    }).
    when('/admin_course', {
        templateUrl: 'partials/admin.courseAll.tpl.html',
        controller: 'adminCourseAllCtrl',
        controllerAs: 'vm',
    }).
    when('/admin_course/:id', {
        templateUrl: 'partials/admin.course.tpl.html',
        controller: 'adminCourseCtrl',
        controllerAs: 'vm',
    }).
    when('/admin_teacher', {
        templateUrl: 'partials/admin.teacherAll.tpl.html',
        controller: 'adminTeacherAllCtrl',
        controllerAs: 'vm',
    }).
    when('/admin_teacher/add', {
        templateUrl: 'partials/admin.addTeacher.tpl.html',
        controller: 'adminTeacherAddCtrl',
        controllerAs: 'vm',
    }).
    when('/admin_teacher/edit/:id', {
        templateUrl: 'partials/admin.editTeacher.tpl.html',
        controller: 'adminTeacherEditCtrl',
        controllerAs: 'vm',
    }).
    when('/admin_teacher/copy/:id', {
        templateUrl: 'partials/admin.copyTeacher.tpl.html',
        controller: 'adminTeacherCopyCtrl',
        controllerAs: 'vm',
    }).
    when('/admin_teacher/:id', {
        templateUrl: 'partials/admin.teacher.tpl.html',
        controller: 'adminTeacherCtrl',
        controllerAs: 'vm',
    }).
    when('/mentor', {
        templateUrl: 'partials/mentor.tpl.html',
        controller: 'mentorCourseCtrl',
        controllerAs: 'vm',
    }).
    when('/teacher', {
        templateUrl: 'partials/teacher.tpl.html',
        controller: 'teacherController',
        controllerAs: 'vm',
    }).
    when('/student', {
        templateUrl: 'partials/student.tpl.html',
        controller: 'studentCtrl',
        controllerAs: 'vm',
    }).
    when('/role', {
        templateUrl: 'partials/role.tpl.html',
        controllerAs: 'vm',
    }).
    when('/test', {
        templateUrl: 'partials/test.tpl.html',
        controller: 'testCtrl',
        controllerAs: 'vm',
    }).
    otherwise({
        redirectTo: '/'
    });
})


/* @ngInject */
// Optional configuration
xkApp.config(['ChartJsProvider', function(ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
        colours: ['#97BBCD'],
        responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
        datasetFill: false
    });
}])


// 关掉 loading 的 spinner 动画
/* @ngInject */
xkApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}])


/* @ngInject */
xkApp.config(function($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');


    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function(obj) {
        var query = '',
            name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];

})

xkApp.run(['$rootScope', '$location', 'CONFIG', '$window', function($rootScope, $location, CONFIG, $window) {

    /**
     * 监听所有路由 如果跳转到 / 再根据角色进入相应的路由
     */
    $rootScope.$on('$routeChangeStart', function(event) {
        if ($location.path() == '/') {
            /**
             * 0 无任何角色
             * 1 管理员
             * 2 普通教职工
             * 3 学生
             * 4 管理员+普通教职工
             * 5 普通教职工+班主任
             * 6 管理员+普通教职工+班主任
             *
             * 7 管理员 + 角色分配管理员
             * 8 普通教职工 + 角色分配管理员
             * 9 管理员 + 普通教职工 + 角色分配管理员
             * 10 普通教职工 + 班主任 + 角色分配管理员
             * 11 管理员 + 普通教职工 + 班主任 + 角色分配管理员
             *
             *
             *
             *
             *
             *
             *  - 学生端   选课选师
             *  - 老师端   选师结果
             *  - 班主任端  选课结果
             *  - 管理元端  首页/选课管理/选师管理
             */

            switch (CONFIG.currentUserType) {
                case 3:
                    $window.location.href = CONFIG.baseUrl + '/#/student';
                    break;
                case 2:
                    $window.location.href = CONFIG.baseUrl + '/#/teacher';
                    break;
                case 8:
                    $window.location.href = CONFIG.baseUrl + '/#/teacher';
                    break;
                case 5:
                    $window.location.href = CONFIG.baseUrl + '/#/mentor';
                    break;
                case 10:
                    $window.location.href = CONFIG.baseUrl + '/#/mentor';
                    break;
                default:
                    $window.location.href = CONFIG.baseUrl + '/#/admin';
                    break;
            }
        }


        // 没有权限强制跳转，这里只在路由变换时进行强制跳转。
        // 应该在 每个 error 后面根据 code 403 没有权限 再次进行跳转
         // - 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
         // - 403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。


        if (($location.path() == '/student') && (CONFIG.currentUserType !== 3)) {
            $window.location.href = '/datacenter/';
        }

        if (($location.path() == '/admin') || ($location.path() == '/admin_course') || ($location.path() == '/admin_teacher')) {
            if ((CONFIG.currentUserType !== 1) && (CONFIG.currentUserType !== 4) && (CONFIG.currentUserType !== 6)&& (CONFIG.currentUserType !== 7)&& (CONFIG.currentUserType !== 9)&& (CONFIG.currentUserType !== 11)) {
                $window.location.href = '/datacenter/';
            }
        }


        if ($location.path() == '/mentor') {
            if ((CONFIG.currentUserType !== 5) && (CONFIG.currentUserType !== 6)&& (CONFIG.currentUserType !== 10)&& (CONFIG.currentUserType !== 11)) {
                $window.location.href = '/datacenter/';
            }
        }


        if ($location.path() == '/teacher') {
            if ((CONFIG.currentUserType !== 2) && (CONFIG.currentUserType !== 4) && (CONFIG.currentUserType !== 5) && (CONFIG.currentUserType !== 6)&& (CONFIG.currentUserType !== 8)&& (CONFIG.currentUserType !== 9)&& (CONFIG.currentUserType !== 10)&& (CONFIG.currentUserType !== 11)) {
                $window.location.href = '/datacenter/';
            }
        }
    });
}]);
