var user=$('#user'),
    userAdd=$('#user-add'),
    userAddAccounts=$('#user-add-accounts'),
    userAddPassword=$('#user-add-password'),
    userEdit=$('#user-edit'),
    userEditId=$('#user-edit-id'),
    userEditPassword=$('#user-edit-password'),
    userEditState=$('#user-edit-state'),
    userEditStateButton=$('#user-edit-state-button'),
    userTool=$('#user-tool'),
    userAddStaffName=$('#user-add-staff-name'),
    userEditStaffName=$('#user-edit-staff-name'),
    userOpt,
    userDate,
    userAccounts='',
    usersearchKeywords=$('#user-search-keywords'),
    usersearchState=$('#user-search-state'),
    usersearchDatetype=$('#user-search-date-type'),
    usersearchDatefrom=$('#user-search-date-from'),
    usersearchDateto=$('#user-search-date-to'),
    randAdd=$('.rand-add'),
    randEdit=$('.rand-edit')

//浏览器改变时触发
$(window).resize(function(){
    userAdd.dialog('center');
});
//表格数据列表
$('#user').datagrid({
    url:ThinkPHP['MODULE'] + '/User/getList',
    fit:true,
    fitColumns:true,
    rowNumbers:true,
    border:false,
    sortName:'create_time',
    sortOrder:'Desc',
    pagination:true,
    pageSize:20,
    pageList:[10,20,30,40,50],
    pageNumber:1,
    toolbar:'#user-tool',
    columns:[[
        {
            field : 'id',
            title : '自动编号',
            width : 100,
            checkbox : true
        },
        {
            field : 'accounts',
            title : '登录账号',
            width : 100
        },
        {
            field : 'name',
            title : '关联档案',
            width : 100
        },
        {
            field:'last_login_time',
            title:'最后登录时间',
            width:100,
            sortable:true
        },
        {
            field:'last_login_ip',
            title:'最后登录ip',
            width:100
        },
        {
            field:'login_count',
            title:'登录次数',
            width:100,
            sortable:true
        },
        {
            field : 'create_time',
            title : '创建时间',
            width : 100,
            sortable:true
        },
        {
            field:'state',
            title:'状态',
            fixed:true,
            width:60,
            sortable:true,
            formatter:function(value,row){
               var state='';
                switch(value){
                    case '正常':
                                state='<a href="javascript:void(0)" user-id="'+row.id+'" user-state="正常" class="user-state user-state-1" style="height:18px;margin-left:11px"></a>';
                                break;

                    case '冻结':
                                state='<a href="javascript:void(0)" user-id="'+row.id+'" user-state="冻结" class="user-state user-state-2" style="height:18px;margin-left:11px"></a>';
                                break;
                }


                return state;
            }
        }
    ]],
    onLoadSuccess:function(){
        $('.user-state-1').linkbutton({
            iconCls:'icon-ok',
            plain:true
        });
        $('.user-state-2').linkbutton({
            iconCls:'icon-lock',
            plain:true
        });
        $('.user-state').click(function(){
            var   id= $(this).attr('user-id'),
                state= $(this).attr('user-state');
            switch(state){
                case '正常':
                    $.messager.confirm('确认','冻结帐号', function (flag){
                        if(flag){
                            $.ajax({
                                url: ThinkPHP['MODULE'] + '/User/state',
                                type: 'post',
                                data: {
                                    id:id,
                                    state:'冻结'
                                },
                                beforeSend: function () {
                                    $.messager.progress({
                                        text: '正在处理中...'
                                    })
                                },
                                success: function (data) {
                                    if(data>0){
                                        $.messager.progress('close');
                                        user.datagrid('reload');
                                        $.messager.show({
                                            title:'操作提醒',
                                            msg:'帐号冻结成功'
                                        });
                                    } else{
                                        $.messager.alert('冻结失败', '未知原因导致冻结失败', 'warning')
                                    }
                                }

                            })
                        }
                    });
                    break;
                case '冻结':
                    $.messager.confirm('确认','解冻帐号', function (flag){
                        if(flag){
                            $.ajax({
                                url: ThinkPHP['MODULE'] + '/User/state',
                                type: 'post',
                                data: {
                                    id:id,
                                    state:'正常'
                                },
                                beforeSend: function () {
                                    $.messager.progress({
                                        text: '正在处理中...'
                                    })
                                },
                                success: function (data) {
                                    if(data>0) {
                                        $.messager.progress('close');
                                        user.datagrid('reload');
                                        $.messager.show({
                                            title: '操作提醒',
                                            msg: '帐号审核通过'
                                        });
                                    }else{
                                        $.messager.alert('审核通过', '未知原因导致未审核成功', 'warning')
                                    }
                                }

                            })
                        }
                    });
                    break;
            }
        });
    }
});
//新增面板
userAdd.dialog({
    title:'新增面板',
    width:'400',
    height:'190',
    iconCls:'icon-add',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            if(userAdd.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/User/register',
                    type:'post',
                    data:{
                        accounts: $.trim(userAddAccounts.val()),
                        password: $.trim(userAddPassword.val()),
                        staff_id:userAddStaffName.combogrid('getValue'),
                        staff_name:userAddStaffName.combogrid('getText')
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
                                title:'操作提示',
                                msg:'添加成功'
                            });
                            userAdd.dialog('close');
                            user.datagrid('load')
                        }else if(data==-1){
                            $.messager.alert('添加失败!','帐号已存在',
                                'waning',function(){
                                    userAddAccounts.textbox('textbox').select();
                                })
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            userAdd.dialog('close')
        }
    }],
    onClose:function(){
        userAdd.form('reset');
        userAdd.dialog('center')
    }


});
//修改面板
userEdit.dialog({
    title:'修改面板',
    width:'400',
    height:'190',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            if(userEdit.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/User/update',
                    type:'post',
                    data:{
                        id:userEditId.val(),
                        password: $.trim(userEditPassword.val()),
                        state:userEditState.val(),
                        staff_id:userEditStaffName.combogrid('getValue'),
                        staff_name:userEditStaffName.combogrid('getText')
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
                                title:'操作提示',
                                msg:'修改成功'
                            });
                            userEdit.dialog('close');
                            user.datagrid('reload')
                        }else{
                            $.messager.alert('修改失败!','没有任何数据被修改',
                                'waning',function(){
                                    userEditPassword.textbox('textbox').select();
                                })
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            userEdit.dialog('close')
        }
    }],
    onClose:function(){
        userEdit.form('reset');
        userEdit.dialog('center')
    }


});
//工具条操作
userOpt= {
    add: function () {
        userAdd.dialog('open');
        userAddStaffName.combogrid({
            width:120,
            height:32,
            url:ThinkPHP['MODULE']+'/Staff/getNotRelationList',
            panelWidth:450,
            panelHeight:'auto',
            panelMaxHeight:227,
            fitColumns:true,
            striped:true,
            rownumbers:true,
            border:false,
            idField:'id',
            textField:'name',
            editable:false,
            sortName:'create_time',
            sortOrder:'DESC',
            pagination:true,
            pageSize:10,
            pageList:[10,20,30,40,50],
            pageNumber:1,
            columns:[[
                {
                    field : 'id',
                    title : '自动编号',
                    width : 50,
                    checkbox : true
                },
                {
                    field : 'number',
                    title : '工号',
                    width : 50
                },
                {
                    field:'name',
                    title:'员工姓名',
                    width:50
                },
                {
                    field:'gender',
                    title:'性别',
                    width:50
                },
                {
                    field : 'id_card',
                    title : '身份证号',
                    width : 50
                },{
                    field : 'post',
                    title : '职位',
                    width : 50
                },{
                    field : 'create_time',
                    title : '创立日期',
                    width : 100,
                    sortable:true
                }]],
                onOpen:function(){
                    userAddStaffName.combogrid('grid').datagrid('reload');
                },
                onShowPanel:function(){
                    userAddStaffName.combogrid('panel').panel('resize',{
                        width:'450px'
                    })
                }
        });
    },
    edit: function () {
        var rows = user.datagrid('getSelections');
        if (rows.length == 1) {
            userEdit.dialog('open');
            userEditStaffName.combogrid({
                width:120,
                height:32,
                url:ThinkPHP['MODULE']+'/Staff/getList',
                panelWidth:450,
                panelHeight:'auto',
                panelMaxHeight:227,
                fitColumns:true,
                striped:true,
                rownumbers:true,
                border:false,
                idField:'id',
                textField:'name',
                editable:false,
                sortName:'create_time',
                sortOrder:'DESC',
                pagination:true,
                pageSize:10,
                pageList:[10,20,30,40,50],
                pageNumber:1,
                columns:[[
                    {
                        field : 'id',
                        title : '自动编号',
                        width : 50,
                        checkbox : true
                    },
                    {
                        field : 'number',
                        title : '工号',
                        width : 50
                    },
                    {
                        field:'name',
                        title:'员工姓名',
                        width:50
                    },
                    {
                        field:'gender',
                        title:'性别',
                        width:50
                    },
                    {
                        field : 'id_card',
                        title : '身份证号',
                        width : 50
                    },{
                        field : 'post',
                        title : '职位',
                        width : 50
                    },{
                        field : 'create_time',
                        title : '创立日期',
                        width : 100,
                        sortable:true
                    }]],
                onOpen:function(){
                    userEditStaffName.combogrid('grid').datagrid('reload');
                },
                onShowPanel:function(){
                    userEditStaffName.combogrid('panel').panel('resize',{
                        width:'450px'
                    })
                }
            });
            $.ajax({
                url: ThinkPHP['MODULE'] + '/User/getOne',
                type: 'post',
                data: {
                    id: rows[0].id
                },
                beforeSend: function () {
                    $.messager.progress({
                        text: '正在处理中...'
                    })
                },
                success: function (data) {
                    $.messager.progress('close');
                    if (data) {
                        //console.log(data);
                        userEdit.form('load', {
                            id: data.id,
                            password:data.password,
                            state:data.state
                        });
                        if(data.state=='正常'){
                            userEditStateButton.switchbutton('check');
                            userEditState.val('正常');
                        }else{
                            userEditStateButton.switchbutton('uncheck');
                            userEditState.val('冻结');
                        }
                    } else {
                        $.messager.alert('警告操作', '没有获取到相应数据', 'warning')
                    }
                }

            })
        } else {
            $.messager.alert('警告操作', '编辑数据必须只能选中一条记录!', 'warning');
        }
    },
    remove: function () {
        var rows = user.datagrid('getSelections');
        if (rows.length > 0) {
            $.messager.confirm('警告操作', '你确定要删除' + rows.length + '条数据吗', function (flag) {

                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].id);
                    }
                    $.ajax({
                        url: ThinkPHP['MODULE'] + '/User/remove',
                        type: 'post',
                        data: {
                            ids: ids.join(',')
                        },
                        beforeSend: function () {
                            $.messager.progress({
                                text: '正在处理中...'
                            })
                        },
                        success: function(data){
                            $.messager.progress('close');

                            if(data>0){
                                user.datagrid('reload');
                                $.messager.show({
                                    title:'操作提示',
                                    msg:'删除了'+rows.length+'条信息'
                                });
                            }

                        }
                    });
                } else {
                    $.messager.alert('警告操作', '删除数据必须选中一条或以上数据', 'warning');
                }
            })
        }
    },
    redo:function(){
        user.datagrid('unselectAll');
    },
    reload:function(){
        user.datagrid('reload');
    },
    search:function(){
        if(userTool.form('validate')){
            user.datagrid('load',{
                keywords: usersearchKeywords.textbox('getValue'),
                dateType:usersearchDatetype.combobox('getValue'),
                dateFrom: usersearchDatefrom.datebox('getValue'),
                dateTo: usersearchDateto.datebox('getValue'),
                state:usersearchState.combobox('getValue')
            })
        }
    },
    reset:function(){
        usersearchKeywords.textbox('clear');
        usersearchDatetype.combobox('clear').combobox('disableValidation');
        usersearchState.combobox('clear');
        usersearchDatefrom.datebox('clear');
        usersearchDateto.datebox('clear');
        this.search();
        user.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });

    }
};
//查询字段区询
usersearchKeywords.textbox({
    width:150,
    prompt:'帐号'
});
//查询时间对象
userDate={
    width:100,
    editable:false,
    onSelect:function(){
        if(usersearchDatetype.combobox('enableValidation').combobox('isValid')==false){
            usersearchDatetype.combobox('showPanel');
        };
    }
};
//审核组件
usersearchState.combobox({
    width:70,
    editable:false,
    prompt:'状态',
    data:[{
        id:'正常',
        text:'正常'
    },{
        id:'冻结',
        text:'冻结'
    }],
    valueField:'id',
    textField:'text',
    panelHeight:'auto'
});
//时间类型选择
usersearchDatetype.combobox({
    width:100,
    editable:false,
    prompt:'选择时间',
    data:[{
        id:'create_time',
        text:'创建时间'
    }],
    valueField:'id',
    textField:'text',
    required:true,
    novalidate:true,
    panelHeight:'auto',
    tipPosition:'left',
    missingMessage:'请选择时间类型'
});
//起始时间
userDate.prompt='起始时间';
usersearchDatefrom.datebox(userDate);
//结束时间
userDate.prompt='结束时间';
usersearchDateto.datebox(userDate);

//帐号名称
userAccounts={
    width:220,
    height:32,
    required:true,
    validType:'length[2,20]',
    missingMessage:'请输入帐号名称',
    invalidMessage:'帐号应在2-20位之间'
}
//新增帐号
userAddAccounts.textbox(userAccounts);
//新增密码
userAddPassword.textbox({
    width:220,
    height:32,
    required:true,
    validType:'length[6,30]',
    missingMessage:'请修改帐号密码',
    invalidMessage:'帐号密码6-30位之间'
});
//修改帐号
userEditPassword.textbox(
    {
        width:220,
        height:32,
        validType:'length[6,30]',
        missingMessage:'请修改帐号密码',
        invalidMessage:'帐号密码6-30位之间'
    }
);
//新增随机密码
randAdd.click(function(){
    userAddPassword.textbox('setValue',getRandPassword(8,16));
});
//修改随机密码
randEdit.click(function(){
    userEditPassword.textbox('setValue',getRandPassword(8,16));
});
//创建一个随机密码生成器
var getRandPassword=function(min,max){
    {
        var source='abcdefghijklmnopquvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ23456789',
            length=Math.ceil(Math.random()*(max-min)+min),
            password=''

        for(var i=0;i<length;i++){
            password+=source.charAt(Math.ceil(Math.random()*1000%source.length));
        }
        return password;
    }
};
//修改状态滑动按钮
userEditStateButton.switchbutton({
    width:65,
    onText:'正常',
    offText:'冻结',
    onChange:function(checked){
        if(checked){
            userEditState.val('正常')
        }else{
            userEditState.val('冻结')
        }
    }

});