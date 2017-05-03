var order=$('#order'),
    orderAdd=$('#order-add'),
    orderAddDocumentaryId=$('#order-add-documentary-id'),
    orderAddTitle=$('#order-add-title'),
    orderAddSn=$('#order-add-sn'),
    orderAddOriginalPrice=$('#order-add-original-price'),
    orderAddCost=$('#order-add-cost'),
    orderAddDetails=$('#order-add-details'),
    orderEdit=$('#order-edit'),
    orderEditId=$('#order-edit-id'),
    orderEditCompany=$('#order-edit-company'),
    orderEditName=$('#order-edit-name'),
    orderEditTel=$('#order-edit-tel'),
    orderEditSource=$('#order-edit-source'),
    orderOpt,
    orderDocumentaryOpt,
    orderProductOpt,
    ordersearchKeywords=$('#order-search-keywords'),
    ordersearchType=$('#order-search-type'),
    ordersearchDatetype=$('#order-search-date-type'),
    ordersearchDatefrom=$('#order-search-date-from'),
    ordersearchDateto=$('#order-search-date-to'),
    orderDocumentary=$('#order-documentary'),
    orderProduct=$('#order-product'),
    orderSearchProduct=$('#order-search-product'),
    ordersearchKeywordsProduct=$('#order-search-keywords-product'),
    orderSearchDocumentary=$('#order-search-documentary'),
    ordersearchKeywordsDocumentary=$('#order-search-keywords-documentary')

//浏览器改变时触发
$(window).resize(function(){
    orderAdd.dialog('center');
});
//表格数据列表
$('#order').datagrid({
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
    toolbar:'#order-tool',
    columns:[[
        {
            field : 'id',
            title : '自动编号',
            width : 100,
            checkbox : true
        },
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
            field:'client_company',
            title:'所属公司',
            width:60
        },
        {
            field:'cost',
            title:'订单金额',
            width:60
        },
        {
            field:'staff_name',
            title:'员工姓名',
            width:60
        },
        {
            field:'pay_state',
            title:'订单状态',
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
        },
        {
            field:'details',
            title:'详情',
            width:40,
            fixed:true,
            formatter:function(value,row){
                return '<a href="javascript:void(0)" class="order-details" onclick="orderOpt.details('+row.id+')"></a>'
            }
        }
    ]],
    onLoadSuccess:function() {
        $('.order-details').linkbutton({
            iconCls: 'icon-text',
            plain: true
        });
    },
    onClickCell:function(index,field){
        if(field=='details'){
            order.datagrid('selectRow',index);
        }
    }
});
//新增面板
orderAdd.dialog({
    title:'新增面板',
    width:'780',
    height:'500',
    iconCls:'icon-add',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            var orderproductlist=$('#order-product-list');
            ORDER_ADD.sync();
            if(orderAdd.form('validate')){
                if(orderproductlist.datagrid('getData')['total']<=0){
                    $.messager.alert('警告操作','订单没有选择任何产品!','warning')
                }else{
                    $.ajax({
                        url:ThinkPHP['MODULE']+'/Order/register',
                        type:'post',
                        data:{
                            doc_id:orderAddDocumentaryId.val(),
                            sn:orderAddSn.textbox('getValue'),
                            title:orderAddTitle.textbox('getValue'),
                            original:orderAddOriginalPrice.val(),
                            cost:orderAddCost.textbox('getValue'),
                            details:orderAddDetails.val(),
                            productList:orderproductlist.datagrid('getData')
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
                                orderAdd.dialog('close');
                                order.datagrid('load')
                            }else if(data==-1){
                                $.messager.alert('添加失败!','帐号已存在',
                                    'waning',function(){
                                        orderAddSn.textbox('textbox').select();
                                    })
                            }
                        }

                    })
                }

            }
        }
    },{
        text:'取消',
        handler:function(){
            orderAdd.dialog('close')
        }
    }],
    onOpen : function ()
    {
        ORDER_ADD.html('');
    },
    onClose:function(){
        orderAdd.form('reset');
        orderAdd.dialog('center');
        ORDER_ADD.html('');
        //产品订单初始化
        orderProductOpt.clearOrderProductList()
    }
});
//修改面板
orderEdit.dialog({
    title:'更新面板',
    width:'420',
    height:'300',
    iconCls:'icon-edit',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            if(orderEdit.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Client/update',
                    type:'post',
                    data:{
                        id:orderEditId.val(),
                        company:orderEditCompany.textbox('getValue'),
                        name:orderEditName.textbox('getValue'),
                        tel:orderEditTel.textbox('getValue'),
                        source:orderEditSource.combobox('getValue')
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
                            orderEdit.dialog('close');
                            order.datagrid('load')
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            orderEdit.dialog('close')
        }
    }],
    onClose:function(){
        orderEdit.form('reset');
        orderEdit.dialog('center');
    }


});
//选择关联订单对话框
orderDocumentary.dialog({
    title:'选择关联订单',
    width:'550',
    height:'380',
    iconCls:'icon-zoom',
    closed:true,
    toolbar:'#order-tool-documentary',
    modal:true,
    maximizable:true,
    onOpen:function(){
        orderSearchDocumentary.datagrid({
            url:ThinkPHP['MODULE'] + '/Documentary/getList',
            fit:true,
            fitColumns:true,
            rowNumbers:true,
            border:false,
            sortName:'create_time',
            sortOrder:'Desc',
            pagination:true,
            pageSize:20,
            queryParams:{
                'neg':true
            },
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
                    field:'client_company',
                    title:'关联公司',
                    width:50
                },
                {
                    field:'staff_name',
                    title:'关联员工',
                    width:50
                },
                {
                    field:'select',
                    title:'选择编号',
                    width:60,
                    formatter:function(value,row){
                        return '<a href="javascript:void(0)" class="select-button" style="height:18px;margin-left:2px;" onclick="orderDocumentaryOpt.select(\''+row.id+'\',\''+row.sn+'\');">选择</a>'
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
                orderSearchDocumentary.datagrid('selectRow',index);
            }
        })
    }

});
//选择产品对话框
orderProduct.dialog({
    title:'选择产品',
    width:'550',
    height:'380',
    iconCls:'icon-zoom',
    closed:true,
    toolbar:'#order-tool-product',
    modal:true,
    maximizable:true,
    onOpen:function(){
        orderSearchProduct.datagrid({
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
                    field : 'id',
                    title : '自动编号',
                    width : 100,
                    hidden:true
                },
                {
                    field : 'sn',
                    title : '产品编号',
                    width : 100
                },
                {
                    field : 'name',
                    title : '产品名称',
                    width : 100
                },
                {
                    field:'unit',
                    title:'计量单位',
                    width:80
                },
                {
                    field:'sell_price',
                    title:'出售价',
                    width:80
                },
                {
                    field:'inventory',
                    title:'库存',
                    width:60
                },
                {
                    field:'number',
                    title:'数量',
                    width:60,
                    formatter:function(value,row){
                        return '<input type="text" class="order-number" min="0" max="'+ row.inventory +'">'
                    }

                },
                {
                    field:'select',
                    title:'选择',
                    width:60,
                    formatter:function(value,row,index){
                        return '<a href="javascript:void(0)" class="select-button" style="height:18px;margin-left:2px;" onclick="orderProductOpt.select(\'' + row.id + '\', \'' + row.sn + '\', \'' + row.name + '\', \'' + row.unit + '\', \'' + row.sell_price + '\',\'' + index + '\');">选择</a>'
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
                //数字框
                $('.order-number').numberbox({});
            },
            onClickCell:function(index,field){
                orderSearchProduct.datagrid('selectRow',index);
            }
        })
    }

});
//工具条操作
orderOpt= {
    add: function () {
        orderAdd.dialog('open');
        //订单产品列表
        $('#order-product-list').datagrid({
            width:'95%',
            columns:[[
                {
                    field : 'id',
                    title : '自动编号',
                    width : 100,
                    hidden:true
                },
                {
                    field : 'sn',
                    title : '产品编号',
                    width : 130
                },
                {
                    field : 'name',
                    title : '产品名称',
                    width : 130
                },
                {
                    field:'unit',
                    title:'计量单位',
                    width:80
                },
                {
                    field:'sell_price',
                    title:'出售价',
                    width:80
                },
                {
                    field:'number',
                    title:'数量',
                    width:80
                },
                {
                    field:'opt',
                    title:'操作',
                    width:40,
                    formatter:function(value,row,index){
                        return '<a href="javascript:void(0)" style="height:18px;margin-left:2px" onclick="orderProductOpt.remove(\'' + index + '\')"><img src="../Public/easyui/themes/icons/remove.png" alt=""></a>'
                    }
                }
            ]],
            onClickCell:function(index){
                $('#order-product-list').datagrid('selectRow',index)
            }
        })
    },
    edit: function () {
        var rows = order.datagrid('getSelections');
        if (rows.length == 1) {
            orderEdit.dialog('open');
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
                        orderEdit.form('load', {
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
        var rows = order.datagrid('getSelections');
        if (rows.length > 0) {
            $.messager.confirm('警告操作', '你确定要删除' + rows.length + '条数据吗', function (flag) {

                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].id);
                    }
                    $.ajax({
                        url: ThinkPHP['MODULE'] + '/Order/remove',
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
                                order.datagrid('reload');
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
        order.datagrid('unselectAll');
    },
    reload:function(){
        order.datagrid('reload');
    },
    search:function(){
        order.datagrid('load',{
            keywords: ordersearchKeywords.textbox('getValue'),
            dateType:ordersearchDatetype.combobox('getValue'),
            dateFrom: ordersearchDatefrom.datebox('getValue'),
            dateTo: ordersearchDateto.datebox('getValue')
        })
    },
    reset:function(){
        ordersearchKeywords.textbox('clear');
        ordersearchDatetype.combobox('clear').combobox('disableValidation');
        ordersearchDatefrom.datebox('clear');
        ordersearchDateto.datebox('clear');
        this.search();
        order.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });

    },
    details:function(id){
        details
            .dialog('open')
            .dialog('setTitle','详情')
            .dialog('refresh',ThinkPHP['MODULE']+'/Order/getDetails?id='+id);
    }
};
orderDocumentaryOpt= {
    search:function(){
        orderSearchDocumentary.datagrid('load',{
            keywords: ordersearchKeywordsDocumentary.textbox('getValue')
        })
    },
    reset:function(){
        ordersearchKeywordsDocumentary.textbox('clear');
        this.search();
        orderSearchDocumentary.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });
    },
    select:function(id,sn){
        orderAddDocumentaryId.val(id);
        orderAddSn.textbox('setValue',sn);
        orderDocumentary.dialog('close');
    }
};
orderProductOpt={
    //产品添加id集合
    original_price:0,
    ids:[],
    //清理初始化订单产品的datagrid
    clearOrderProductList:function(){
        //清空ids
        this.ids=[];
        //初始化原价
        this.original_price=0;
        $('.original_price').text('￥0.00');
        //初始化datagrid
        $('#order-product-list').datagrid('loadData',[]);
    },
    search:function(){
        orderSearchProduct.datagrid('load',{
            keywords: ordersearchKeywordsProduct.val()
        })
    },
    reset:function(){
        ordersearchKeywordsProduct.textbox('clear');
        this.search();
        orderSearchProduct.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });
    },
    select:function(id,sn,name,unit,sell_price,index){
        var number=$('.order-number').eq(index).val();
        if(number<=0){
            $.messager.alert('警告操作','添加订单商品数量必须大于0！','warning');
        }else{
            //判断重复添加
            //将添加的id添加进空数组ids
            if($.inArray(id,this.ids)>=0){
                $.messager.alert('警告操作','不能重复添加订单','warning')
            }else{
                this.ids.push(id);
                $('#order-product-list').datagrid('appendRow',{
                    id:id,
                    sn:sn,
                    name:name,
                    unit:unit,
                    sell_price:sell_price,
                    number:number
                });
                this.original_price=((this.original_price*100)+(number*sell_price*100))/100;
                //显示原价格
                $('#order-add-original-price').val(this.original_price.toFixed(2));
                $('.original_price').text('￥'+this.original_price.toFixed(2));
                //关闭弹窗
                $('#order-product').dialog('close');
                //重置
                this.reset();
            }

        }
    },
    remove:function(index,id,number,sell_price){
        var obj=$('#order-product-list');
        //删除一行
        obj.datagrid('deleteRow',index);
        //刷新重新获得行id
        obj.datagrid('loadData',obj.datagrid('getRows'));
        //删除id在数组中位置
        this.ids.splice($.inArray(id, this.ids), 1);
        this.original_price=((this.original_price*100)-(number*sell_price*100))/100;
        //重置原始价格
        $('#order-add-original-price').val(this.original_price.toFixed(2));
        $('.original_price').text('￥'+this.original_price.toFixed(2));

   }
};
//查询字段区询
ordersearchKeywords.textbox({
    width:150,
    prompt:'产品名称/产品编号'
});
ordersearchKeywordsDocumentary.textbox({
    width:150,
    prompt:'公司名称/订单编号'
});
ordersearchKeywordsProduct.textbox({
    width:150,
    prompt:'产品名称/产品编号'
});
//查询时间对象
orderDate={
    width:100,
    editable:false,
    onSelect:function(){
        if(ordersearchDatetype.combobox('enableValidation').combobox('isValid')==false){
            ordersearchDatetype.combobox('showPanel');
        };
    }
};
//时间类型选择
ordersearchDatetype.combobox({
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
ordersearchType.combobox({
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
orderDate.prompt='起始时间';
ordersearchDatefrom.datebox(orderDate);
//结束时间
orderDate.prompt='结束时间';
ordersearchDateto.datebox(orderDate);

/*表单字段区域*/
orderAddTitle.textbox({
    width:240,
    height:32,
    required:true
});
//新增订单编号
orderAddSn.textbox({
    width:240,
    height:32,
    required:true,
    icons:[{
        iconCls:'icon-zoom',
        handler:function(){
            orderDocumentary.dialog('open');
        }
    }],
    missingMessage:'请选择放大镜选择关联订单',
    invalidMessage:'订单不得为空'
});
//新增消费金额
orderAddCost.textbox({
    width:240,
    height:32
});
orderEditCompany.textbox({
    width:240,
    height:32,
    disabled:true
});

orderEditName.textbox({
    width:240,
    height:32,
    required:true,
    validType:'length[2,20]',
    missingMessage:'请输入联系人姓名',
    invalidMessage:'名称2-20位'
});

orderEditTel.textbox({
    width:240,
    height:32,
    required:true,
    validType:'tel',
    missingMessage:'请输入联系电话',
    invalidMessage:'移动电话11位'
});

orderEditSource.combobox({
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

//加载新增编辑器
ORDER_ADD=KindEditor.create('#order-add-details',{
    width:'94%',
    height:'200px',
    resizeType:0,
    items:editor_tool
});

$('#order-add-product-button').linkbutton({
    iconCls:'icon-add',
    //点击弹出选择产品窗口
    onClick:function() {
        orderProduct.dialog('open')
    }
    });


