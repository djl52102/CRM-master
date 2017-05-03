var documentary=$('#documentary'),
    documentaryAdd=$('#documentary-add'),
    documentaryAddTitle=$('#documentary-add-title'),
    documentaryAddClientCompany=$('#documentary-add-client-company'),
    documentaryAddStaffName=$('#documentary-add-staff-name'),
    documentaryAddWay=$('#documentary-add-way'),
    documentaryAddEvolve=$('#documentary-add-evolve'),
    documentaryAddRemark=$('#documentary-add-remark'),
    documentaryAddClientId=$('#documentary-add-client-id'),
    documentaryAddStaffId=$('#documentary-add-staff-id'),
    documentaryEdit=$('#documentary-edit'),
    documentaryEditId=$('#documentary-edit-id'),
    documentaryEditTitle=$('#documentary-edit-title'),
    documentaryEditClientCompany=$('#documentary-edit-client-company'),
    documentaryEditStaffName=$('#documentary-edit-staff-name'),
    documentaryEditWay=$('#documentary-edit-way'),
    documentaryEditEvolve=$('#documentary-edit-evolve'),
    documentaryEditRemark=$('#documentary-edit-remark'),
    documentaryOpt,
    documentaryCompanyOpt,
    documentaryStaffOpt,
    documentarysearchKeywords=$('#documentary-search-keywords'),
    documentarysearchType=$('#documentary-search-type'),
    documentarysearchDatetype=$('#documentary-search-date-type'),
    documentarysearchDatefrom=$('#documentary-search-date-from'),
    documentarysearchDateto=$('#documentary-search-date-to'),
    documentaryCompany     =$('#documentary-company'),
    documentarySearchCompany=$('#documentary-search-company'),
    documentarysearchKeywordsCompany=$('#documentary-search-keywords-company'),
    documentaryStaff     =$('#documentary-staff'),
    documentarySearchStaff=$('#documentary-search-staff'),
    documentarysearchKeywordsStaff=$('#documentary-search-keywords-staff')

//浏览器改变时触发
$(window).resize(function(){
    documentaryAdd.dialog('center');
});
//表格数据列表
$('#documentary').datagrid({
    url:ThinkPHP['MODULE'] + '/Documentary/getList',
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
    toolbar:'#documentary-tool',
    columns:[[
        {
            field : 'id',
            title : '自动编号',
            width : 60,
            checkbox : true
        },{
            field:'sn',
            title:'跟单编号',
            width:60
        },
        {
            field : 'title',
            title : '跟单标题',
            width : 120
        },
        {
            field : 'client_company',
            title : '公司名称',
            width : 60
        },
        {
            field : 'staff_name',
            title : '跟单员',
            width : 60
        },
        {
            field:'way',
            title:'跟单方式',
            width:60
        },
        {
            field:'evolve',
            title:'进展状况',
            width:60
        },
        {
            field:'enter',
            title:'录入员',
            width:70
        },
        {
            field:'remark',
            title:'简单备注',
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
documentaryAdd.dialog({
    title:'新增面板',
    width:'420',
    height:'300',
    iconCls:'icon-add',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            if(documentaryAdd.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Documentary/register',
                    type:'post',
                    data:{
                        client_id:documentaryAddClientId.val(),
                        staff_id:documentaryAddStaffId.val(),
                        title:documentaryAddTitle.textbox('getValue'),
                        client_company:documentaryAddClientCompany.textbox('getValue'),
                        staff_name:documentaryAddStaffName.textbox('getValue'),
                        way:documentaryAddWay.textbox('getValue'),
                        evolve:documentaryAddEvolve.textbox('getValue'),
                        remark:documentaryAddRemark.textbox('getValue')
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
                            documentaryAdd.dialog('close');
                            documentary.datagrid('load')
                        }else if(data==-1){
                            $.messager.alert('添加失败!','帐号已存在',
                                'waning',function(){
                                    documentaryAddClientCompany.textbox('textbox').select();
                                })
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            documentaryAdd.dialog('close')
        }
    }],
    onClose:function(){
        documentaryAdd.form('reset');
        documentaryAdd.dialog('center');
    }
});
//修改面板
documentaryEdit.dialog({
    title:'更新面板',
    width:'420',
    height:'300',
    iconCls:'icon-edit',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            if(documentaryEdit.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Documentary/update',
                    type:'post',
                    data:{
                        id:documentaryEditId.val(),
                        company:documentaryEditClientCompany.textbox('getValue'),
                        name: $.trim(documentaryEditStaffName.textbox('getValue')),
                        title:documentaryEditTitle.textbox('getValue'),
                        way:documentaryEditWay.textbox('getValue'),
                        evolve:documentaryEditEvolve.textbox('getValue'),
                        remark:documentaryEditRemark.textbox('getValue')
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
                            documentaryEdit.dialog('close');
                            documentary.datagrid('load')
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            documentaryEdit.dialog('close')
        }
    }],
    onClose:function(){
        documentaryEdit.form('reset');
        documentaryEdit.dialog('center');
    }


});
//选择关联公司弹窗
documentaryCompany.dialog({
    title:'选择公司',
    width:'550',
    height:'380',
    iconCls:'icon-zoom',
    closed:true,
    toolbar:'#documentary-tool-company',
    modal:true,
    maximizable:true,
    onOpen:function(){
        documentarySearchCompany.datagrid({
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
            columns:[[
                {
                    field : 'company',
                    title : '公司名称',
                    width : 60
                },
                {
                    field : 'name',
                    title : '跟单员',
                    width : 100
                },
                {
                    field:'tel',
                    title:'联系电话',
                    width:50
                },
                {
                    field:'source',
                    title:'渠道来源',
                    width:50
                },
                {
                    field:'enter',
                    title:'录入员',
                    width:50
                },
                {
                    field:'select',
                    title:'选择公司',
                    width:60,
                    formatter:function(value,row){
                        return '<a href="javascript:void(0)" class="select-button" style="height:18px;margin-left:2px;" onclick="documentaryCompanyOpt.select(\''+row.id+'\',\''+row.company+'\');">选择</a>'
                    }
                },
                {
                    field : 'create_time',
                    title : '创建时间',
                    width : 100,
                    sortable:true,
                    hidden:true
                }
            ]],
            onLoadSuccess:function(){
                $('.select-button').linkbutton({
                    iconCls:'icon-tick',
                    plain:true
                });
            },
            onClickCell:function(index,field){
                documentarySearchCompany.datagrid('selectRow',index);
            }
        })
    }

});
//选择跟单员弹窗
documentaryStaff.dialog({
    title:'选择跟单员',
    width:'550',
    height:'380',
    iconCls:'icon-zoom',
    closed:true,
    toolbar:'#documentary-tool-staff',
    modal:true,
    queryParams:{
        uid:true
    },
    maximizable:true,
    onOpen:function(){
        documentarySearchStaff.datagrid({
            url:ThinkPHP['MODULE'] + '/Staff/getList',
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
            columns:[[
                {
                    field : 'number',
                    title : '员工编号',
                    width : 60
                },
                {
                    field : 'name',
                    title : '员工姓名',
                    width : 100
                },
                {
                    field:'gender',
                    title:'性别',
                    width:50
                },
                {
                    field:'type',
                    title:'员工类型',
                    width:50
                },
                {
                    field:'select',
                    title:'选择员工',
                    width:60,
                    formatter:function(value,row){
                        return '<a href="javascript:void(0)" class="select-button" style="height:18px;margin-left:2px;" onclick="documentaryStaffOpt.select(\''+row.id+'\',\''+row.name+'\');">选择</a>'
                    }
                },
                {
                    field : 'create_time',
                    title : '创建时间',
                    width : 100,
                    sortable:true,
                    hidden:true
                }
            ]],
            onLoadSuccess:function(){
                $('.select-button').linkbutton({
                    iconCls:'icon-tick',
                    plain:true
                });
            },
            onClickCell:function(index,field){
                documentarySearchStaff.datagrid('selectRow',index);
            }
        })
    }

});
//工具条操作
documentaryOpt= {
    add: function () {
        documentaryAdd.dialog('open');
    },
    edit: function () {
        var rows = documentary.datagrid('getSelections');
        if (rows.length == 1) {
            documentaryEdit.dialog('open');
            $.ajax({
                url: ThinkPHP['MODULE'] + '/Documentary/getOne',
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
                        documentaryEdit.form('load', {
                            id:data.id,
                            title:data.title,
                            company:data.client_company,
                            staff:data.staff_name
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
        var rows = documentary.datagrid('getSelections');
        if (rows.length > 0) {
            $.messager.confirm('警告操作', '你确定要删除' + rows.length + '条数据吗', function (flag) {

                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].id);
                    }
                    $.ajax({
                        url: ThinkPHP['MODULE'] + '/Documentary/remove',
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
                                documentary.datagrid('reload');
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
        documentary.datagrid('unselectAll');
    },
    reload:function(){
        documentary.datagrid('reload');
    },
    search:function(){
        documentary.datagrid('load',{
            keywords: documentarysearchKeywords.textbox('getValue'),
            dateType:documentarysearchDatetype.combobox('getValue'),
            dateFrom: documentarysearchDatefrom.datebox('getValue'),
            dateTo: documentarysearchDateto.datebox('getValue')
        })
    },
    reset:function(){
        documentarysearchKeywords.textbox('clear');
        documentarysearchDatetype.combobox('clear').combobox('disableValidation');
        documentarysearchDatefrom.datebox('clear');
        documentarysearchDateto.datebox('clear');
        this.search();
        documentary.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });

    }
};
//公司选择工具条操作
documentaryCompanyOpt= {
    search:function(){
        documentarySearchCompany.datagrid('load',{
            keywords:documentarysearchKeywordsCompany.textbox('getValue')
        })
    },
    reset:function(){
        documentarysearchKeywordsCompany.textbox('clear');
        this.search();
        documentarySearchCompany.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });
    },
    select:function(id,company){
        documentaryAddClientId.val(id);
        documentaryAddClientCompany.textbox('setValue',company);
        documentaryCompany.dialog('close');
    }
};
//跟单员选择工具条操作
documentaryStaffOpt= {
    search:function(){
        documentarySearchStaff.datagrid('load',{
            keywords: documentarysearchKeywordsStaff.textbox('getValue')
        })
    },
    reset:function(){
        documentarysearchKeywordsStaff.textbox('clear');
        this.search();
        documentarySearchStaff.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });
    },
    select:function(id,name){
        documentaryAddStaffId.val(id);
        documentaryAddStaffName.textbox('setValue',name);
        documentaryStaff.dialog('close');
    }
};
//查询字段区询
documentarysearchKeywords.textbox({
    width:150,
    prompt:'跟单编号/公司名称'
});
documentarysearchKeywordsCompany.textbox({
    width:150,
    prompt:'员工姓名/公司名称'
});
documentarysearchKeywordsStaff.textbox({
    width:150,
    prompt:'员工姓名/员工编号'
});
//查询时间对象
documentaryDate={
    width:100,
    editable:false,
    onSelect:function(){
        if(documentarysearchDatetype.combobox('enableValidation').combobox('isValid')==false){
            documentarysearchDatetype.combobox('showPanel');
        };
    }
};
//时间类型选择
documentarysearchDatetype.combobox({
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
documentarysearchType.combobox({
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
documentaryDate.prompt='起始时间';
documentarysearchDatefrom.datebox(documentaryDate);
//结束时间
documentaryDate.prompt='结束时间';
documentarysearchDateto.datebox(documentaryDate);

documentaryAddTitle.textbox({
    width:240,
    height:32,
    required:true,
    validType:'length[2,10]',
    missingMessage:'请输入跟单标题',
    invalidMessage:'编号2-10位'
});
documentaryAddClientCompany.textbox({
    width:240,
    height:32,
    required:true,
    icons:[{
        iconCls:'icon-zoom',
        handler:function(){
            documentaryCompany.dialog('open');
        }
    }],
    missingMessage:'请选择放大镜选择公司',
    invalidMessage:'公司名不得为空'
});
documentaryAddStaffName.textbox({
    width:240,
    height:32,
    required:true,
    icons:[{
        iconCls:'icon-zoom',
        handler:function(){
            documentaryStaff.dialog('open');
        }
    }],
    missingMessage:'请选择放大镜选择跟单员',
    invalidMessage:'跟单员不得为空'
});
documentaryAddWay.combobox({
    width:240,
    height:32,
    required:true,
    data : [{
        id : '广告媒体',
        text : '广告媒体'
    }, {
        id : '电话营销',
        text : '电话营销'
    }, {
        id : '主动联系',
        text : '主动联系'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
documentaryAddEvolve.combobox({
    width:240,
    height:32,
    data:[{
        id:'谈判中',
        text:'谈判中'
    },{
        id:'已完成',
        text:'已完成'
    },{
        id:'已放弃',
        text:'已放弃'
    }
    ],
    valueField:'id',
    textField:'text',
    panelHeight:'auto'
});
documentaryAddRemark.textbox({
    width:240,
    height:32,
    required:true
});


documentaryEditTitle.textbox({
    width:240,
    height:32,
    editable:false
});
documentaryEditClientCompany.textbox({
    width:240,
    height:32,
    editable:false
});
documentaryEditStaffName.textbox({
    width:240,
    height:32,
    editable:false
});
documentaryEditWay.combobox({
    width:240,
    height:32,
    required:true,
    data : [{
        id : '广告媒体',
        text : '广告媒体'
    }, {
        id : '电话营销',
        text : '电话营销'
    }, {
        id : '主动联系',
        text : '主动联系'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
documentaryEditEvolve.combobox({
    width:240,
    height:32,
    data:[{
        id:'谈判中',
        text:'谈判中'
    },{
        id:'已完成',
        text:'已完成'
    },{
        id:'已放弃',
        text:'已放弃'
    }
    ],
    valueField:'id',
    textField:'text',
    panelHeight:'auto'
});
documentaryEditRemark.textbox({
    width:240,
    height:32,
    required:true
});
