
var staff=$('#staff'),
    staffsearchKeywords         =   $('#staff-search-keywords'),
    staffsearchPost             =   $('#staff-search-post'),
    staffsearchDatetype         =   $('#staff-search-date-type'),
    staffsearchDatefrom         =   $('#staff-search-date-from'),
    staffsearchDateto           =   $('#staff-search-date-to'),
    staffsearchGender           =   $('#staff-search-gender'),
    staffsearchMaritalStatus    =   $('#staff-search-marital-status'),
    staffsearchEducation        =   $('#staff-search-education'),
    staffsearchType             =   $('#staff-search-type'),
    staffsearchIdCard           =   $('#staff-search-id-card'),
    staffsearchNation           =   $('#staff-search-nation'),
    staffsearchEntryStatus      =   $('#staff-search-entry-status'),
    staffaddNumber              =   $('#staff-add-number'),
    staffaddName                =   $('#staff-add-name'),
    staffaddGender              =   $('#staff-add-gender'),
    staffaddIdCard              =   $('#staff-add-id-card'),
    staffaddPost                =   $('#staff-add-post'),
    staffaddTel                 =   $('#staff-add-tel'),
    staffaddType                =   $('#staff-add-type'),
    staffaddNation              =   $('#staff-add-nation'),
    staffaddMaritalStatus       =   $('#staff-add-marital-status'),
    staffaddEntryStatus         =   $('#staff-add-entry-status'),
    staffaddEntryDate           =   $('#staff-add-entry-date'),
    staffaddPoliticStatus       =   $('#staff-add-politic-status'),
    staffaddEducation           =   $('#staff-add-education'),
    staffaddCreateTime          =   $('#staff-add-create-time'),
    staffaddIntro               =   $('#staff-add-intro'),
    staffaddDetails             =   $('#staff-add-details'),
    field                       =   $('#field'),
    staffEdit                   =   $('#staff-edit'),
    staffeditId                 =   $('#staff-edit-id'),
    staffeditGender             =   $('#staff-edit-gender'),
    staffeditIntro              =   $('#staff-edit-intro'),
    staffeditDetails            =   $('#staff-edit-details'),
    staffOpt,
    staffAdd=$('#staff-add'),
    staffTool=$('#staff-tool');

//表格数据列表
$('#staff').datagrid({
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
    toolbar:'#staff-tool',
    columns:[[
        {
            field : 'id',
            title : '自动编号',
            width : 100,
            checkbox : true
        },
        {
            field : 'number',
            title : '员工编号',
            width : 100
        },
        {
            field:'name',
            title:'员工姓名',
            width:100
        },
        {
            field:'gender',
            title:'性别',
            width:100
        },
        {
            field:'type',
            title:'职位类型',
            width:100
        },
        {
            field:'id_card',
            title:'身份证号',
            width:100
        },
        {
            field:'post',
            title:'职位',
            width:100
        },
        {
            field:'tel',
            title:'电话号码',
            width:100
        },
        {
            field:'nation',
            title:'民族',
            width:100
        },
        {
            field:'marital_status',
            title:'婚姻状况',
            width:100
        },
        {
            field:'entry_status',
            title:'在职状况',
            width:100
        },
        {
            field:'entry_date',
            title:'入职日期',
            width:100
        },
        {
            field:'politics_status',
            title:'政治面貌',
            width:100
        },
        {
            field:'education',
            title:'教育',
            width:100
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
                return '<a href="javascript:void(0)" class="staff-details" onclick="staffOpt.details('+row.id+')"></a>'
            }
        }
    ]],
    onLoadSuccess:function(){
        $('.staff-details').linkbutton({
            iconCls:'icon-text',
            plain:true
        });
    },
    onClickCell:function(index,field){
        if(field=='details'){
            staff.datagrid('selectRow',index);
        }
    }
});
//新增面板
staffAdd.dialog({
    title:'新增档案',
    width:'780',
    height:'500',
    iconCls:'icon-add',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            STAFF_ADD.sync();
            if(staffAdd.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Staff/register',
                    type:'post',
                    data:{
                        number: $.trim(staffaddNumber.val()),
                        name: $.trim(staffaddName.val()),
                        gender: staffaddGender.val(),
                        id_card: $.trim(staffaddIdCard.val()),
                        tel:staffaddTel.val(),
                        type:staffaddType.val(),
                        nation:staffaddNation.val(),
                        marital_status:staffaddMaritalStatus.val(),
                        entry_status:staffaddEntryStatus.val(),
                        entry_date:staffaddEntryDate.val(),
                        politic_status:staffaddPoliticStatus.val(),
                        education:staffaddEducation.val(),
                        intro:staffaddIntro.val(),
                        post:staffaddPost.val(),
                        details:staffaddDetails.val()
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
                            staffAdd.dialog('close');
                            staff.datagrid('load')
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            staffAdd.dialog('close')
        }
    }],
    onOpen : function ()
    {
        STAFF_ADD.html('');
    },
    onClose:function(){
        staffAdd.form('reset');
        staffAdd.dialog('center');
        STAFF_ADD.html('');
    }


});
//修改面板
staffEdit.dialog({
    title:'更新档案',
    width:'780',
    height:'500',
    iconCls:'icon-edit',
    closed:true,
    modal:true,
    buttons:[{
        text:'保存',
        handler:function(){
            STAFF_EDIT.sync();
            if(staffEdit.form('validate')){
                $.ajax({
                    url:ThinkPHP['MODULE']+'/Staff/update',
                    type:'post',
                    data:{
                        id:staffeditId.val(),
                        gender:staffeditGender.val(),
                        intro:staffeditIntro.val(),
                        details: $.trim(staffeditDetails.val())
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
                            staffEdit.dialog('close');
                            staff.datagrid('load')
                        }
                    }

                })
            }
        }
    },{
        text:'取消',
        handler:function(){
            staffEdit.dialog('close')
        }
    }],
    onClose:function(){
        staffEdit.form('reset');
        staffEdit.dialog('center');
        STAFF_EDIT.html('');
    }


});
//工具条操作
staffOpt= {
    add: function () {
        staffAdd.dialog('open')
    },
    edit: function () {
        var rows = staff.datagrid('getSelections');
        if (rows.length == 1) {
            staffEdit.dialog('open');
            $.ajax({
                url: ThinkPHP['MODULE'] + '/Staff/getOne',
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
                        staffEdit.form('load', {
                            id: data.id,
                            name:data.name,
                            gender:data.gender,
                            intro:data.intro,
                            details:data.details
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
    details:function(id){
        details
            .dialog('open')
            .dialog('setTitle','员工档案详情')
            .dialog('refresh',ThinkPHP['MODULE']+'/Staff/getDetails?id='+id);
    },
    redo:function(){
        staff.datagrid('unselectAll');
    },
    reload:function(){
        staff.datagrid('reload');
    },
    search:function(){
        if(staffTool.form('validate')){
            staff.datagrid('load',{
                keywords: staffsearchKeywords.textbox('getValue'),
                entryStatus:staffsearchEntryStatus.combobox('getValue'),
                dateType:staffsearchDatetype.combobox('getValue'),
                dateFrom: staffsearchDatefrom.datebox('getValue'),
                dateTo: staffsearchDateto.datebox('getValue'),
                gender:staffsearchGender.combobox('getValue'),
                id_card: staffsearchIdCard.textbox('getValue'),
                maritalStatus:staffsearchMaritalStatus.combobox('getValue'),
                education:staffsearchEducation.combobox('getValue'),
                type:staffsearchType.combobox('getValue'),
                nation:staffsearchNation.textbox('getValue'),
                post:staffsearchPost.combobox('getValue')
            })
        }
    },
    reset:function(){
        staffsearchKeywords.textbox('clear');
        staffsearchDatetype.combobox('clear').combobox('disableValidation');
        staffsearchEntryStatus.combobox('clear').combobox('disableValidation');
        staffsearchDatefrom.datebox('clear');
        staffsearchDateto.datebox('clear');
        staffsearchGender.combobox('clear').combobox('disableValidation');
        staffsearchIdCard.textbox('clear');
        staffsearchMaritalStatus.combobox('clear').combobox('disableValidation');
        staffsearchEducation.combobox('clear').combobox('disableValidation');
        staffsearchType.combobox('clear').combobox('disableValidation');
        staffsearchPost.combobox('clear').combobox('disableValidation');
        staffsearchNation.textbox('clear');
        this.search();
        staff.datagrid('sort',{
            sortName:'create_time',
            sortOrder:'DESC'
        });

    },
    field:function(){
        if(field.linkbutton('options').text=='展开查询字段'){
            $('.more').show();
            field.linkbutton({
                text:'收起查询字段',
                iconCls:'icon-reducesearch'
            }).linkbutton('select');

        }else{
            $('.more').hide();
            field.linkbutton({
                text:'展开查询字段',
                iconCls:'icon-addsearch'
            }).linkbutton('unselect');
        };
    },
    remove:function(){
        var rows = staff.datagrid('getSelections');
        if (rows.length > 0) {
            $.messager.confirm('警告操作', '你确定要删除' + rows.length + '条数据吗'+'<br>'+'删除数据必须先解绑账号', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i++) {
                        if(rows[i].user_id==0){
                            ids.push(rows[i].id);
                        }
                    }
                    $.ajax({
                        url: ThinkPHP['MODULE'] + '/Staff/remove',
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
                                staff.datagrid('reload');
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
    }
};
//查询字段区询
staffsearchKeywords.textbox({
    width:150,
    prompt:'工号/姓名/电话号码'
});
//查询时间对象
staffDate={
    width:100,
    editable:false,
    onSelect:function(){
        if(staffsearchDatetype.combobox('enableValidation').combobox('isValid')==false){
            staffsearchDatetype.combobox('showPanel');
        }
    }
};
//新增工号
staffaddNumber.textbox({
    width:240,
    height:32,
    required:true,
});
//新增职位
staffaddPost.combobox({
    width:140,
    height:32,
    url:ThinkPHP['MODULE']+'/Post/getList',
    queryParams:{
        all:true
    },
    editable:false,
    valueField:'name',
    textField:'name',
    panelHeight:'auto'
});
//新增帐号
staffaddName.textbox({
    width:240,
    height:32,
    required:true,
});
//新增身份证号
staffaddIdCard.textbox({
    width:240,
    height:32,
    required:true,
});
//新增电话
staffaddTel.textbox({
    width:240,
    height:32,
    required:true,
});
//新增员工类型
staffaddType.textbox({
    width:240,
    height:32,
    required:true,
});
//新增员工民族
staffaddNation.textbox({
    width:240,
    height:32,
    required:true,
});
//婚姻状态选择
staffaddMaritalStatus.combobox({
    width:100,
    editable:false,
    prompt:'婚姻状况',
    data:[{
        id:'离异',
        text:'离异'
    },{
        id:'已婚',
        text:'已婚'
    },{
        id:'未婚',
        text:'未婚'
    }
    ],
    valueField:'id',
    textField:'text',
    panelHeight:'auto'
});
//入职状态
staffaddEntryStatus.combobox({
    width:100,
    editable:false,
    prompt:'入职状态',
    data:[{
        id:'在职',
        text:'在职'
    },{
        id:'辞职',
        text:'辞职'
    },{
        id:'调休',
        text:'调休'
    }
    ],
    valueField:'id',
    textField:'text',
    panelHeight:'auto'
});
//入职日期
staffaddEntryDate.datebox({
    width:240,
    height:32,
    required:true,
});
//政治面貌
staffaddPoliticStatus.textbox({
    width:240,
    height:32,
    required:true,
});
//教育状况选择
staffaddEducation.combobox({
    width:100,
    editable:false,
    prompt:'教育状况',
    data:[{
        id:'大专',
        text:'大专'
    },{
        id:'本科',
        text:'本科'
    },{
        id:'硕士',
        text:'硕士'
    }
    ],
    valueField:'id',
    textField:'text',
    panelHeight:'auto'
});
//创建时间
staffaddCreateTime.datebox({
    width:240,
    height:32,
    required:true,
});
$('#staff-add-gender-1').linkbutton({
    plain:true,
    toggle:true,
    selected:true,
    group:'staff_add_gender',
    iconCls:'icon-male',
    onClick:function(){
        staffaddGender.val('男')
    }
});
$('#staff-add-gender-2').linkbutton({
    plain:true,
    toggle:true,
    group:'staff_add_gender',
    iconCls:'icon-female',
    onClick:function(){
        staffaddGender.val('女')
    }
});
//修改性别
$('#staff-edit-gender-1').linkbutton({
    plain:true,
    toggle:true,
    selected:true,
    group:'staff_edit_gender',
    iconCls:'icon-male',
    onClick:function(){
        staffeditGender.val('男')
    }
});
$('#staff-edit-gender-2').linkbutton({
    plain:true,
    toggle:true,
    group:'staff_edit_gender',
    iconCls:'icon-female',
    onClick:function(){
        staffeditGender.val('女')
    }
});
//加载新增编辑器
STAFF_ADD=KindEditor.create('#staff-add-details',{
    width:'94%',
    height:'200px',
    resizeType:0,
    items:editor_tool
});
//加载修改编辑器
STAFF_EDIT=KindEditor.create('#staff-edit-details',{
    width:'94%',
    height:'200px',
    resizeType:0,
    items:editor_tool
});
//时间类型选择
staffsearchDatetype.combobox({
    width:100,
    editable:false,
    prompt:'选择时间',
    data:[{
        id:'create_time',
        text:'创建时间'
    },{
        id:'entry_date',
        text:'入职时间'
    },{
        id:'dismission_date',
        text:'离职时间'
    }
    ],
    valueField:'id',
    textField:'text',
    required:true,
    novalidate:true,
    panelHeight:'auto',
    tipPosition:'left',
    missingMessage:'请选择时间类型'
});
//入职状态选择
staffsearchEntryStatus.combobox({
    width:100,
    editable:false,
    prompt:'入职状态',
    data:[{
        id:'在职',
        text:'在职'
    },{
        id:'辞职',
        text:'辞职'
    },{
        id:'调休',
        text:'调休'
    }
    ],
    valueField:'id',
    textField:'text',
    panelHeight:'auto'
});
//婚姻状态选择
staffsearchMaritalStatus.combobox({
    width:100,
    editable:false,
    prompt:'婚姻状况',
    data:[{
        id:'离异',
        text:'离异'
    },{
        id:'已婚',
        text:'已婚'
    },{
        id:'未婚',
        text:'未婚'
    }
    ],
    valueField:'id',
    textField:'text',
    panelHeight:'auto'
});
//教育状况选择
staffsearchEducation.combobox({
    width:100,
    editable:false,
    prompt:'教育状况',
    data:[{
        id:'大专',
        text:'大专'
    },{
        id:'本科',
        text:'本科'
    },{
        id:'硕士',
        text:'硕士'
    }
    ],
    valueField:'id',
    textField:'text',
    panelHeight:'auto'
});
//员工类型
staffsearchType.combobox({
    width:100,
    editable:false,
    prompt:'员工类型',
    data:[{
        id:'临时工',
        text:'临时工'
    },{
        id:'合同工',
        text:'合同工'
    },{
        id:'正式员工',
        text:'正式员工'
    }
    ],
    valueField:'id',
    textField:'text',
    panelHeight:'auto'
});
//起始时间
staffDate.prompt='起始时间';
staffsearchDatefrom.datebox(staffDate);
//结束时间
staffDate.prompt='结束时间';
staffsearchDateto.datebox(staffDate);
//性别类型选择
staffsearchGender.combobox({
    width:73,
    editable:false,
    prompt:'性别',
    data:[{
        id:'男',
        text:'男'
    },{
        id:'女',
        text:'女'
    }
    ],
    valueField:'id',
    textField:'text',
    panelHeight:'auto'
});
//职位选择
staffsearchPost.combobox({
    width:73,
    prompt:'职位',
    url:ThinkPHP['MODULE']+'/Post/getList',
    queryParams:{
        all:true
    },
    editable:false,
    valueField:'name',
    textField:'name',
    panelHeight:'auto'
});
//身份证号查询
staffsearchIdCard.textbox({
    width:220,
    prompt:'身份证号(请输入精确18位数字)',
    validType:'id_card',
    invalidMessage:'身份证格式不正确,且精确到18位',
    tipPosition:'bottom'
});
//民族查询
staffsearchNation.textbox({
    width:220,
    prompt:'请输入精准民族(如汉族)'
});
//验证身份证号
$.extend($.fn.validatebox.defaults.rules, {
    id_card: {
        validator: function(value,param){
            return /^[0-9]{17}[xX0-9]$/.test(value);
        }
    }
});