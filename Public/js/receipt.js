var receipt=$('#receipt'),
    receiptAdd=$('#receipt-add'),
    receiptAddOrderSn=$('#receipt-add-order-sn'),
    receiptAddTitle=$('#receipt-add-title'),
    receiptAddOrder=$('#receipt-add-order'),
    receiptAddCost=$('#receipt-add-cost'),
    receiptAddRemark=$('#receipt-add-remark'),
    receiptOrder=$('#receipt-order'),
    receiptEdit=$('#receipt-edit'),
    receiptEditId=$('#receipt-edit-id'),
    receiptEditCompany=$('#receipt-edit-company'),
    receiptEditName=$('#receipt-edit-name'),
    receiptEditTel=$('#receipt-edit-tel'),
    receiptEditSource=$('#receipt-edit-source'),
    receiptOpt,
    receiptOrderOpt,
    receiptsearchKeywords=$('#receipt-search-keywords'),
    receiptsearchKeywordsOrder=$('#receipt-search-keywords-order'),
    receiptsearchType=$('#receipt-search-type'),
    receiptsearchDatetype=$('#receipt-search-date-type'),
    receiptsearchDatefrom=$('#receipt-search-date-from'),
    receiptsearchDateto=$('#receipt-search-date-to'),
    receiptsearchOrder=$('#receipt-search-order')

//表格数据列表
$('#receipt').datagrid({
    url:ThinkPHP['MODULE'] + '/Receipt/getList',
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
    toolbar:'#receipt-tool',
    columns:[[
        {
            field : 'id',
            title : '自动编号',
            width : 100,
            checkbox:true
        },
        {
            field : 'order_sn',
            title : '订单编号',
            width : 60
        },
        {
            field : 'title',
            title : '订单标题',
            width : 60
        },
        {
            field:'cost',
            title:'订单金额',
            width:60,
            sortable:true
        },
        {
            field:'enter',
            title:'录入会计',
            width:70
        },
        {
            field:'remark',
            title:'订单备注',
            width:70
        },
        {
            field : 'create_time',
            title : '创建时间',
            width : 120,
            sortable:true
        }
    ]]
});
//新增面板
receiptAdd.dialog({
    title:'新增面板',
    width:'420',
    height:'300',
    iconCls:'icon-add',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            if(receiptAdd.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Receipt/register',
                    type:'post',
                    data:{
                        order_sn:receiptAddOrderSn.val(),
                        title:receiptAddTitle.textbox('getValue'),
                        cost:1600,
                        remark:receiptAddRemark.textbox('getValue')
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
                            receiptAdd.dialog('close');
                            receipt.datagrid('load')
                        }else if(data==-1){
                            $.messager.alert('添加失败!','帐号已存在',
                                'waning',function(){
                                    receiptAddOrder.textbox('textbox').select();
                                })
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            receiptAdd.dialog('close')
        }
    }],
    onClose:function(){
        receiptAdd.form('reset');
        receiptAdd.dialog('center');
    }
});
//修改面板
receiptEdit.dialog({
    title:'更新面板',
    width:'420',
    height:'300',
    iconCls:'icon-edit',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            if(receiptEdit.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Client/update',
                    type:'post',
                    data:{
                        id:receiptEditId.val(),
                        company:receiptEditCompany.textbox('getValue'),
                        name:receiptEditName.textbox('getValue'),
                        tel:receiptEditTel.textbox('getValue'),
                        source:receiptEditSource.combobox('getValue')
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
                            receiptEdit.dialog('close');
                            receipt.datagrid('load')
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            receiptEdit.dialog('close')
        }
    }],
    onClose:function(){
        receiptEdit.form('reset');
        receiptEdit.dialog('center');
    }


});
//工具条操作
receiptOpt= {
    add: function () {
        receiptAdd.dialog('open');
    },
    edit: function () {
        var rows = receipt.datagrid('getSelections');
        if (rows.length == 1) {
            receiptEdit.dialog('open');
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
                        receiptEdit.form('load', {
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
        var rows = receipt.datagrid('getSelections');
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
                                receipt.datagrid('reload');
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
        receipt.datagrid('unselectAll');
    },
    reload:function(){
        receipt.datagrid('reload');
    },
    search:function(){
        receipt.datagrid('load',{
            keywords: receiptsearchKeywords.textbox('getValue'),
            dateType:receiptsearchDatetype.combobox('getValue'),
            dateFrom: receiptsearchDatefrom.datebox('getValue'),
            dateTo: receiptsearchDateto.datebox('getValue')
        })
    },
    reset:function(){
        receiptsearchKeywords.textbox('clear');
        receiptsearchDatetype.combobox('clear').combobox('disableValidation');
        receiptsearchDatefrom.datebox('clear');
        receiptsearchDateto.datebox('clear');
        this.search();
        receipt.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });

    }
};
//查询字段区询
receiptsearchKeywords.textbox({
    width:150,
    prompt:'产品名称/产品编号'
});
receiptsearchKeywordsOrder.textbox({
    width:150,
    prompt:'产品名称/产品编号'
});
//查询时间对象
receiptDate={
    width:100,
    editable:false,
    onSelect:function(){
        if(receiptsearchDatetype.combobox('enableValidation').combobox('isValid')==false){
            receiptsearchDatetype.combobox('showPanel');
        };
    }
};
//时间类型选择
receiptsearchDatetype.combobox({
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
receiptDate.prompt='起始时间';
receiptsearchDatefrom.datebox(receiptDate);
//结束时间
receiptDate.prompt='结束时间';
receiptsearchDateto.datebox(receiptDate);

/*表单字段区域*/
//新增公司名称
//新增标题
receiptAddTitle.textbox({
    width:240,
    height:32,
    required:true,
    validType:'length[2,20]',
    missingMessage:'请输入收款标题',
    invalidMessage:'名称2-20位'
});
//新增订单
receiptAddOrder.textbox({
    width:240,
    height:32,
    required:true,
    icons:[{
        iconCls:'icon-zoom',
        handler:function(){
            receiptOrder.dialog('open');
        }
    }],
    missingMessage:'请选择放大镜选择订单',
    invalidMessage:'订单不得为空'
});
//新增订单收款
receiptAddCost.textbox({
    width:240,
    height:32,
    required:true
});
//新增订单备注
receiptAddRemark.textbox({
    width:240,
    height:32,
    prompt:'20字以内订单说明'
});


//选择关联公司弹窗
receiptOrder.dialog({
    title:'选择订单',
    width:'550',
    height:'380',
    iconCls:'icon-zoom',
    closed:true,
    toolbar:'#receipt-tool-order',
    modal:true,
    maximizable:true,
    onOpen:function(){
        receiptsearchOrder.datagrid({
            url:ThinkPHP['MODULE'] + '/Order/getList',
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
                    field : 'sn',
                    title : '订单编号',
                    width : 60
                },
                {
                    field : 'title',
                    title : '订单标题',
                    width : 100
                },
                {
                    field:'original',
                    title:'原价',
                    width:50
                },
                {
                    field:'cost',
                    title:'出售价格',
                    width:50
                },
                {
                    field:'pay_state',
                    title:'订单状态',
                    width:50
                },
                {
                    field:'enter',
                    title:'录入员',
                    width:50
                },
                {
                    field:'select',
                    title:'选择订单',
                    width:60,
                    formatter:function(value,row){
                        return '<a href="javascript:void(0)" class="select-button" style="height:18px;margin-left:2px;" onclick="receiptOrderOpt.select(\''+row.sn+'\',\''+row.title+'\');">选择</a>'
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
                receiptsearchOrder.datagrid('selectRow',index);
            }
        })
    }

});
receiptOrderOpt= {
    search:function(){
        receiptsearchOrder.datagrid('load',{
            keywords:receiptsearchKeywordsOrder.textbox('getValue')
        })
    },
    reset:function(){
        receiptsearchKeywordsOrder.textbox('clear');
        this.search();
        receiptsearchOrder.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });
    },
    select:function(sn,title){
        receiptAddOrderSn.val(sn);
        receiptAddOrder.textbox('setValue',title);
        receiptOrder.dialog('close');
    }
};
