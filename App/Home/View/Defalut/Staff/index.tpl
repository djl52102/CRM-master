<!--Firefox火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="staff"></table>
<!--工具条-->
<form id="staff-tool" style="padding:5px;">
  <div class="tool-opt">
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="staffOpt.add()">新增</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="staffOpt.edit()">编辑</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="staffOpt.remove()">删除</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="staffOpt.reload()">刷新</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="staffOpt.redo()">取消选定</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-addsearch" onclick="staffOpt.field()" id="field">展开查询字段</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="staffOpt.reset()">重置查询</a>
  </div>
  <!--查询区域-->
  <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
    <label for="staff-search-keywords">关键字:</label>
    <input type="text" id="staff-search-keywords">
    <input type="text" id="staff-search-post">
    <input type="text" id="staff-search-entry-status">
    <input type="text" id="staff-search-date-type">
    <input type="text" id="staff-search-date-from">
    <label for="staff-search-date-to">-</label>
    <input type="text" id="staff-search-date-to">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="staffOpt.search()" style="margin-top:-1px;" >查询</a>
  </div>
    <div class="more">
        <input type="text" id="staff-search-gender">
        <input type="text" id="staff-search-marital-status">
        <input type="text" id="staff-search-education">
        <input type="text" id="staff-search-type">
    </div>
    <div class="more">
        <input type="text" id="staff-search-id-card">
        <input type="text" id="staff-search-nation">
    </div>
</form>
<!--新增面板-->
<form id="staff-add">
    <table class="form-table" style="max-width:780px">
        <tbody>
        <tr>
            <td class="label"><label for="staff-add-number" class="form-label">工号</label></td>
            <td class="input"><input type="text" id="staff-add-number"/></td>
            <td class="label"><label for="staff-add-post" class="form-label">职位</label></td>
            <td class="input"><input type="text" id="staff-add-post"/></td>
        </tr>
        <tr>
            <td class="label"><label for="staff-add-name" class="form-label">姓名</label></td>
            <td class="input"><input type="text" id="staff-add-name"/></td>
            <td class="label"><label for="staff-add-gender" class="form-label">性别</label></td>
            <td class="input">
                <a href="javascript:void(0)" id="staff-add-gender-1" name="staff_add_gender">男</a>
                <a href="javascript:void(0)" id="staff-add-gender-2" name="staff_add_gender">女</a>
                <input type="hidden" id="staff-add-gender" value="男"/></td>
        </tr>
        <tr>
            <td class="label"><label for="staff-add-id-card" class="form-label">身份证号</label></td>
            <td class="input"><input type="text" id="staff-add-id-card"/></td>
            <td class="label"><label for="staff-add-tel" class="form-label">电话号码</label></td>
            <td class="input"><input type="text" id="staff-add-tel"/></td>
        </tr>
        <tr>
            <td class="label"><label for="staff-add-type" class="form-label">员工级别</label></td>
            <td class="input"><input type="text" id="staff-add-type"/></td>
            <td class="label"><label for="staff-add-nation" class="form-label">民族</label></td>
            <td class="input"><input type="text" id="staff-add-nation"/></td>
        </tr>
        <tr>
            <td class="label"><label for="staff-add-marital-status" class="form-label">婚姻</label></td>
            <td class="input"><input type="text" id="staff-add-marital-status"/></td>
            <td class="label"><label for="staff-add-entry-status" class="form-label">入职状态</label></td>
            <td class="input"><input type="text" id="staff-add-entry-status"/></td>
        </tr>
        <tr>
            <td class="label"><label for="staff-add-entry-date" class="form-label">入职日期</label></td>
            <td class="input"><input type="text" id="staff-add-entry-date"/></td>
            <td class="label"><label for="staff-add-politic-status" class="form-label">政治面貌</label></td>
            <td class="input"><input type="text" id="staff-add-politic-status"/></td>
        </tr>
        <tr>
            <td class="label"><label for="staff-add-education" class="form-label">教育状况</label></td>
            <td class="input"><input type="text" id="staff-add-education"/></td>
            <td class="label"><label for="staff-add-create-time" class="form-label">创建时间</label></td>
            <td class="input"><input type="text" id="staff-add-create-time"/></td>
        </tr>
        <tr>
            <td class="label">个人简介:</td>
            <td colspan="3"><textarea class="textarea" id="staff-add-intro" placeholder="255字之内简单介绍一下自己"></textarea></td>
        </tr>
        <tr>
            <td class="label">详情:</td>
            <td colspan="3"><textarea class="textarea" id="staff-add-details"></textarea></td>
        </tr>
        </tbody>
    </table>
</form>
<!--修改面板-->
<form id="staff-edit">
    <input type="hidden" id="staff-edit-id" name="id"/>
    <table class="form-table" style="max-width:780px">
        <tbody>
        <tr>
            <td class="label"><label for="staff-edit-name" class="form-label">姓名</label></td>
            <td class="input"><input type="text" id="staff-edit-name" name="name"/></td>
            <td class="label"><label for="staff-edit-gender" class="form-label">性别</label></td>
            <td class="input">
                <a href="javascript:void(0)" id="staff-edit-gender-1" name="staff_edit_gender">男</a>
                <a href="javascript:void(0)" id="staff-edit-gender-2" name="staff_edit_gender">女</a>
                <input id="staff-edit-gender" name="gender" /></td>
        </tr>
        <tr>
            <td class="label">个人简介:</td>
            <td colspan="3"><textarea class="textarea" name="intro" id="staff-edit-intro" placeholder="255字之内简单介绍一下自己"></textarea></td>
        </tr>
        <tr>
            <td class="label">详情:</td>
            <td colspan="3"><textarea class="textarea" id="staff-edit-details"></textarea></td>
        </tr>
        </tbody>
    </table>
</form>
<script type="text/javascript" src="__EDITOR__/kindeditor-min.js"></script>
<script type="text/javascript" src="__EDITOR__/lang/zh_CN.js"></script>
<script type="text/javascript" src="__JS__/staff.js"></script>