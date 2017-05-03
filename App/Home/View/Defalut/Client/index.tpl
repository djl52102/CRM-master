<!--Firefox火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="client"></table>
<!--工具条-->
<form id="client-tool" style="padding:5px;">
  <div class="tool-opt">
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="clientOpt.add()">新增</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="clientOpt.edit()">编辑</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="clientOpt.remove()">删除</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="clientOpt.reload()">刷新</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="clientOpt.redo()">取消选定</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="clientOpt.reset()">重置查询</a>
  </div>
  <!--查询区域-->
  <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
    <label for="client-search-keywords">关键字:</label>
    <input type="text" id="client-search-keywords">
    <input type="text" id="client-search-type">
    <input type="text" id="client-search-date-type">
    <input type="text" id="client-search-date-from">
    <label for="client-search-date-to">-</label>
    <input type="text" id="client-search-date-to">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="clientOpt.search()" style="margin-top:-1px;" >查询</a>
  </div>
</form>

<!--新增面板-->
<form id="client-add">
    <table class="form-table" style="max-width:420px">
        <tbody>
        <tr>
            <td class="label"><label for="client-add-company" class="form-label">公司名称</label></td>
            <td class="input"><input type="text" id="client-add-company"/></td>
        </tr>
        <tr>
            <td class="label"><label for="client-add-name" class="form-label">联系人</label></td>
            <td class="input"><input type="text" id="client-add-name"/></td>
        </tr>
        <tr>
            <td class="label"><label for="client-add-tel" class="form-label">联系电话</label></td>
            <td class="input"><input type="text" id="client-add-tel"/></td>
        </tr>
        <tr>
            <td class="label"><label for="client-add-pro_source" class="form-label">渠道来源</label></td>
            <td class="input"><input type="text" id="client-add-source"/></td>
        </tr>
        </tbody>
    </table>
</form>

<!--修改面板-->
<form id="client-edit">
    <input type="hidden" id="client-edit-id" name="id">
  <table class="form-table">
    <tbody>
    <tr>
      <td class="label"><label for="client-edit-company" class="form-label">公司名称</label></td>
      <td class="input"><input type="text" id="client-edit-company" name="company"/></td>
    </tr>
    <tr>
        <td class="label"><label for="client-edit-name" class="form-label">联系人</label></td>
        <td class="input"><input type="text" id="client-edit-name" name="name"/></td>
    </tr>
    <tr>
      <td class="label"><label for="client-edit-tel" class="form-label">联系电话</label></td>
      <td class="input"><input type="text" id="client-edit-tel" name="tel"/></td>
    </tr>
    <tr>
        <td class="label"><label for="client-edit-pro_source" class="form-label">渠道来源</label></td>
        <td class="input"><input type="text" id="client-edit-source" name="source"/></td>
    </tr>
    </tbody>
  </table>
</form>


<script type="text/javascript" src="__JS__/client.js"></script>