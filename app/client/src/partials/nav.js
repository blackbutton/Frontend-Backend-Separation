xkApp.controller('NavCtrl', NavCtrl);

NavCtrl.$inject = ['$location', '$scope', 'CONFIG'];


function NavCtrl($location, $scope, CONFIG) {



    $scope.currentUserId = CONFIG.currentUserId;
    $scope.baseUrl = CONFIG.baseUrl;
    $scope.currentUserType = CONFIG.currentUserType;


    //currentUserType: 用户类型
    // 根据角色定义菜单
    // urls = [[学生菜单],[老师菜单],[班主任菜单],[管理员菜单],[管理员班主任菜单]];
    // route为路由,学生菜单要跟stuId。

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
     *  - 学生端   选课选师
     *  - 老师端   选师结果
     *  - 班主任端  选课结果
     *  - 管理元端  首页/选课管理/选师管理
     */

    $scope.urls = [
        [{//纯管理员菜单
            name: '首页',
            href: '/#/admin'
        }, {
            name: '选科管理',
            href: '/#/admin_course'
        }, {
            name: '选师管理',
            href: '/#/admin_teacher'
        }],
        [{//纯普通教职工菜单
            name: '选师结果',
            href: '/#/teacher'
        }],
        [{//学生菜单
            name: '选科选师',
            href: '/#/student'
        }],
        [{//管理员+普通教职工菜单
            name: '首页',
            href: '/#/admin'
        }, {
            name: '选科管理',
            href: '/#/admin_course'
        }, {
            name: '选师管理',
            href: '/#/admin_teacher'
        }, {
            name: '选师结果',
            href: '/#/teacher'
        }],
        [{//普通教职工菜单 + 班主任菜单
            name: '选师结果',
            href: '/#/teacher'
        }, {
            name: '选科结果',
            href: '/#/mentor'
        }],
        [{//管理员+普通教职工+班主任菜单
            name: '首页',
            href: '/#/admin'
        }, {
            name: '选科管理',
            href: '/#/admin_course'
        }, {
            name: '选师管理',
            href: '/#/admin_teacher'
        }, {
            name: '选科结果',
            href: '/#/mentor'
        }, {
            name: '选师结果',
            href: '/#/teacher'
        }],
        [{//管理员 + 角色分配管理员
            name: '首页',
            href: '/#/admin'
        }, {
            name: '选科管理',
            href: '/#/admin_course'
        }, {
            name: '选师管理',
            href: '/#/admin_teacher'
        }, {
            name: '角色分配',
            href: '/#/role'
        }],
        [{//普通教职工 + 角色分配管理员
            name: '选师结果',
            href: '/#/teacher'
        }, {
            name: '角色分配',
            href: '/#/role'
        }],
        [{//管理员 + 普通教职工 + 角色分配管理员菜单
            name: '首页',
            href: '/#/admin'
        }, {
            name: '选科管理',
            href: '/#/admin_course'
        }, {
            name: '选师管理',
            href: '/#/admin_teacher'
        }, {
            name: '选师结果',
            href: '/#/teacher'
        }, {
            name: '角色分配',
            href: '/#/role'
        }],
        [{//普通教职工 + 班主任 + 角色分配管理员
            name: '选科结果',
            href: '/#/mentor'
        }, {
            name: '选师结果',
            href: '/#/teacher'
        }, {
            name: '角色分配',
            href: '/#/role'
        }],
        [{//管理员 + 普通教职工 + 班主任 + 角色分配管理员
            name: '首页',
            href: '/#/admin'
        }, {
            name: '选科管理',
            href: '/#/admin_course'
        }, {
            name: '选师管理',
            href: '/#/admin_teacher'
        }, {
            name: '选科结果',
            href: '/#/mentor'
        }, {
            name: '选师结果',
            href: '/#/teacher'
        }, {
            name: '角色分配',
            href: '/#/role'
        }]
    ]

}
