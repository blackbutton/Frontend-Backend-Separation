// 如何获得token? 登录相应服务器 /datacenter 之后打开
// http://192.168.0.216/datacenter/open/autologin.do
// token 一般七天过期
// 修改 token  修改最下面的 exports.token =  prodServerToken.admin;


var backendServerToken = {

    // 管理员：系统管理员 + 班主任+ 老师
    // 账号：wangpeng 密码 000000
    // id: c0ae544efaaf4cac997c9f97eef7b5fe
    //
    admin: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NTczMjA5NTEsImlzcyI6ImMwYWU1NDRlZmFhZjRjYWM5OTdjOWY5N2VlZjdiNWZlIn0.ufw_jLVUHzN4Gg4-mPTnaFLqrWNFDgOIpIJfVdxa61A',

    // 教师：张莉莉 （教师）
    // 账号：zhanglili 密码 000000
    // id: ff4d64a98d304fb5be8f2caa24feb66c
    // tea1: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NTM3MTIwMzEsImlzcyI6ImZmNGQ2NGE5OGQzMDRmYjViZThmMmNhYTI0ZmViNjZjIn0.4RFddNxLKXaB8BuGk5icuhKXisahw8VKzD8MvxCo_98',

    // 教师：秦飞飞 （教师）
    // 账号：qinfeifei01 密码 000000
    // id: 8231dcdbcfd248d480ed9ebf4e5f7c68
    // tea2: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NTM3MTIxMjcsImlzcyI6IjgyMzFkY2RiY2ZkMjQ4ZDQ4MGVkOWViZjRlNWY3YzY4In0.CsRJMte-C5NVzBHcCkL4plkEwnBQnBaYopmpPu6XQQ4',

    // 学生：10105
    // 账号：10105 密码 000000
    // id: 7ed5d35087614913ba9834e42cb993d9
    stu1: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NTY4MTM4NjAsImlzcyI6IjdlZDVkMzUwODc2MTQ5MTNiYTk4MzRlNDJjYjk5M2Q5In0.5lL46Tukm-vGD0-lgEOoSZy8XnTZU4Oz-p57-SYxzyo',

    // 学生：蛋堡 （张莉莉的学生）
    // 账号：xz02 密码 000000
    // id: bcb6a988204c488a8811c9acb39b4aa2
    // stu2: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NTM3MTIyMTQsImlzcyI6ImJjYjZhOTg4MjA0YzQ4OGE4ODExYzlhY2IzOWI0YWEyIn0.rgmj_z4mDixIeC2FyZOjBg6Mx5gUYh_jAHxn9NT2Uv0',


    // 学生：花粥 （秦飞飞的学生）
    // 账号：xz03 密码 000000
    // id: 2e47eb57b7fe4e3bb46606d5353e07da
    // stu3: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NTM0NTEyNTQsImlzcyI6IjJlNDdlYjU3YjdmZTRlM2JiNDY2MDZkNTM1M2UwN2RhIn0.EJFlvBROtjlVUVqBrjV7H6VYo7K-7w2tLUQI8hemDlQ'


}


// 216 token
var prodServerToken = {

    // 管理员+ 老师
    // 账号：tangliu 密码 000000
    // id:"7f4dce50da0e48b8ae93e5b647f7dc4f"
     admin: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NTY5ODIyOTUsImlzcyI6ImQwOGY2YjE0NmZiYzQwZTdiNDhiNGY4Y2ZlMmQ3ZGJiIn0.4K0u-Wbf6Wp0AqIl2cIYTRkXdKijDfNejZ53YyRopjc',


    // 教职工：曾俊
    // 账号：cengjun 密码 000000
    // id:c646e3fafb7b4c45ba28e9a46cf05dc5
    // tea1: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NTMxNjkyODYsImlzcyI6ImM2NDZlM2ZhZmI3YjRjNDViYTI4ZTlhNDZjZjA1ZGM1In0.VhQ8qEP2ylYfcdJc68kN9m9jtoP-UcBf-btFVDr5uIQ',


    // 学生：王阳(曾俊)
    // 账号：20150101/000000
    // id:378d6584af444c1da932924a8e4b8f75
    // stu1: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NTMyMDg3NzMsImlzcyI6IjM3OGQ2NTg0YWY0NDRjMWRhOTMyOTI0YThlNGI4Zjc1In0.xVp70p8D6pn2Ums-fxhQrfFEbeO46JxtxpnWbjEaCkk',

    // 学生：马华
    // 账号：20150108/000000
    // id: 383f9db349284d92a1b486b5a11b67f1
    // stu2: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NTMxODY1MDUsImlzcyI6IjM4M2Y5ZGIzNDkyODRkOTJhMWI0ODZiNWExMWI2N2YxIn0.NQtj9OiduHefolkHh-MRiwe3FhXnTy5ZKo5CNwSYRHY',

    // 学生：李良(曾俊)
    // 账号：20150106/000000
    // id:305ba712d38b4c6fa19fa0a59239dc7a
    // stu3: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NTMxODQ5NzIsImlzcyI6IjMwNWJhNzEyZDM4YjRjNmZhMTlmYTBhNTkyMzlkYzdhIn0.w5z49nxwRN-r2ja-m3l7sXB47ImZgjNrsQqeenYTVU8'

}

exports.token =  backendServerToken.admin;
