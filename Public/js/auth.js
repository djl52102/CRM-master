/**
 * Created by djl52102 on 2017/4/16.
 */
var auth=$('#auth'),
    authAdd=$('#auth-add'),
    authAddTitle=$('#auth-add-title'),
    authAddRules=$('#auth-add-rules'),
    authEdit=$('#auth-edit'),
    authEditId=$('#auth-edit-id'),
    authEditTitle=$('#auth-edit-title'),
    authEditRules=$('#auth-edit-rules'),
    authOpt,
    authsearchKeywords=$('#auth-search-keywords'),
    authsearchDatetype=$('#auth-search-date-type'),
    authsearchDatefrom=$('#auth-search-date-from'),
    authsearchDateto=$('#auth-search-date-to')
//浏览器改变时触发
$(window).resize(function(){
    authAdd.dialog('center');
});
//表格数据列表
$('#auth').datagrid({
    url:ThinkPHP['MODULE'] + '/Auth/getList',
    fit:true,
    fitColumns:true,
    rowNumbers:true,
    nowrap : false,
    border:false,
    sortName:'create_time',
    sortOrder:'Desc',
    pagination:true,
    pageSize:20,
    pageList:[10,20,30,40,50],
    pageNumber:1,
    toolbar:'#auth-tool',
    columns:[[
        {
            field : 'id',
            title : '自动编号',
            width : 40,
            checkbox : true
        },
        {
            field : 'title',
            title : '角色名称',
            width : 40
        },
        {
            field : 'status',
            title : '权限状态',
            width : 40,
            formatter:function(value){
                return value==1?'正常':'锁定';
            }
        },
        {
            field:'rules',
            title:'所属权限',
            width:100
        },
        {
            field:'create_time',
            title:'创建时间',
            width:80,
            sortable:true
        }
    ]]
});
//新增面板
authAdd.dialog({
    title:'新增面板',
    width:'780',
    height:'506',
    iconCls:'icon-add',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            if(authAdd.form('validate')){
                //var text =$("input:checkbox[name='ids']:checked").map(function(index,elem) {
                //    return $(elem).val();
                //}).get().join(',');
                var text='';
                var rule=authAddRules.tree('getChecked');
                for(var i=0;i<rule.length;i++) {
                    if (rule[i]['nid'] != 0) {
                        text += rule[i]['id'] + ',';
                    }
                }
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Auth/register',
                    type:'post',
                    data:{
                        title:authAddTitle.textbox('getValue'),
                        rule:text.substring(0,text.length-1)
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
                            authAdd.dialog('close');
                            auth.datagrid('load')
                        }else if(data==-1){
                            $.messager.alert('添加失败!','帐号已存在',
                                'waning',function(){
                                    authAddTitle.textbox('textbox').select();
                                })
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            authAdd.dialog('close')
        }
    }],
    onClose:function(){
        authAdd.form('reset');
        authAdd.dialog('center');
    }
});
//修改面板
authEdit.dialog({
    title:'更新面板',
    width:'420',
    height:'300',
    iconCls:'icon-edit',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            if(authEdit.form('validate')){
                var text='';
                var rule=authEditRules.tree('getChecked');
                for(var i=0;i<rule.length;i++) {
                    if (rule[i]['nid'] != 0) {
                        text += rule[i]['id'] + ',';
                    }
                }
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Auth/update',
                    type:'post',
                    data:{
                        id:authEditId.val(),
                        rules:text
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
                            authEdit.dialog('close');
                            auth.datagrid('load')
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            authEdit.dialog('close')
        }
    }],
    onClose:function(){
        authEdit.form('reset');
        authEdit.dialog('center');
    }


});
//工具条操作
authOpt= {
    add: function () {
        authAdd.dialog('open');
    },
    edit: function () {
        var rows = auth.datagrid('getSelections');
        if (rows.length == 1) {
            authEdit.dialog('open');
            $.ajax({
                url: ThinkPHP['MODULE'] + '/Auth/getOne',
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
                        authEdit.form('load', {
                            id:data.id,
                            title:data.title
                        });
                        //获取选定权限
                        authEditRules.tree({
                            url:ThinkPHP['MODULE']+'/Auth/getAuthGroup',
                            queryParams:{
                                rules:data.rules
                            },
                            lines:true,
                            animate:true,
                            checkbox:true
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
        var rows = auth.datagrid('getSelections');
        if (rows.length > 0) {
            $.messager.confirm('警告操作', '你确定要删除' + rows.length + '条数据吗', function (flag) {

                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].id);
                    }
                    $.ajax({
                        url: ThinkPHP['MODULE'] + '/Auth/remove',
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
                                auth.datagrid('reload');
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
        auth.datagrid('unselectAll');
    },
    reload:function(){
        auth.datagrid('reload');
    },
    search:function(){
        auth.datagrid('load',{
            keywords: authsearchKeywords.textbox('getValue'),
            dateType:authsearchDatetype.combobox('getValue'),
            dateFrom: authsearchDatefrom.datebox('getValue'),
            dateTo: authsearchDateto.datebox('getValue')
        })
    },
    reset:function(){
        authsearchKeywords.textbox('clear');
        authsearchDatetype.combobox('clear').combobox('disableValidation');
        authsearchDatefrom.datebox('clear');
        authsearchDateto.datebox('clear');
        this.search();
        auth.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });

    }
};
//查询字段区询
authsearchKeywords.textbox({
    width:150,
    prompt:'权限标题'
});
//查询时间对象
authDate={
    width:100,
    editable:false,
    onSelect:function(){
        if(authsearchDatetype.combobox('enableValidation').combobox('isValid')==false){
            authsearchDatetype.combobox('showPanel');
        };
    }
};
//时间类型选择
authsearchDatetype.combobox({
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
authDate.prompt='起始时间';
authsearchDatefrom.datebox(authDate);
//结束时间
authDate.prompt='结束时间';
authsearchDateto.datebox(authDate);

/*表单字段区域*/
//新增标题
authAddTitle.textbox({
    width:240,
    height:32,
    required:true,
    validType:'length[2,20]',
    missingMessage:'请输入角色名称',
    invalidMessage:'请输入2-20位字符'
});
//下拉列表框
authAddRules.tree({
    url:ThinkPHP['MODULE']+'/Auth/getAuthGroup',
    lines:true,
    animate:true,
    checkbox:true
});
//修改标题
authEditTitle.textbox({
    width:240,
    height:32,
    editable:false
});

