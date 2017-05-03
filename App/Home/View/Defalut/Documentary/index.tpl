<!--Firefox火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="documentary"></table>
<!--工具条-->
<form id="documentary-tool" style="padding:5px;">
  <div class="tool-opt">
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="documentaryOpt.add()">新增</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="documentaryOpt.edit()">编辑</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="documentaryOpt.remove()">删除</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="documentaryOpt.reload()">刷新</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="documentaryOpt.redo()">取消选定</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="documentaryOpt.reset()">重置查询</a>
  </div>
  <!--查询区域-->
  <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
    <label for="documentary-search-keywords">关键字:</label>
    <input type="text" id="documentary-search-keywords">
    <input type="text" id="documentary-search-date-type">
    <input type="text" id="documentary-search-date-from">
    <label for="documentary-search-date-to">-</label>
    <input type="text" id="documentary-search-date-to">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="documentaryOpt.search()" style="margin-top:-1px;" >查询</a>
  </div>
</form>

<!--新增面板-->
<form id="documentary-add">
    <input type="hidden" id="documentary-add-client-id">
    <input type="hidden" id="documentary-add-staff-id">
  <table class="form-table" style="max-width:420px">
    <tbody>
    <tr>
      <td class="label"><label for="documentary-add-title" class="form-label">跟单标题</label></td>
      <td class="input"><input type="text" id="documentary-add-title"/></td>
    </tr>
    <tr>
      <td class="label"><label for="documentary-add-client-company" class="form-label">公司名称</label></td>
      <td class="input"><input type="text" id="documentary-add-client-company"/></td>
    </tr>
    <tr>
      <td class="label"><label for="documentary-add-staff-name" class="form-label">跟单员</label></td>
      <td class="input"><input type="text" id="documentary-add-staff-name"/></td>
    </tr>
    <tr>
      <td class="label"><label for="documentary-add-way" class="form-label">跟单方式</label></td>
      <td class="input"><input type="text" id="documentary-add-way"/></td>
    </tr>
    <tr>
      <td class="label"><label for="documentary-add-evolve" class="form-label">跟单进展</label></td>
      <td class="input"><input type="text" id="documentary-add-evolve"/></td>
    </tr>
    <tr>
      <td class="label"><label for="documentary-add-remark" class="form-label">简单详情</label></td>
      <td class="input"><input type="text" id="documentary-add-remark"/></td>
    </tr>
    </tbody>
  </table>
</form>

<!--修改面板-->
<form id="documentary-edit">
    <input type="hidden" id="documentary-edit-id" name="id">
    <table class="form-table" style="max-width:420px">
        <tbody>
        <tr>
            <td class="label"><label for="documentary-edit-title" class="form-label">跟单标题</label></td>
            <td class="input"><input type="text" id="documentary-edit-title" name="title"/></td>
        </tr>
        <tr>
            <td class="label"><label for="documentary-edit-client-company" class="form-label">关联公司</label></td>
            <td class="input"><input type="text" id="documentary-edit-client-company" name="company"/></td>
        </tr>
        <tr>
            <td class="label"><label for="documentary-edit-staff-name" class="form-label">跟单员</label></td>
            <td class="input"><input type="text" id="documentary-edit-staff-name" name="staff"/></td>
        </tr>
        <tr>
            <td class="label"><label for="documentary-edit-way" class="form-label">跟单方式</label></td>
            <td class="input"><input type="text" id="documentary-edit-way" name="way"/></td>
        </tr>
        <tr>
            <td class="label"><label for="documentary-edit-evolve" class="form-label">跟单进展</label></td>
            <td class="input"><input type="text" id="documentary-edit-evolve" name="evolve"/></td>
        </tr>
        <tr>
            <td class="label"><label for="documentary-edit-remark" class="form-label">简单详情</label></td>
            <td class="input"><input type="text" id="documentary-edit-remark" name="remark"/></td>
        </tr>
        </tbody>
    </table>
</form>

<!--选择公司弹窗-->
<div id="documentary-company">
    <table id="documentary-search-company"></table>
</div>
<form id="documentary-tool-company" style="padding:5px;">
    <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
        <label for="documentary-search-keywords-company">关键字:</label>
        <input type="text" id="documentary-search-keywords-company">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="documentaryCompanyOpt.search()" style="margin-top:-1px;" >查询</a>
        <a href="javascript:void(0)"  class="easyui-linkbutton" plain="true" style="float:right" iconCls="icon-undo" onclick="documentaryCompanyOpt.reset()">重置查询</a>
    </div>
</form>

<!--选择跟单员弹窗-->
<div id="documentary-staff">
    <table id="documentary-search-staff"></table>
</div>
<form id="documentary-tool-staff" style="padding:5px;">
    <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
        <label for="documentary-search-keywords-staff">关键字:</label>
        <input type="text" id="documentary-search-keywords-staff">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="documentaryStaffOpt.search()" style="margin-top:-1px;" >查询</a>
        <a href="javascript:void(0)"  class="easyui-linkbutton" plain="true" style="float:right" iconCls="icon-undo" onclick="documentaryStaffOpt.reset()">重置查询</a>
    </div>
</form>


<script type="text/javascript" src="__JS__/documentary.js"></script>