var product=$('#product'),
    productAdd=$('#product-add'),
    productAddName=$('#product-add-name'),
    productAddSn=$('#product-add-sn'),
    productAddType=$('#product-add-type'),
    productAddProPrice=$('#product-add-pro_price'),
    productAddSellPrice=$('#product-add-sell_price'),
    productAddUnit=$('#product-add-unit'),
    productAddInventoryAlarm=$('#product-add-inventory_alarm'),
    productAddDetails=$('#product-add-details'),
    productEdit=$('#product-edit'),
    productEditId=$('#product-edit-id'),
    productEditSn=$('#product-edit-sn'),
    productEditName=$('#product-edit-name'),
    productEditType=$('#product-edit-type'),
    productEditProPrice=$('#product-edit-pro_price'),
    productEditSellPrice=$('#product-edit-sell_price'),
    productEditUnit=$('#product-edit-unit'),
    productEditInventoryAlarm=$('#product-edit-inventory_alarm'),
    productEditDetails=$('#product-edit-details'),
    productOpt,
    productsearchKeywords=$('#product-search-keywords'),
    productsearchType=$('#product-search-type'),
    productsearchDatetype=$('#product-search-date-type'),
    productsearchDatefrom=$('#product-search-date-from'),
    productsearchDateto=$('#product-search-date-to')

//浏览器改变时触发
$(window).resize(function(){
    productAdd.dialog('center');
});
//表格数据列表
$('#product').datagrid({
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
    toolbar:'#product-tool',
    columns:[[
        {
            field : 'id',
            title : '自动编号',
            width : 100,
            checkbox : true
        },
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
            field:'type',
            title:'产品类型',
            width:100,
            sortable:true
        },
        {
            field:'unit',
            title:'计量单位',
            width:60
        },
        {
            field:'pro_price',
            title:'采购价格',
            width:70
        },
        {
            field:'sell_price',
            title:'销售价格',
            width:70
        },
        {
            field:'inventory',
            title:'库存',
            width:70,
            sortable:true
        },
        {
            field:'inventory_in',
            title:'入库总量',
            width:70
        },
        {
            field:'inventory_out',
            title:'出库总量',
            width:70
        },
        {
            field:'inventory_alarm',
            title:'库存警报量',
            width:70
        },
        {
            field : 'create_time',
            title : '创建时间',
            width : 100,
            sortable:true
        },
        {
            field:'details',
            title:'详情',
            width:40,
            fixed:true,
            formatter:function(value,row){
                return '<a href="javascript:void(0)" class="product-details" onclick="productOpt.details('+row.id+')"></a>'
            }
        }
    ]],
    onLoadSuccess:function() {
        $('.product-details').linkbutton({
            iconCls: 'icon-text',
            plain: true
        });
    },
    onClickCell:function(index,field){
        if(field=='details'){
            product.datagrid('selectRow',index);
        }
    }
});
//新增面板
productAdd.dialog({
    title:'新增面板',
    width:'780',
    height:'506',
    iconCls:'icon-add',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            PRODUCT_ADD.sync();
            if(productAdd.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Product/register',
                    type:'post',
                    data:{
                        name:productAddName.val(),
                        sn:productAddSn.val(),
                        type:productAddType.val(),
                        pro_price:productAddProPrice.val(),
                        sell_price:productAddSellPrice.val(),
                        unit:productAddUnit.val(),
                        inventory_alarm:productAddInventoryAlarm.val(),
                        details:productAddDetails.val()
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
                            productAdd.dialog('close');
                            product.datagrid('load')
                        }else if(data==-1){
                            $.messager.alert('添加失败!','帐号已存在',
                                'waning',function(){
                                    productAddName.textbox('textbox').select();
                                })
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            productAdd.dialog('close')
        }
    }],
    onOpen : function ()
    {
        PRODUCT_ADD.html('');
    },
    onClose:function(){
        productAdd.form('reset');
        productAdd.dialog('center');
        PRODUCT_ADD.html('');
    }
});
//修改面板
productEdit.dialog({
    title:'更新面板',
    width:'780',
    height:'500',
    iconCls:'icon-edit',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            PRODUCT_EDIT.sync();
            if(productEdit.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Product/update',
                    type:'post',
                    data:{
                        id:productEditId.val(),
                        sn: $.trim(productEditSn.val()),
                        name: $.trim(productEditName.val()),
                        type:productEditType.combobox('getValue'),
                        pro_price:productEditProPrice.val(),
                        sell_price:productEditSellPrice.val(),
                        unit:productEditUnit.val(),
                        inventory_alarm:productEditInventoryAlarm.val(),
                        details:productEditDetails.val()
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
                            productEdit.dialog('close');
                            product.datagrid('load')
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            productEdit.dialog('close')
        }
    }],
    onClose:function(){
        productEdit.form('reset');
        productEdit.dialog('center');
        PRODUCT_EDIT.html('');
    }


});
//工具条操作
productOpt= {
    add: function () {
        productAdd.dialog('open');
    },
    edit: function () {
        var rows = product.datagrid('getSelections');
        if (rows.length == 1) {
            productEdit.dialog('open');
            $.ajax({
                url: ThinkPHP['MODULE'] + '/Product/getOne',
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
                        productEdit.form('load', {
                            id: data.id,
                            sn:data.sn,
                            name:data.name,
                            type:data.type,
                            unit:data.unit,
                            pro_price:data.pro_price,
                            sell_price:data.sell_price,
                            inventory_alarm:data.inventory_alarm
                        });
                        PRODUCT_EDIT.html(data.details);
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
        var rows = product.datagrid('getSelections');
        if (rows.length > 0) {
            $.messager.confirm('警告操作', '你确定要删除' + rows.length + '条数据吗', function (flag) {

                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].id);
                    }
                    $.ajax({
                        url: ThinkPHP['MODULE'] + '/Product/remove',
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
                                product.datagrid('reload');
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
        product.datagrid('unselectAll');
    },
    reload:function(){
        product.datagrid('reload');
    },
    search:function(){
            product.datagrid('load',{
                keywords: productsearchKeywords.textbox('getValue'),
                type:productsearchType.combobox('getValue'),
                dateType:productsearchDatetype.combobox('getValue'),
                dateFrom: productsearchDatefrom.datebox('getValue'),
                dateTo: productsearchDateto.datebox('getValue')
            })
    },
    reset:function(){
        productsearchKeywords.textbox('clear');
        productsearchDatetype.combobox('clear').combobox('disableValidation');
        productsearchType.combobox('clear').combobox('disableValidation');
        productsearchDatefrom.datebox('clear');
        productsearchDateto.datebox('clear');
        this.search();
        product.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });

    },
    details:function(id){
        details
            .dialog('open')
            .dialog('setTitle','详情')
            .dialog('refresh',ThinkPHP['MODULE']+'/Product/getDetails?id='+id);
    }
};
//查询字段区询
productsearchKeywords.textbox({
    width:150,
    prompt:'产品名称/产品编号'
});
//查询时间对象
productDate={
    width:100,
    editable:false,
    onSelect:function(){
        if(productsearchDatetype.combobox('enableValidation').combobox('isValid')==false){
            productsearchDatetype.combobox('showPanel');
        };
    }
};
//时间类型选择
productsearchDatetype.combobox({
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
productsearchType.combobox({
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
productDate.prompt='起始时间';
productsearchDatefrom.datebox(productDate);
//结束时间
productDate.prompt='结束时间';
productsearchDateto.datebox(productDate);
//加载新增编辑器
PRODUCT_ADD=KindEditor.create('#product-add-details',{
    width:'94%',
    height:'200px',
    resizeType:0,
    items:editor_tool
});
//加载新增编辑器
PRODUCT_EDIT=KindEditor.create('#product-edit-details',{
    width:'94%',
    height:'200px',
    resizeType:0,
    items:editor_tool
});

/*表单字段区域*/
//产品名称
productAddName.textbox({
    width:240,
    height:32,
    required:true,
    validType:'length[2,20]',
    missingMessage:'请输入产品名称',
    invalidMessage:'产品名称2-20位'
});
productEditName.textbox({
    width:240,
    height:32,
    disabled:true,
    required:true,
    validType:'length[2,20]',
    missingMessage:'请输入产品名称',
    invalidMessage:'产品名称2-20位'
});
//产品编号
productAddSn.textbox({
    width:240,
    height:32,
    required:true,
    validType:'sn'
});
productEditSn.textbox({
    width:240,
    height:32,
    disabled:true,
    required:true,
    validType:'sn'
});
//产品类型
productAddType.combobox({
    width:140,
    height:32,
    panelHeight:'auto',
    data:[{
        id:'办公耗材',
        text:'办公耗材'
    },{
        id:'数码用品',
        text:'数码用品'
    }],
    editable:false,
    valueField:'id',
    textField:'text'
});
productEditType.combobox({
    width:140,
    height:32,
    panelHeight:'auto',
    data:[{
        id:'办公耗材',
        text:'办公耗材'
    },{
        id:'数码用品',
        text:'数码用品'
    }],
    editable:false,
    valueField:'id',
    textField:'text'
});
//采购价格
productAddProPrice.numberbox({
    width:140,
    height:32
});
productEditProPrice.numberbox({
    width:140,
    height:32
});
//销售价格
productAddSellPrice.numberbox({
    width:140,
    height:32
});
productEditSellPrice.numberbox({
    width:140,
    height:32
});
//库存警报
productAddInventoryAlarm.numberbox({
    width:140,
    height:32,
    value:10
});
productEditInventoryAlarm.numberbox({
    width:140,
    height:32,
    value:10
});
//计量单位
productAddUnit.textbox({
    width:140,
    height:32
});
productEditUnit.textbox({
    width:140,
    height:32
});
//验证产品编号
$.extend($.fn.validatebox.defaults.rules, {
    sn: {
        validator: function(value,param){
            return /^[0-9]{5}$/.test(value);
        },
        message:'产品编号不正确'
    }
});
