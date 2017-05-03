var produce=$('#produce'),
    produceOpt,
    producesearchKeywords=$('#produce-search-keywords'),
    producesearchType=$('#produce-search-type'),
    producesearchDatetype=$('#produce-search-date-type'),
    producesearchDatefrom=$('#produce-search-date-from'),
    producesearchDateto=$('#produce-search-date-to')

//表格数据列表
$('#produce').datagrid({
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
    queryParams : {
        produce : true
    },
    pageNumber:1,
    toolbar:'#produce-tool',
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
        }
    ]]
});
//工具条操作
produceOpt= {
    reload:function(){
        produce.datagrid('reload');
    },
    search:function(){
        produce.datagrid('load',{
            keywords: producesearchKeywords.textbox('getValue'),
            type:producesearchType.combobox('getValue'),
            dateType:producesearchDatetype.combobox('getValue'),
            dateFrom: producesearchDatefrom.datebox('getValue'),
            dateTo: producesearchDateto.datebox('getValue'),
            produce:true
        })
    },
    reset:function(){
        producesearchKeywords.textbox('clear');
        producesearchDatetype.combobox('clear').combobox('disableValidation');
        producesearchType.combobox('clear').combobox('disableValidation');
        producesearchDatefrom.datebox('clear');
        producesearchDateto.datebox('clear');
        this.search();
        produce.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });

    }
};
//查询字段区询
producesearchKeywords.textbox({
    width:150,
    prompt:'产品名称/产品编号'
});
//查询时间对象
produceDate={
    width:100,
    editable:false,
    onSelect:function(){
        if(producesearchDatetype.combobox('enableValidation').combobox('isValid')==false){
            producesearchDatetype.combobox('showPanel');
        };
    }
};
//时间类型选择
producesearchDatetype.combobox({
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
producesearchType.combobox({
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
produceDate.prompt='起始时间';
producesearchDatefrom.datebox(produceDate);
//结束时间
produceDate.prompt='结束时间';
producesearchDateto.datebox(produceDate);



