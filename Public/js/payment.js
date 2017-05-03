var payment=$('#payment'),
    paymentOpt,
    paymentsearchKeywords=$('#payment-search-keywords'),
    paymentsearchType=$('#payment-search-type'),
    paymentsearchDatetype=$('#payment-search-date-type'),
    paymentsearchDatefrom=$('#payment-search-date-from'),
    paymentsearchDateto=$('#payment-search-date-to')

//表格数据列表
$('#payment').datagrid({
    url:ThinkPHP['MODULE'] + '/Produce/getList',
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
    toolbar:'#payment-tool',
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
            field:'sell_price',
            title:'出售价格',
            width:70
        },
        {
            field:'number',
            title:'入库数量',
            width:70
        },
        {
            field:'total',
            title:'支出费用',
            width:60,
            formatter:function(value,row){
                if(row.mode=='采购'){
                    return (row.number*row.pro_price).toFixed(2);
                }else if(row.mode=='退库'){
                    return (row.number*row.sell_price).toFixed(2);
                }
            }
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
            field:'enter',
            title:'录入员',
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
//工具条操作
paymentOpt= {
    reload:function(){
        payment.datagrid('reload');
    },
    search:function(){
        payment.datagrid('load',{
            keywords: paymentsearchKeywords.textbox('getValue'),
            type:paymentsearchType.combobox('getValue'),
            dateType:paymentsearchDatetype.combobox('getValue'),
            dateFrom: paymentsearchDatefrom.datebox('getValue'),
            dateTo: paymentsearchDateto.datebox('getValue')
        })
    },
    reset:function(){
        paymentsearchKeywords.textbox('clear');
        paymentsearchDatetype.combobox('clear').combobox('disableValidation');
        paymentsearchType.combobox('clear').combobox('disableValidation');
        paymentsearchDatefrom.datebox('clear');
        paymentsearchDateto.datebox('clear');
        this.search();
        payment.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });

    }
};
//查询字段区询
paymentsearchKeywords.textbox({
    width:150,
    prompt:'产品名称/产品编号'
});
//查询时间对象
paymentDate={
    width:100,
    editable:false,
    onSelect:function(){
        if(paymentsearchDatetype.combobox('enableValidation').combobox('isValid')==false){
            paymentsearchDatetype.combobox('showPanel');
        };
    }
};
//时间类型选择
paymentsearchDatetype.combobox({
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
paymentsearchType.combobox({
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
paymentDate.prompt='起始时间';
paymentsearchDatefrom.datebox(paymentDate);
//结束时间
paymentDate.prompt='结束时间';
paymentsearchDateto.datebox(paymentDate);
