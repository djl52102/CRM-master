var post=$('#post'),
    postAdd=$('#post-add'),
    postAddName=$('#post-add-name'),
    postEdit=$('#post-edit'),
    postEditId=$('#post-edit-id'),
    postEditName=$('#post-edit-name'),
    postTool=$('#post-tool'),
    postOpt,
    postDate,
    postName='',
    postsearchKeywords=$('#post-search-keywords'),
    postsearchDatetype=$('#post-search-date-type'),
    postsearchDatefrom=$('#post-search-date-from'),
    postsearchDateto=$('#post-search-date-to')

//浏览器改变时触发
$(window).resize(function(){
    postAdd.dialog('center');
});
//表格数据列表
$('#post').datagrid({
    url:ThinkPHP['MODULE'] + '/Post/getList',
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
    toolbar:'#post-tool',
    columns:[[
        {
            field : 'id',
            title : '自动编号',
            width : 100,
            checkbox : true
        },
        {
            field : 'name',
            title : '职位名称',
            width : 100
        },
        {
            field : 'create_time',
            title : '创建时间',
            width : 100,
            sortable:true
        }
    ]],
});
//新增面板
postAdd.dialog({
    title:'新增面板',
    width:'400',
    height:'190',
    iconCls:'icon-add',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            if(postAdd.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Post/register',
                    type:'post',
                    data:{
                        name: $.trim(postAddName.val())
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
                            postAdd.dialog('close');
                            post.datagrid('load')
                        }else if(data == -1){
                            $.messager.alert('添加失败!','职位名称已存在',
                                'waning',function(){
                                    postAddName.textbox('textbox').select();
                                })
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            postAdd.dialog('close')
        }
    }],
    onClose:function(){
        postAdd.form('reset');
        postAdd.dialog('center')
    }


});
//修改面板
postEdit.dialog({
    title:'修改面板',
    width:'400',
    height:'190',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            if(postEdit.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Post/update',
                    type:'post',
                    data:{
                        id:postEditId.val(),
                        name: $.trim(postEditName.val())
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
                            postEdit.dialog('close');
                            post.datagrid('reload')
                        }else if(data == 0){
                            $.messager.alert('修改失败!','职位没有修改',
                                'waning',function(){
                                    postEditName.textbox('textbox').select();
                                })
                        }
                        else if(data == -1){
                            $.messager.alert('修改失败!','职位名称已存在',
                                'waning',function(){
                                    postEditName.textbox('textbox').select();
                                })
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            postEdit.dialog('close')
        }
    }],
    onClose:function(){
        postEdit.form('reset');
        postEdit.dialog('center')
    }


});

//工具条操作
postOpt= {
    add: function () {
        postAdd.dialog('open')
    },
    edit: function () {
        var rows = post.datagrid('getSelections');
        if (rows.length == 1) {
            postEdit.dialog('open');
            $.ajax({
                url: ThinkPHP['MODULE'] + '/Post/getOne',
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
                        postEdit.form('load', {
                            id: data.id,
                            name: data.name
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
        var rows = post.datagrid('getSelections');
        if (rows.length > 0) {
            $.messager.confirm('警告操作', '你确定要删除' + rows.length + '条数据吗', function (flag) {

                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].id);
                    }
                    $.ajax({
                url: ThinkPHP['MODULE'] + '/Post/remove',
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
                        post.datagrid('reload');
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
        post.datagrid('unselectAll');
    },
    reload:function(){
        post.datagrid('reload');
    },
    search:function(){
        if(postTool.form('validate')){
            post.datagrid('load',{
               keywords: postsearchKeywords.textbox('getValue'),
               dateType:postsearchDatetype.combobox('getValue'),
               dateFrom: postsearchDatefrom.datebox('getValue'),
               dateTo: postsearchDateto.datebox('getValue')
            })
        }
    },
    reset:function(){
        postsearchKeywords.textbox('clear');
        postsearchDatetype.combobox('clear').combobox('disableValidation');
        postsearchDatefrom.datebox('clear');
        postsearchDateto.datebox('clear');
        this.search();
        post.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });

    }
};

//查询字段区询
postsearchKeywords.textbox({
    width:150,
    prompt:'职位'
});
//查询时间对象
postDate={
    width:100,
    editable:false,
    onSelect:function(){
        if(postsearchDatetype.combobox('enableValidation').combobox('isValid')==false){
            postsearchDatetype.combobox('showPanel');
        };
    }
};
//时间类型选择
postsearchDatetype.combobox({
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
postDate.prompt='起始时间';
postsearchDatefrom.datebox(postDate);
//结束时间
postDate.prompt='结束时间';
postsearchDateto.datebox(postDate);

//职位名称
postName={
    width:220,
    height:32,
    required:true,
    validType:'length[2,20]',
    missingMessage:'请输入职位名称',
    invalidMessage:'职位名称2-20位之间'
}
//新增职位
postAddName.textbox(postName);
//修改职位
postEditName.textbox(postName);


