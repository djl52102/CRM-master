
var inlib=$('#inlib'),
    inlibAdd=$('#inlib-add'),
    inlibAddProductId=$('#inlib-add-product-id'),
    inlibAddProdcut=$('#inlib-add-product'),
    inlibAddNumber=$('#inlib-add-number'),
    inlibAddStaffName=$('#inlib-add-staff-name'),
    inlibAddMode=$('#inlib-add-mode'),
    inlibAddModeExplain=$('#inlib-add-mode-explain'),
    inlibProduct   =$('#inlib-product'),
    inlibStaff=$('#inlib-staff'),
    inlibSearchProduct=$('#inlib-search-product'),
    inlibSearchStaff=$('#inlib-search-staff'),
    inlibOpt,
    inlibProductOpt,
    inlibStaffOpt,
    inlibsearchKeywords=$('#inlib-search-keywords'),
    inlibsearchType=$('#inlib-search-type'),
    inlibsearchDatetype=$('#inlib-search-date-type'),
    inlibsearchDatefrom=$('#inlib-search-date-from'),
    inlibsearchDateto=$('#inlib-search-date-to'),
    inlibsearchKeyWordsProduct=$('#inlib-search-keywords-product'),
    inlibsearchKeyWordsStaff=$('#inlib-search-keywords-staff')

//浏览器改变时触发
$(window).resize(function(){
    inlibAdd.dialog('center');
});
//表格数据列表
$('#inlib').datagrid({
    url:ThinkPHP['MODULE'] + '/Inlib/getList',
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
    toolbar:'#inlib-tool',
    columns:[[
        {
            field : 'id',
            title : '自动编号',
            width : 100,
            checkbox:true
        },
        {
            field : 'sn',
            title : '产品编号',
            width : 60
        },
        {
            field : 'name',
            title : '产品名称',
            width : 60
        },
        {
            field:'type',
            title:'产品类型',
            width:60,
            sortable:true
        },
        {
            field:'pro_price',
            title:'采购价格',
            width:70
        },
        {
            field:'number',
            title:'入库数量',
            width:70
        },
        {
            field:'staff_name',
            title:'经办人姓名',
            width:70
        },
        {
            field:'mode',
            title:'入库模式',
            width:70
        },
        {
            field:'mode_explain',
            title:'入库说明',
            width:70
        },
        {
            field:'enter',
            title:'录入员',
            width:70
        },
        {
            field : 'create_time',
            title : '创建时间',
            width : 120,
            sortable:true
        },
        {
            field:'details',
            title:'详情',
            width:40,
            fixed:true,
            formatter:function(value,row){
                return '<a href="javascript:void(0)" class="inlib_details" style="height:18px;margin-left:2px;"  onclick="inlibOpt.details('+row.id+');"></a>'
            }
        }
    ]],
    onLoadSuccess:function() {
        $('.inlib_details').linkbutton({
            iconCls:'icon-text',
            plain:true
        });
    },
    onClickCell:function(index,field){
        if (field == 'details') {
            $('#inlib').datagrid('selectRow', index);
        }
    }
});
//新增面板
inlibAdd.dialog({
    title:'新增入库',
    width:'420',
    height:'380',
    iconCls:'icon-add',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            if(inlibAdd.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Inlib/register',
                    type:'post',
                    data:{
                        id:inlibAddProductId.val(),
                        number:inlibAddNumber.textbox('getValue'),
                        staff:inlibAddStaffName.textbox('getValue'),
                        mode:inlibAddMode.combobox('getValue'),
                        mode_explain:inlibAddModeExplain.textbox('getValue')
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
                            inlibAdd.dialog('close');
                            inlib.datagrid('load')
                        }else if(data==-1){
                            $.messager.alert('添加失败!','帐号已存在',
                                'waning',function(){
                                    inlibAddProdcut.textbox('textbox').select();
                                })
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            inlibAdd.dialog('close')
        }
    }],
    onClose:function(){
        inlibAdd.form('reset');
        inlibAdd.dialog('center');
    }
});
//选择产品弹窗
inlibProduct.dialog({
    title:'选择产品',
    width:'550',
    height:'380',
    iconCls:'icon-zoom',
    closed:true,
    toolbar:'#inlib-tool-product',
    modal:true,
    maximizable:true,
    onOpen:function(){
        inlibSearchProduct.datagrid({
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
                        return '<a href="javascript:void(0)" class="select-button" style="height:18px;margin-left:2px;" onclick="inlibProductOpt.select(\''+row.id+'\',\''+row.name+'\');">选择</a>'
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
                    inlibSearchProduct.datagrid('selectRow',index);
            }
        })
    }

});
//选择经办人
inlibStaff.dialog({
    title:'选择经办人',
    width:'550',
    height:'380',
    iconCls:'icon-zoom',
    closed:true,
    toolbar:'#inlib-tool-staff',
    modal:true,
    maximizable:true,
    onOpen:function(){
        inlibSearchStaff.datagrid({
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
                        return '<a href="javascript:void(0)" class="select-button" style="height:18px;margin-left:2px;" onclick="inlibStaffOpt.select(\''+row.id+'\',\''+row.name+'\');">选择</a>'
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
                inlibSearchStaff.datagrid('selectRow',index);
            }
        })
    }

});
//工具条操作
inlibOpt= {
    add: function () {
        inlibAdd.dialog('open');
    },
    reload:function(){
        inlib.datagrid('reload');
    },
    search:function(){
        inlib.datagrid('load',{
            keywords: inlibsearchKeywords.textbox('getValue'),
            type:inlibsearchType.combobox('getValue'),
            dateType:inlibsearchDatetype.combobox('getValue'),
            dateFrom: inlibsearchDatefrom.datebox('getValue'),
            dateTo: inlibsearchDateto.datebox('getValue')
        })
    },
    reset:function(){
        inlibsearchKeywords.textbox('clear');
        inlibsearchDatetype.combobox('clear').combobox('disableValidation');
        inlibsearchType.combobox('clear').combobox('disableValidation');
        inlibsearchDatefrom.datebox('clear');
        inlibsearchDateto.datebox('clear');
        this.search();
        inlib.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });
    },
    details:function(id){
        details.dialog('open').
            dialog('setTitle','入库产品详情').
            dialog('refresh',ThinkPHP['MODULE']+'/Inlib/getDetails?id='+id);
    }
};
//选择产品工具条
inlibProductOpt={
    search:function(){
        inlibSearchProduct.datagrid('load',{
            keywords: inlibsearchKeyWordsProduct.textbox('getValue')
        })
    },
    reset:function(){
        inlibsearchKeyWordsProduct.textbox('clear');
        this.search();
        inlibSearchProduct.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });
    },
    select:function(id,name){
        inlibAddProductId.val(id);
        inlibAddProdcut.textbox('setValue',name);
        inlibProduct.dialog('close');
    }
};
//选择经办人工具条
inlibStaffOpt={
    search:function(){
        inlibSearchStaff.datagrid('load',{
            keywords: inlibsearchKeyWordsStaff.textbox('getValue')
        })
    },
    reset:function(){
        inlibsearchKeyWordsStaff.textbox('clear');
        this.search();
        inlibSearchStaff.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });
    },
    select:function(id,name){
        inlibAddStaffName.textbox('setValue',name);
        inlibStaff.dialog('close');
    }
};
//查询字段区询
inlibsearchKeywords.textbox({
    width:150,
    prompt:'产品名称/产品编号'
});

inlibsearchKeyWordsProduct.textbox({
    width:150,
    prompt:'产品名称/产品编号'
});

inlibsearchKeyWordsStaff.textbox({
    width:150,
    prompt:'员工编号/员工姓名'
});
//查询时间对象
inlibDate={
    width:100,
    editable:false,
    onSelect:function(){
        if(inlibsearchDatetype.combobox('enableValidation').combobox('isValid')==false){
            inlibsearchDatetype.combobox('showPanel');
        };
    }
};
//时间类型选择
inlibsearchDatetype.combobox({
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
inlibsearchType.combobox({
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
inlibDate.prompt='起始时间';
inlibsearchDatefrom.datebox(inlibDate);
//结束时间
inlibDate.prompt='结束时间';
inlibsearchDateto.datebox(inlibDate);

//入库产品
inlibAddProdcut.textbox({
    width:240,
    height:32,
    editable:false,
    required:true,
    icons:[{
        iconCls:'icon-zoom',
        handler:function(){
            inlibProduct.dialog('open');
        }
    }],
    missingMessage:'请选择放大镜选择产品',
    invalidMessage:'产品不得为空'
});
//入库数量
inlibAddNumber.numberbox({
    width:240,
    height:32,
    required:true
});
//经办人
inlibAddStaffName.textbox({
    width:240,
    height:32,
    editable:false,
    required:true,
    icons:[{
        iconCls:'icon-zoom',
        handler:function(){
            inlibStaff.dialog('open');
        }
    }],
    missingMessage:'请选择放大镜选择经办人',
    invalidMessage:'经办人不得为空'
});
//入库类型
inlibAddMode.combobox({
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
//入库说明
inlibAddModeExplain.textbox({
    width:240,
    height:32,
    required:true,
    prompt:'如：从哪里采购或退货(20字内)'
});
