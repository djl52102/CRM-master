
var btnEdit  =   $('#btn-edit'),
    btnLogout=   $('#btn-logout'),
    edit=$('#edit'),
    editId=$('#edit-id'),
    details=$('#details'),
    editAccounts=$('#edit-accounts'),
    editPassword=$('#edit-password'),
    editNotPassword=$('#edit-notpassword'),
    editor_tool         =        [
        'source', '|',
        'formatblock', 'fontname', 'fontsize','|',
        'forecolor', 'hilitecolor', 'bold','italic', 'underline', 'link',
        'removeformat', '|',
        'justifyleft', 'justifycenter', 'justifyright', '|',
        'insertorderedlist', 'insertunorderedlist','|',
        'emoticons', 'image','baidumap','|',
        'fullscreen'
    ];
//内容切换选项卡
$('#tabs').tabs({
    fit:true,
    border:false,
    onLoad:function(){
        //非火狐浏览器屏蔽tab-loading
        if(navigator.userAgent.indexOf('Firefox')<0){
            $('.tabs-loading').remove();
        }
    },
    onContextMenu:function(e,title,index)
    {
        e.preventDefault();
        var menu=$('#menu');
        _this=this;
        //右击弹出菜单
        menu.menu('show',{
            top: e.pageY,
            left: e.pageX
        });
        //起始页禁止关闭
        if(index==0){
            menu.menu('disableItem',$('.closecur')[0])
        }else{
            menu.menu('enableItem',$('.closecur')[0])
        }
        //三个关闭方法
        menu.menu({
            onClick:function(item){
                var tablist=$(_this).tabs('tabs');

                switch(item.text)
                {
                    case '关闭':
                        $(_this).tabs('close',index);
                        break;
                    case '关闭所有':
                        for(var i=tablist.length;i>0;i--){
                            $(_this).tabs('close',i);
                        }
                        break;
                    case '关闭其他':
                        for(var i=tablist.length;i>0;i--){
                            if(i!=index){
                                $(_this).tabs('close',i);
                            }
                        }
                        $(_this).tabs('select',1);
                        break;
                }
    }
        })

    }
    //onClose:function(title,index){
    //    if(title=='登录帐号'){
    //        $('#user-add').dialog('destroy');
    //        $('#user-edit').dialog('destroy');
    //    }else if(title=='职位部门'){
    //        $('#post-add').dialog('destroy');
    //        $('#post-edit').dialog('destroy');
    //    }
    //}
});
//左侧树型导航
$('#tree').tree({
    url:ThinkPHP['MODULE']+'/Index/getTree',
    lines:true,
    animate:true,
    onClick:function(node)
    {
        var tabs=$('#tabs');
        //判断是否有链接
        if(node.url){
            if(tabs.tabs('exists',node.text))
            {
                //直接选定
                tabs.tabs('select',node.text)
            }else{
                switch(node.text){
                    case '登录帐号':
                        $('#user-add').dialog('destroy');
                        $('#user-edit').dialog('destroy');
                        break;
                    case '职位部门':
                        $('#post-add').dialog('destroy');
                        $('#post-edit').dialog('destroy');
                        break;
                    case '员工档案':
                        $('#staff-add').dialog('destroy');
                        $('#staff-edit').dialog('destroy');
                        break;
                }
                //添加选项卡
                tabs.tabs('add',{
                    title:node.text,
                    closable:true,
                    iconCls:node.iconCls,
                    href:ThinkPHP['MODULE']+'/'+node.url
                })
            }
        }
    }
});
//登出系统
btnLogout.click(function(){
    $.messager.confirm('操作提醒','是否退出系统',function(flag){
        if(flag){
            $.messager.progress({
                text:'退出系统中...'
            });
        }
        location.href=ThinkPHP['MODULE']+'/Login/logout';
    })
});
//修改密码
btnEdit.click(function(){
    edit.dialog('open');
});
//加载完成才会执行
$(function(){
    edit.dialog({
        title:'修改面板',
        width:'400',
        height:'280',
        closed:true,
        modal:true,
        buttons:[{
            text:'保存',
            handler:function(){
                if(edit.form('validate')){
                    $.ajax({
                        url:ThinkPHP['MODULE']+'/User/editPassword',
                        type:'post',
                        data:{
                            id:editId.val(),
                            password:editPassword.val(),
                            notpassword:editNotPassword.val()
                        },
                        beforeSend:function(){
                            $.messager.progress({
                                text:'正在处理中...'
                            })
                        },
                        success:function (data) {
                            $.messager.progress('close');
                            if(data>0){
                                $.messager.show({
                                    title : '操作提示',
                                    msg : '修改密码成功'
                                });
                                edit.form('reset');
                                edit.dialog('close');
                                $.messager.alert('操作提醒', '密码修改成功，请重新登录！', 'info', function () {
                                    location.href = ThinkPHP['MODULE'] + '/Login/logout';
                                });
                            }else{
                                $.messager.alert('修改失败!','密码没有修改',
                                    'waning',function(){
                                        editAccounts.textbox('textbox').select();
                                    })
                            }
                        }

                    })
                }
            }
        },{
            text:'取消',
            handler:function(){
                edit.dialog('close')
            }
        }],
        onClose:function(){
            edit.form('reset');
            edit.dialog('center')
        }
    });
    //帐号
    editAccounts.textbox({
        width:220,
        height:32,
        required:true,
        disabled:true
    });
    //注册密码
    editPassword.textbox({
        width:220,
        height:32,
        required:true,
        validType:'length[6,30]',
        missingMessage:'请修改密码',
        invalidMessage:'密码6-30位之间'
    });
   //确认密码
    editNotPassword.textbox({
        width:220,
        height:32,
        required:true,
        validType:'equals["#edit-password"]',
        missingMessage:'请确认修改密码',
        invalidMessage:'确认密码和密码不一致'
    });
    //详情弹窗
    details.dialog({
        width:'780',
        height:'500',
        iconCls:'icon-tip',
        closed:true,
        modal:true,
        maximizable:true,
        buttons:[{
            text:'关闭',
            size:'large',
            iconCls:'icon-cross',
            handler:function(){
                details.dialog('close')
            }
        }]
    });
});

//判断针对火狐浏览器，并判断easyui 渲染完毕后再隐藏遮罩
if (navigator.userAgent.indexOf('Firefox') > 0)
//修改面板
{
    $.parser.onComplete = function ()
    {
        $('.tabs-loading').hide();
    }
}
//检查一个字段是否和另一字段相同
$.extend($.fn.validatebox.defaults.rules, {
    equals: {
        validator: function (value, param) {
            return value == $(param[0]).val();
        },
        message: '密码和密码确认必须一致'
    }
});