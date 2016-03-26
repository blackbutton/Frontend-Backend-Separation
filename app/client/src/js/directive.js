/**
 * 给导航菜单自动添加 active 状态
 *     <ul auto-active>
 *        <li><a href="#/">main</a></li>
 *        <li><a href="#/first">first</a></li>
 *        <li><a href="#/second">second</a></li>
 *        <li><a href="#/third">third</a></li>
 *     </ul>
 */
/* @ngInject */
xkApp.directive('autoActive', function($location) {

    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element) {
            function setActive() {

                var path = $location.path();

                // 根据 url route 显示 active


                if (path) {

                    //  等导航加载完毕再匹配


                    // 截取路由
                    // /activity ===> /activity
                    // /activity/12313  ===> /activity

                    path = '/' + path.split('/')[1];

                    element.ready(function() {
                        angular.forEach(element.find('li'), function(li) {
                            var anchor = li.querySelector('a');

                            if (anchor.href.match('#' + path + '(?=\\?|$)')) {
                                angular.element(li).addClass('active');
                            } else {
                                angular.element(li).removeClass('active');
                            }
                        });
                    })
                }
            }

            setActive();

            scope.$on('$routeChangeSuccess', setActive);

        }
    }
});


/* @ngInject */
/**
 * 教师选人控件
 * 还不够健壮，勉强能用，先用着吧。
 *
 */
xkApp.directive('teacherSelect', function() {

    var directive = {
        restrict: 'AE',
        require: 'ngModel',
        link: link
    }

    return directive;

    function link(scope, ele, attrs, ngModel) {
        ele.bind('click', function() {

            // 判断传入的默认选择的教师，教师id是否为数组

            var ids = [];
            if (!Object.prototype.toString.call(ngModel.$viewValue) === '[object Array]') {
                console.log('传入值有错误！');
                return;
            } else {
                var i = 0,
                    len = ngModel.$viewValue.length;
                for (; i < len; i++) {
                    ids.push(ngModel.$viewValue[i].teacherId);
                }
                console.log(ids)
            }

            TeacherSelectUtils.openTeacherSelectDialog(null, {
                data: ids, //这里设置默认选择的教师用户id  ['xxx','yyy']
                //dataType: 'user', 默认为教师ID
                existUser: true, //只显示存在用户的教师
                modal: true, //模态框选择
                confirmCallBackFun: function(selectArr) {
                    var teacherArrays = [];
                    jQuery.each(selectArr, function(i, obj) {
                        teacherArrays.push({
                                "teacherId": obj.id,
                                "teacherName": obj.name
                            })
                            // teacherArrays.push(obj);
                            // ids += '[教师id：' + obj.id + ',职工号：' + obj.no + ',姓名：' + obj.name + ',用户id：' + obj.userId + ']\n';
                    });
                    scope.$apply(function() {
                        ngModel.$setViewValue(teacherArrays);
                    });
                }
            });

        })

    }
});
