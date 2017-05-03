var outlib=$('#outlib'),
    outlibAdd=$('#outlib-add'),
    outlibAddProductId=$('#outlib-add-product-id'),
    outlibAddProdcut=$('#outlib-add-product'),
    outlibAddNumber=$('#outlib-add-number'),
    outlibAddStaffName=$('#outlib-add-staff-name'),
    outlibAddMode=$('#outlib-add-mode'),
    outlibAddModeExplain=$('#outlib-add-mode-explain'),
    outlibProduct   =$('#outlib-product'),
    outlibStaff=$('#outlib-staff'),
    outlibSearchProduct=$('#outlib-search-product'),
    outlibSearchStaff=$('#outlib-search-staff'),
    outlibOpt,
    outlibProductOpt,
    outlibStaffOpt,
    outlibsearchKeywords=$('#outlib-search-keywords'),
    outlibsearchType=$('#outlib-search-type'),
    outlibsearchDatetype=$('#outlib-search-date-type'),
    outlibsearchDatefrom=$('#outlib-search-date-from'),
    outlibsearchDateto=$('#outlib-search-date-to'),
    outlibsearchKeyWordsProduct=$('#outlib-search-keywords-product'),
    outlibsearchKeyWordsStaff=$('#outlib-search-keywords-staff')

//浏览器改变时触发
$(window).resize(function(){
    outlibAdd.dialog('center');
});
//表格数据列表
$('#outlib').datagrid({
    url:ThinkPHP['MODULE'] + '/Outlib/getList',
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
    toolbar:'#outlib-tool',
    columns:[[
        {
            field : 'id',
            title : '自动编号',
            width : 100,
            checkbox:true
        },
        {
            field : 'order_sn',
            title : '产品编号',
            width : 60
        },
        {
            field : 'sn',
            title : '产品编号',
            width : 60
        },
        {
            field:'sell_price',
            title:'销售价格',
            width:70
        },
        {
            field:'number',
            title:'数量',
            width:70
        },
        {
            field:'clerk',
            title:'发货员',
            width:70
        },
        {
            field:'enter',
            title:'下单员',
            width:70
        },
        {
            field:'state',
            title:'状态',
            width:60
        },
        {
            field:'dispose_time',
            title:'下单时间',
            width:60
        },
        {
            field : 'create_time',
            title : '创建时间',
            width : 120,
            sortable:true
        }
    ]],
    onLoadSuccess:function(){
        $(this).datagrid('autoMergeCells')
    }
});
//新增面板
outlibAdd.dialog({
    title:'新增入库',
    width:'420',
    height:'380',
    iconCls:'icon-add',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            if(outlibAdd.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Outlib/register',
                    type:'post',
                    data:{
                        id:outlibAddProductId.val(),
                        number:outlibAddNumber.textbox('getValue'),
                        staff:outlibAddStaffName.textbox('getValue'),
                        mode:outlibAddMode.combobox('getValue'),
                        mode_explain:outlibAddModeExplain.textbox('getValue')
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
                            outlibAdd.dialog('close');
                            outlib.datagrid('load')
                        }else if(data==-1){
                            $.messager.alert('添加失败!','帐号已存在',
                                'waning',function(){
                                    outlibAddProdcut.textbox('textbox').select();
                                })
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            outlibAdd.dialog('close')
        }
    }],
    onClose:function(){
        outlibAdd.form('reset');
        outlibAdd.dialog('center');
    }
});
//选择产品弹窗
outlibProduct.dialog({
    title:'选择产品',
    width:'550',
    height:'380',
    iconCls:'icon-zoom',
    closed:true,
    toolbar:'#outlib-tool-product',
    modal:true,
    maximizable:true,
    onOpen:function(){
        outlibSearchProduct.datagrid({
            url:ThinkPHP['MODULE'] + '/Product/getList',
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
                    title : '产品编号',
                    width : 60
                },
                {
                    field : 'name',
                    title : '产品名称',
                    width : 100
                },
                {
                    field:'unit',
                    title:'计量单位',
                    width:50
                },
                {
                    field:'pro_price',
                    title:'采购价格',
                    width:50
                },
                {
                    field:'select',
                    title:'选择产品',
                    width:60,
                    formatter:function(value,row){
                        return '<a href="javascript:void(0)" class="select-button" style="height:18px;margin-left:2px;" onclick="outlibProductOpt.select(\''+row.id+'\',\''+row.name+'\');">选择</a>'
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
                outlibSearchProduct.datagrid('selectRow',index);
            }
        })
    }

});
//选择经办人
outlibStaff.dialog({
    title:'选择经办人',
    width:'550',
    height:'380',
    iconCls:'icon-zoom',
    closed:true,
    toolbar:'#outlib-tool-staff',
    modal:true,
    maximizable:true,
    onOpen:function(){
        outlibSearchStaff.datagrid({
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
                    title : '经办人编号',
                    width : 60
                },
                {
                    field : 'name',
                    title : '经办姓名',
                    width : 100
                },
                {
                    field:'select',
                    title:'选择经办人',
                    width:60,
                    formatter:function(value,row){
                        return '<a href="javascript:void(0)" class="select-button" style="height:18px;margin-left:2px;" onclick="outlibStaffOpt.select(\''+row.id+'\',\''+row.name+'\');">选择</a>'
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
                outlibSearchStaff.datagrid('selectRow',index);
            }
        })
    }

});
//工具条操作
outlibOpt= {
    deliver : function ()
    {
        var state = 0;
        var rows = outlib.datagrid('getSelections');

        //限制未处理的出库产品发货
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].state != '已付款') {
                $.messager.alert('操作警告', '出库货物必须是已付款状态下！', 'warning');
                state = 1;
                break;
            }
        }

        if (state == 0) {
            if (rows.length > 0) {
                $.messager.confirm('确认操作', '您要批量发货 <strong>' + rows.length + '</strong> 件产品吗？', function (flag) {
                    if (flag) {
                        var ids = [];
                        for (var i = 0; i < rows.length; i++) {
                            ids.push(rows[i].id);
                        }

                        $.ajax({
                            url: ThinkPHP['MODULE'] + '/Outlib/deliver',
                            type: 'POST',
                            data: {
                                ids: ids.join(',')
                            },
                            beforeSend: function () {
                                $.messager.progress({
                                    text: '正在处理中...'
                                });
                            },
                            success: function (data) {
                                $.messager.progress('close');
                                if (data) {
                                    outlib.datagrid('reload');
                                    $.messager.show({
                                        title: '操作提醒',
                                        msg: data + '条数据被成功修改！'
                                    })
                                } else {
                                    $.messager.alert('修改失败', '没有修改任何数据！', 'warning');
                                }
                            }
                        });
                    }
                });
            }
        }
    },
    reload:function(){
        outlib.datagrid('reload');
    },
    search:function(){
        outlib.datagrid('load',{
            keywords: outlibsearchKeywords.textbox('getValue'),
            type:outlibsearchType.combobox('getValue'),
            dateType:outlibsearchDatetype.combobox('getValue'),
            dateFrom: outlibsearchDatefrom.datebox('getValue'),
            dateTo: outlibsearchDateto.datebox('getValue')
        })
    },
    reset:function(){
        outlibsearchKeywords.textbox('clear');
        outlibsearchDatetype.combobox('clear').combobox('disableValidation');
        outlibsearchType.combobox('clear').combobox('disableValidation');
        outlibsearchDatefrom.datebox('clear');
        outlibsearchDateto.datebox('clear');
        this.search();
        outlib.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });
    },
    details:function(id){
        details.dialog('open').
        dialog('setTitle','入库产品详情').
        dialog('refresh',ThinkPHP['MODULE']+'/Outlib/getDetails?id='+id);
    }
};
//选择产品工具条
outlibProductOpt={
    search:function(){
        outlibSearchProduct.datagrid('load',{
            keywords: outlibsearchKeyWordsProduct.textbox('getValue')
        })
    },
    reset:function(){
        outlibsearchKeyWordsProduct.textbox('clear');
        this.search();
        outlibSearchProduct.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });
    },
    select:function(id,name){
        outlibAddProductId.val(id);
        outlibAddProdcut.textbox('setValue',name);
        outlibProduct.dialog('close');
    }
};
//选择经办人工具条
outlibStaffOpt={
    search:function(){
        outlibSearchStaff.datagrid('load',{
            keywords: outlibsearchKeyWordsStaff.textbox('getValue')
        })
    },
    reset:function(){
        outlibsearchKeyWordsStaff.textbox('clear');
        this.search();
        outlibSearchStaff.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });
    },
    select:function(id,name){
        outlibAddStaffName.textbox('setValue',name);
        outlibStaff.dialog('close');
    }
};
//查询字段区询
outlibsearchKeywords.textbox({
    width:150,
    prompt:'产品名称/产品编号'
});

outlibsearchKeyWordsProduct.textbox({
    width:150,
    prompt:'产品名称/产品编号'
});

outlibsearchKeyWordsStaff.textbox({
    width:150,
    prompt:'员工编号/员工姓名'
});
//查询时间对象
outlibDate={
    width:100,
    editable:false,
    onSelect:function(){
        if(outlibsearchDatetype.combobox('enableValidation').combobox('isValid')==false){
            outlibsearchDatetype.combobox('showPanel');
        };
    }
};
//时间类型选择
outlibsearchDatetype.combobox({
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
outlibsearchType.combobox({
    width:100,
    editable:false,
    prompt:'产品类型',
    data:[{
        id:'数码用品',
        text:'数码用品'
    },{
        id:'办公耗材',
        text:'办公耗材'
    }],
    valueField:'id',
    textField:'text',
    required:true,
    novalidate:true,
    panelHeight:'auto',
    tipPosition:'left',
    missingMessage:'请选择产品类型'
});
//起始时间
outlibDate.prompt='起始时间';
outlibsearchDatefrom.datebox(outlibDate);
//结束时间
outlibDate.prompt='结束时间';
outlibsearchDateto.datebox(outlibDate);

//出库产品
outlibAddProdcut.textbox({
    width:240,
    height:32,
    editable:false,
    required:true,
    icons:[{
        iconCls:'icon-zoom',
        handler:function(){
            outlibProduct.dialog('open');
        }
    }],
    missingMessage:'请选择放大镜选择产品',
    invalidMessage:'产品不得为空'
});
//出库数量
outlibAddNumber.numberbox({
    width:240,
    height:32,
    required:true
});
//经办人
outlibAddStaffName.textbox({
    width:240,
    height:32,
    editable:false,
    required:true,
    icons:[{
        iconCls:'icon-zoom',
        handler:function(){
            outlibStaff.dialog('open');
        }
    }],
    missingMessage:'请选择放大镜选择经办人',
    invalidMessage:'经办人不得为空'
});
//出库类型
outlibAddMode.combobox({
    width:100,
    editable:false,
    prompt:'产品类型',
    data:[{
        id:'采购',
        text:'采购'
    },{
        id:'退库',
        text:'退库'
    }],
    valueField:'id',
    textField:'text',
    required:true,
    novalidate:true,
    panelHeight:'auto',
    tipPosition:'left',
    missingMessage:'请选择入库类型'
});
//出库说明
outlibAddModeExplain.textbox({
    width:240,
    height:32,
    required:true,
    prompt:'如：从哪里采购或退货(20字内)'
});

//合并相同内容的单元格，自动化的
$.extend($.fn.datagrid.methods, {
    autoMergeCells : function (jq, fields) {
        return jq.each(function () {
            var target = $(this);
            if (!fields) {
                fields = target.datagrid("getColumnFields");
            }
            var rows = target.datagrid("getRows");
            var i = 0,
                j = 0,
                temp = {};
            for (i; i < rows.length; i++) {
                var row = rows[i];
                j = 0;
                for (j; j < fields.length; j++) {
                    var field = fields[j];
                    var tf = temp[field];
                    if (!tf) {
                        tf = temp[field] = {};
                        tf[row[field]] = [i];
                    } else {
                        var tfv = tf[row[field]];
                        if (tfv) {
                            tfv.push(i);
                        } else {
                            tfv = tf[row[field]] = [i];
                        }
                    }
                }
            }
            $.each(temp, function (field, column) {
                $.each(column, function () {
                    var group = this;

                    if (group.length > 1) {
                        var before,
                            after,
                            megerIndex = group[0];
                        for (var i = 0; i < group.length; i++) {
                            before = group[i];
                            after = group[i + 1];
                            if (after && (after - before) == 1) {
                                continue;
                            }
                            var rowspan = before - megerIndex + 1;
                            //这里的&& field == 'order_sn'是我添加的，限制只有订单号合并
                            if (rowspan > 1 && field == 'order_sn') {
                                target.datagrid('mergeCells', {
                                    index : megerIndex,
                                    field : field,
                                    rowspan : rowspan
                                });
                            }

                            if (after && (after - before) != 1) {
                                megerIndex = after;
                            }
                        }
                    }
                });
            });
        });
    }
});