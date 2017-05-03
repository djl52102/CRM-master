<!--Firefox火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="auth"></table>
<!--工具条-->
<form id="auth-tool" style="padding:5px;">
  <div class="tool-opt">
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="authOpt.add()">新增</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="authOpt.edit()">编辑</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="authOpt.remove()">删除</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="authOpt.reload()">刷新</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="authOpt.redo()">取消选定</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="authOpt.reset()">重置查询</a>
  </div>
  <!--查询区域-->
  <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
    <label for="auth-search-keywords">关键字:</label>
    <input type="text" id="auth-search-keywords">
    <input type="text" id="auth-search-date-type">
    <input type="text" id="auth-search-date-from">
    <label for="auth-search-date-to">-</label>
    <input type="text" id="auth-search-date-to">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="authOpt.search()" style="margin-top:-1px;" >查询</a>
  </div>
</form>

<!--新增面板-->
<form id="auth-add">
  <table class="form-table" style="max-width:420px">
    <tbody>
    <tr>
      <td class="label"><label for="auth-add-title" class="form-label">角色名称</label></td>
      <td class="input" colspan="3"><input type="text" id="auth-add-title"/></td>
    </tr>
    <tr>
      <td class="label"><label>所属权限:</label></td>
      <td class="input"></td>
      <td class="label"></td>
      <td class="input"></td>
    </tr>
    <td class="label">

    </td>
    <td class="input" colspan="3">
        <div id="auth-add-rules"></div>
    </td>
      <!--
        <td colspan="4" style="text-align:left;text-indent:100px;">
            <volist name="Auth" id="nav">
                <div style="padding:5px 0;"><strong>{$nav.title}</strong></div>
                <div style="padding:5px 0">
                    <volist name="nav.children" id="children">
                        <lable for="{$children.id}"><input id="{$children.id}" name="ids" type="checkbox" value="{$children.id}">{$children.title}</lable>
                    </volist>
                </div>
            </volist>
        </td>
    -->

    </tbody>
  </table>
</form>

<!--修改面板-->
<form id="auth-edit">
  <input type="hidden" id="auth-edit-id" name="id">
  <table class="form-table" style="max-width:420px">
    <tbody>
    <tr>
      <td class="label"><label for="auth-edit-title" class="form-label">角色名称</label></td>
      <td class="input" colspan="3"><input type="text" id="auth-edit-title" name="title"/></td>
    </tr>
    <tr>
      <td class="label"><label>所属权限:</label></td>
      <td class="input"></td>
      <td class="label"></td>
      <td class="input"></td>
    </tr>
    <td class="label">

    </td>
    <td class="input" colspan="3">
      <div id="auth-edit-rules"></div>
    </td>
    </tbody>
  </table>
</form>


<script type="text/javascript" src="__JS__/auth.js"></script>