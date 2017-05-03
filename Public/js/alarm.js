var alarm=$('#alarm'),
    alarmOpt,
    alarmsearchKeywords=$('#alarm-search-keywords'),
    alarmsearchType=$('#alarm-search-type'),
    alarmsearchDatetype=$('#alarm-search-date-type'),
    alarmsearchDatefrom=$('#alarm-search-date-from'),
    alarmsearchDateto=$('#alarm-search-date-to')

//表格数据列表
$('#alarm').datagrid({
    url:ThinkPHP['MODULE'] + '/Product/getList',
    fit:true,
    fitColumns:true,
    rowNumbers:true,
    singleSelect:true,
    border:false,
    sortName:'create_time',
    sortOrder:'Desc',
    pagination:true,
    pageSize:20,
    pageList:[10,20,30,40,50],
    pageNumber:1,
    toolbar:'#alarm-tool',
    queryParams:{
        alarm:true
    },
    columns:[[
        {
            field : 'id',
            title : '自动编号',
            width : 100
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
        }
    ]]
});

//工具条操作
alarmOpt= {
    reload:function(){
        alarm.datagrid('reload');
    },
    search:function(){
        alarm.datagrid('load',{
            keywords: alarmsearchKeywords.textbox('getValue'),
            type:alarmsearchType.combobox('getValue'),
            dateType:alarmsearchDatetype.combobox('getValue'),
            dateFrom: alarmsearchDatefrom.datebox('getValue'),
            dateTo: alarmsearchDateto.datebox('getValue')
        })
    },
    reset:function(){
        alarmsearchKeywords.textbox('clear');
        alarmsearchDatetype.combobox('clear').combobox('disableValidation');
        alarmsearchType.combobox('clear').combobox('disableValidation');
        alarmsearchDatefrom.datebox('clear');
        alarmsearchDateto.datebox('clear');
        this.search();
        alarm.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });

    }
};
//查询字段区询
alarmsearchKeywords.textbox({
    width:150,
    prompt:'产品名称/产品编号'
});
//查询时间对象
alarmDate={
    width:100,
    editable:false,
    onSelect:function(){
        if(alarmsearchDatetype.combobox('enableValidation').combobox('isValid')==false){
            alarmsearchDatetype.combobox('showPanel');
        }
    }
};
//时间类型选择
alarmsearchDatetype.combobox({
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
alarmsearchType.combobox({
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
alarmDate.prompt='起始时间';
alarmsearchDatefrom.datebox(alarmDate);
//结束时间
alarmDate.prompt='结束时间';
alarmsearchDateto.datebox(alarmDate);




