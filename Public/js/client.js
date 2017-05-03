var client=$('#client'),
    clientAdd=$('#client-add'),
    clientAddCompany=$('#client-add-company'),
    clientAddName=$('#client-add-name'),
    clientAddTel=$('#client-add-tel'),
    clientAddSource=$('#client-add-source'),
    clientEdit=$('#client-edit'),
    clientEditId=$('#client-edit-id'),
    clientEditCompany=$('#client-edit-company'),
    clientEditName=$('#client-edit-name'),
    clientEditTel=$('#client-edit-tel'),
    clientEditSource=$('#client-edit-source'),
    clientOpt,
    clientsearchKeywords=$('#client-search-keywords'),
    clientsearchType=$('#client-search-type'),
    clientsearchDatetype=$('#client-search-date-type'),
    clientsearchDatefrom=$('#client-search-date-from'),
    clientsearchDateto=$('#client-search-date-to')

//浏览器改变时触发
$(window).resize(function(){
    clientAdd.dialog('center');
});
//表格数据列表
$('#client').datagrid({
    url:ThinkPHP['MODULE'] + '/Client/getList',
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
    toolbar:'#client-tool',
    columns:[[
        {
            field : 'id',
            title : '自动编号',
            width : 100,
            checkbox : true
        },
        {
            field : 'company',
            title : '公司名称',
            width : 60
        },
        {
            field : 'name',
            title : '联系人',
            width : 100
        },
        {
            field:'tel',
            title:'电话号码',
            width:100,
            sortable:true
        },
        {
            field:'source',
            title:'客户来源',
            width:60
        },
        {
            field:'enter',
            title:'录入员',
            width:70
        },
        {
            field : 'create_time',
            title : '创建时间',
            width : 100,
            sortable:true
        }
    ]]
});
//新增面板
clientAdd.dialog({
    title:'新增面板',
    width:'420',
    height:'300',
    iconCls:'icon-add',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            if(clientAdd.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Client/register',
                    type:'post',
                    data:{
                        company:clientAddCompany.textbox('getValue'),
                        name:clientAddName.textbox('getValue'),
                        tel:clientAddTel.textbox('getValue'),
                        source:clientAddSource.combobox('getValue')
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
                            clientAdd.dialog('close');
                            client.datagrid('load')
                        }else if(data==-1){
                            $.messager.alert('添加失败!','帐号已存在',
                                'waning',function(){
                                    clientAddName.textbox('textbox').select();
                                })
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            clientAdd.dialog('close')
        }
    }],
    onClose:function(){
        clientAdd.form('reset');
        clientAdd.dialog('center');
    }
});
//修改面板
clientEdit.dialog({
    title:'更新面板',
    width:'420',
    height:'300',
    iconCls:'icon-edit',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            if(clientEdit.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Client/update',
                    type:'post',
                    data:{
                        id:clientEditId.val(),
                        company:clientEditCompany.textbox('getValue'),
                        name:clientEditName.textbox('getValue'),
                        tel:clientEditTel.textbox('getValue'),
                        source:clientEditSource.combobox('getValue')
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
                            clientEdit.dialog('close');
                            client.datagrid('load')
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            clientEdit.dialog('close')
        }
    }],
    onClose:function(){
        clientEdit.form('reset');
        clientEdit.dialog('center');
    }


});
//工具条操作
clientOpt= {
    add: function () {
        clientAdd.dialog('open');
    },
    edit: function () {
        var rows = client.datagrid('getSelections');
        if (rows.length == 1) {
            clientEdit.dialog('open');
            $.ajax({
                url: ThinkPHP['MODULE'] + '/Client/getOne',
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
                        clientEdit.form('load', {
                            id:data.id,
                            company: data.company
                        });
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
        var rows = client.datagrid('getSelections');
        if (rows.length > 0) {
            $.messager.confirm('警告操作', '你确定要删除' + rows.length + '条数据吗', function (flag) {

                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].id);
                    }
                    $.ajax({
                        url: ThinkPHP['MODULE'] + '/Client/remove',
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
                                client.datagrid('reload');
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
        client.datagrid('unselectAll');
    },
    reload:function(){
        client.datagrid('reload');
    },
    search:function(){
        client.datagrid('load',{
            keywords: clientsearchKeywords.textbox('getValue'),
            type:clientsearchType.combobox('getValue'),
            dateType:clientsearchDatetype.combobox('getValue'),
            dateFrom: clientsearchDatefrom.datebox('getValue'),
            dateTo: clientsearchDateto.datebox('getValue')
        })
    },
    reset:function(){
        clientsearchKeywords.textbox('clear');
        clientsearchDatetype.combobox('clear').combobox('disableValidation');
        clientsearchType.combobox('clear').combobox('disableValidation');
        clientsearchDatefrom.datebox('clear');
        clientsearchDateto.datebox('clear');
        this.search();
        client.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });

    }
};
//查询字段区询
clientsearchKeywords.textbox({
    width:150,
    prompt:'产品名称/产品编号'
});
//查询时间对象
clientDate={
    width:100,
    editable:false,
    onSelect:function(){
        if(clientsearchDatetype.combobox('enableValidation').combobox('isValid')==false){
            clientsearchDatetype.combobox('showPanel');
        };
    }
};
//时间类型选择
clientsearchDatetype.combobox({
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
//类型选择
clientsearchType.combobox({
    width:100,
    editable:false,
    prompt:'渠道来源',
    data:[{
        id:'电话营销',
        text:'电话营销'
    },{
        id:'广告营销',
        text:'广告营销'
    },{
        id:'主动联系',
        text:'主动联系'
    }],
    valueField:'id',
    textField:'text',
    required:true,
    novalidate:true,
    panelHeight:'auto',
    tipPosition:'left',
    missingMessage:'请选择渠道来源'
});
//起始时间
clientDate.prompt='起始时间';
clientsearchDatefrom.datebox(clientDate);
//结束时间
clientDate.prompt='结束时间';
clientsearchDateto.datebox(clientDate);

/*表单字段区域*/
//新增公司名称
clientAddCompany.textbox({
    width:240,
    height:32,
    required:true,
    validType:'length[2,20]',
    missingMessage:'请输入公司名称',
    invalidMessage:'公司名称2-20位'
});
//新增联系人
clientAddName.textbox({
    width:240,
    height:32,
    required:true,
    validType:'length[2,20]',
    missingMessage:'请输入联系人姓名',
    invalidMessage:'名称2-20位'
});
//新增电话
clientAddTel.textbox({
    width:240,
    height:32,
    required:true,
    validType:'tel',
    missingMessage:'请输入联系电话',
    invalidMessage:'移动电话11位'
});
//新增渠道来源
clientAddSource.combobox({
    width:240,
    height:32,
    data:[{
        id:'电话销售',
        text:'电话销售'
    },{
        id:'广告媒体',
        text:'广告媒体'
    },{
        id:'主动联系',
        text:'主动联系'
    }],
    editable:false,
    valueField:'id',
    textField:'text',
    panelHeight:'auto'
});
clientEditCompany.textbox({
    width:240,
    height:32,
    disabled:true
});

clientEditName.textbox({
    width:240,
    height:32,
    required:true,
    validType:'length[2,20]',
    missingMessage:'请输入联系人姓名',
    invalidMessage:'名称2-20位'
});

clientEditTel.textbox({
    width:240,
    height:32,
    required:true,
    validType:'tel',
    missingMessage:'请输入联系电话',
    invalidMessage:'移动电话11位'
});

clientEditSource.combobox({
    width:240,
    height:32,
    data:[{
        id:'电话销售',
        text:'电话销售'
    },{
        id:'广告媒体',
        text:'广告媒体'
    },{
        id:'主动联系',
        text:'主动联系'
    }],
    editable:false,
    valueField:'id',
    textField:'text',
    panelHeight:'auto'
});
//扩展手机验证功能
$.extend($.fn.validatebox.defaults.rules, {
    tel: {
        validator: function(value){
            return /^1[0-9]{10}$/.test(value);
        },
        message: '手机格式不正确'
    }
});

