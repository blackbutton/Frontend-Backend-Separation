angular
    .module('xkApp')
    .factory('TokenInterceptor', TokenInterceptor);

/* @ngInject */
function TokenInterceptor($q, $window, $location, CONFIG) {
    return {


        request: function(config) {


            config.headers = config.headers || {};


            config.headers.Authorization = 'Bearer ' + CONFIG.token;


            config.headers['x-api-version'] = CONFIG.apiVersion;

            // http://stackoverflow.com/questions/16098430/angular-ie-caching-issue-for-http
            // 给每个 api 的 get 请求 除了 模板页  添加时间戳
            if (config.method == 'GET') {
                var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                if (config.url.indexOf('api') != -1)
                    config.url = config.url + separator + 'noCache=' + new Date().getTime();
            }
            return config;

        }
    }
}

/* @ngInject */
xkApp.factory('ChoosedOnService', ['$http', 'CONFIG', function($http, CONFIG) {
    return {
        show: function() {
            return $http.get(CONFIG.apiBaseUrl + '/choosedOn');
        }
    }
}]);

/* @ngInject */
xkApp.factory('CourseService', ['$http', 'CONFIG', function($http, CONFIG) {
    return {
        delete: function(id) {
            return $http.delete(CONFIG.apiBaseUrl + '/course/' + id);
        },
        copy: function(id) {
            return $http.get(CONFIG.apiBaseUrl + '/copyCourse', {
                params: {
                    id: id
                }
            });
        },
        create: function(id, periodId, campuses, begin, end, courseItem, time) {
            return $http.post(CONFIG.apiBaseUrl + '/course', {
                id: id,
                periodId: periodId,
                campuses: campuses,
                begin: begin,
                end: end,
                courseItem: courseItem,
            });
        },
        edit: function(id) {
            return $http.get(CONFIG.apiBaseUrl + '/editCourse?id=' + id);
        },
        courseStatusUpdate: function(id, stuId, courseId, courseSelected) {
            return $http.get(CONFIG.apiBaseUrl + '/courseStatusUpdate', {
                params: {
                    id: id,
                    stuId: stuId,
                    courseId: courseId,
                    couseSelected: courseSelected
                }
            });
        },
        getAll: function() {
            return $http.get(CONFIG.apiBaseUrl + '/showCourse');
        },
        courseCombineResult: function(id) {
            return $http.get(CONFIG.apiBaseUrl + '/courseCombineResult', {
                params: {
                    id: id
                }
            });
        },
        courseStuList: function(id, courseId,page) {
            return $http.get(CONFIG.apiBaseUrl + '/courseStuList', {
                params: {
                    id: id,
                    courseId: courseId,
                    page:page
                }
            });
        },
        courseDetails: function(id) {
            return $http.get(CONFIG.apiBaseUrl + '/courseDetails', {
                params: {
                    id: id
                }
            });
        },
        courseStuDetails: function(id, showCourses, page, stuName) {
            return $http.get(CONFIG.apiBaseUrl + '/courseStuDetails', {
                params: {
                    id: id,
                    showCourses: showCourses,
                    page: page,
                    stuName: stuName
                }
            });
        },
        courseCombineStuList: function(id, combineCourseId, page) {
            return $http.get(CONFIG.apiBaseUrl + '/courseCombineStuList', {
                params: {
                    id: id,
                    combineCourseId: combineCourseId,
                    page: page
                }
            });
        },
        courseStuStatus: function(id, stuId) {
            return $http.get(CONFIG.apiBaseUrl + '/courseStuStatus', {
                params: {
                    id: id,
                    stuId: stuId
                }
            });
        },
        courseStuResult: function(id) {
            return $http.get(CONFIG.apiBaseUrl + '/courseStuResult', {
                params: {
                    id: id
                }
            });
        }
    }
}]);



/* @ngInject */
xkApp.factory('OptionsService', ['$http', 'CONFIG', function($http, CONFIG) {
    return {
        period: function() {
            return $http.get(CONFIG.apiBaseUrl + '/period');
        },
        campus: function(periodId, activityId, optionType) {
            return $http.get(CONFIG.apiBaseUrl + '/campus', {
                params: {
                    periodId: periodId,
                    activityId: activityId,
                    optionType: optionType
                }
            });
        },
        courseList: function(periodId, activityId, campuses, optionType) {
            return $http.get(CONFIG.apiBaseUrl + '/courseList', {
                params: {
                    periodId: periodId,
                    activityId: activityId,
                    campuses: campuses,
                    optionType: optionType
                }
            });
        }
    }
}]);

/* @ngInject */
xkApp.factory('TeacherService', ['$http', 'CONFIG', function($http, CONFIG) {
    return {
        getAll: function() {
            return $http.get(CONFIG.apiBaseUrl + '/showTeacher');
        },
        delete: function(id) {
            return $http.delete(CONFIG.apiBaseUrl + '/teacher/' + id);
        },
        copy: function(id) {
            return $http.get(CONFIG.apiBaseUrl + '/copyTeacher', {
                params: {
                    id: id
                }
            });
        },
        teacherDetails: function(id) {
            return $http.get(CONFIG.apiBaseUrl + '/teacherDetails', {
                params: {
                    id: id
                }
            });
        },
        teacherStuDetails: function(id, page) {
            return $http.get(CONFIG.apiBaseUrl + '/teacherStuDetails', {
                params: {
                    id: id,
                    page: page
                }
            });
        },
        getTeacherStuList: function(id, teacherId, page) {
            return $http.get(CONFIG.apiBaseUrl + '/teacherStuList', {
                params: {
                    id: id,
                    teacherId: teacherId,
                    page: page
                }
            });
        },




        create: function(id, periodId, periodName, campuses, begin, end, courseItem, time, courseItemObj) {


            var obj = {
                id: id,
                periodId: periodId,
                periodName: periodName,
                campuses: campuses,
                begin: begin,
                end: end,
                courseItem: courseItem,
                time: time
            };


            for(key in courseItemObj) {
                obj[key] = courseItemObj[key];
            }



            return $http.post(CONFIG.apiBaseUrl + '/teacher', obj);
        },

        edit: function(id) {
            return $http.get(CONFIG.apiBaseUrl + '/editTeacher?id=' + id);
        },
    }
}]);


/* @ngInject */
xkApp.factory('mentorService', ['$http', 'CONFIG', function($http, CONFIG) {
    return {
        mentor: function(showCourses, page, stuName) {
            return $http.get(CONFIG.apiBaseUrl + '/mentor', {
                params: {
                    showCourses: showCourses,
                    page: page,
                    stuName: stuName
                }
            });
        },
        teachersys: function() {
            return $http.get(CONFIG.apiBaseUrl + '/teachersys');
        }
    }
}]);


/* @ngInject */
xkApp.factory('teacherService', ['$http', 'CONFIG', function($http, CONFIG) {
    return {
        teachersys: function() {
            return $http.get(CONFIG.apiBaseUrl + '/teachersys');
        }
    }
}]);

/* @ngInject */
xkApp.factory('studentService', ['$http', 'CONFIG', function($http, CONFIG) {
    return {
        getChooseList: function() {
            return $http.get(CONFIG.apiBaseUrl + '/stuChooseList');
        },
        chooseCourse: function(id, courseId, courseSelected) {
            return $http.post(CONFIG.apiBaseUrl + '/stuCourseChoose', {
                    id: id,
                    courseId: courseId,
                    courseSelected: courseSelected
            });
        },
        chooseTeacher: function(id, groupId, teacherId) {
            return $http.post(CONFIG.apiBaseUrl + '/stuTeacherChoose', {
                    id: id,
                    groupId: groupId,
                    teacherId: teacherId
            });
        }

    }
}]);
