/**
 * Created by djl52102 on 2017/3/2.
 */
//变量初始化
var rand   = Math.floor((Math.random()*3)+1),
    body   = $('body'),
    login  = $('#login'),
    loginAccounts=$('#login-accounts'),
    loginPassword=$('#login-password'),
    register=$('#register'),
    btnRegister=$('.btn-register'),
    registerAccounts=$('#register-accounts'),
    registerPassword=$('#register-password'),
    registerNotPassword=$('#register-not-password');
//随机背景
   // body.css('background','url('+ThinkPHP['IMG']+'/bg'+rand+'.jpg) no-repeat center center fixed')
       // .css('background-size','cover');
//浏览器更改大小
$(window).resize(function(){
    userAdd.dialog('center');
});
//登录面板
login.dialog({
    title:'登录后台',
    width:'370',
    height:'260',
    iconCls:'icon-lock',
    closed:false,
    modal:false,
    maximizable:false,
    closable:false,
    draggable:false,
    buttons:[{
        text: '登录',
        id:'login-btn',
        size:'large',
        iconCls:'icon-go',
        handler: function () {
            //if(login.form('validate'));
            $.ajax({
                url: ThinkPHP['MODULE'] + '/Login/checkUser',
                type: 'post',
                data: {
                    accounts: $.trim(loginAccounts.val()),
                    password:loginPassword.val()
                },
                beforeSend: function () {
                    $.messager.progress({
                        text: '正在尝试登录...'
                    })
                },
                success: function (data) {
                    $.messager.progress('close');
                    if (data>0) {
                        location.href=ThinkPHP['INDEX'];
                    } else if(data==0) {
                        $.messager.alert('登录失败', '帐号或密码不正确', 'warning', function () {
                            loginPassword.textbox('textbox').select();
                        })
                    }else if(data == -1){
                        $.messager.alert('登录失败', '帐号处于冻结状态', 'warning', function () {
                            loginPassword.textbox('textbox').select();
                        })
                    }
                }

            })

        },
    }],
    onOpen:function(){
        $(function(){
            $('#login-btn').parent().css('text-align','center');
        });
    }
});
//快速注册面板
register.dialog({
    title:'快速注册',
    width:'370',
    height:'260',
    iconCls:'icon-add',
    closed:true,
    modal:true,
    maximizable:true,
    buttons:[{
        text: '注册',
        id:'login-btn',
        size:'large',
        handler: function () {
            if(login.form('validate'));
            $.ajax({
                url: ThinkPHP['MODULE'] + '/User/register',
                type: 'post',
                data: {
                    accounts: $.trim(registerAccounts.val()),
                    password:registerPassword.val(),
                    notpassword:registerNotPassword.val(),
                    not:1,
                    state:'冻结'
                },
                beforeSend: function () {
                    $.messager.progress({
                        text: '正在尝试保存...'
                    })
                },
                success: function (data) {
                    $.messager.progress('close');
                    if (data>0) {
                        $.messager.show({
                            title:'操作提醒',
                            msg:'帐号添加成功'
                        });
                        register.dialog('close');
                        $.messager.alert('提醒','帐号申请成功,请等待审核!','info');
                    } else if(data == -1){
                        $.messager.alert('添加失败', '帐号已在在', 'warning', function () {
                            registerAccounts.textbox('textbox').select();
                        })
                    }else{
                        $.messager.alert('添加失败','未知错误','warning')
                    }
                }

            })

        },
    },{
        text : '取消',
        size : 'large',
        iconCls : 'icon-cross',
        handler : function ()
        {
            register.dialog('close');
        }
    }],

});
btnRegister.click(function () {
    register.dialog('open');
    register.dialog('resize');
});
//登录帐号
loginAccounts.textbox({
    width:220,
    height:32,
    required:true,
    iconCls:'icon-man',
    validType:'length[2,20]',
    missingMessage:'请输入登录帐号',
    invalidMessage:'登录帐号2-20位之间'
});
//登录密码
loginPassword.textbox({
    width:220,
    height:32,
    iconCls:'icon-lock2',
    required:true,
    validType:'length[6,30]',
    missingMessage:'请输入登录密码',
    invalidMessage:'登录密码6-30位之间'
});
//注册帐号
registerAccounts.textbox({
    width:220,
    height:32,
    required:true,
    validType:'length[2,20]',
    missingMessage:'请输入注册帐号',
    invalidMessage:'注册帐号2-20位之间'
});
//注册密码
registerPassword.textbox({
    width:220,
    height:32,
    required:true,
    validType:'length[6,30]',
    missingMessage:'请输入注册密码',
    invalidMessage:'注册密码6-30位之间'
});
//确认密码
registerNotPassword.textbox({
    width:220,
    height:32,
    required:true,
    validType:'equals["#register-password"]',
    missingMessage:'请输入确认密码',
    invalidMessage:'确认密码和密码不一致'
});
//检查一个字段是否和另一字段相同
$.extend($.fn.validatebox.defaults.rules, {
    equals: {
        validator: function(value,param){
            return value == $(param[0]).val();
        },
        message: '密码和密码确认必须一致'
    }
});
