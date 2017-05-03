<?php if (!defined('THINK_PATH')) exit();?><!--Firefox火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="user"></table>
<!--工具条-->
<form id="user-tool" style="padding:5px;">
  <div class="tool-opt">
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="userOpt.add()">新增</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="userOpt.edit()">编辑</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="userOpt.remove()">删除</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="userOpt.reload()">刷新</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="userOpt.redo()">取消选定</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="userOpt.reset()">重置查询</a>
  </div>
  <!--查询区域-->
  <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
    <label for="user-search-keywords">关键字:</label>
    <input type="text" id="user-search-keywords">
    <input type="text" id="user-search-state">
    <input type="text" id="user-search-date-type">
    <input type="text" id="user-search-date-from">
    <label for="user-search-date-to">-</label>
    <input type="text" id="user-search-date-to">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="userOpt.search()" style="margin-top:-1px;" >查询</a>
  </div>
</form>

<!--新增面板-->
<form id="user-add">
  <table class="form-table">
    <tbody>
    <tr>
      <td class="label"><label for="user-add-accounts" class="form-label">帐号名称</label></td>
      <td class="input"><input type="text" id="user-add-accounts"/></td>
    </tr>
    <tr>
      <td class="label"><label for="user-add-password" class="form-label">密码</label></td>
      <td class="input"><input type="text" id="user-add-password"/><span class="link rand-add">生成</span></td>
    </tr>
    <tr>
        <td class="label">
            <label for="user-add-staff-name">关联档案</label>
        </td>
        <td class="input">
            <input type="text" id="user-add-staff-name">
        </td>
    </tr>
    </tbody>
  </table>
</form>
<!--修改面板-->
<form id="user-edit">
  <input type="hidden" id="user-edit-id" name="id"/>
  <table class="form-table">
    <tbody>
    <tr>
      <td class="label"><label for="user-edit-password" class="form-label">密码</label></td>
      <td class="input"><input type="text" id="user-edit-password" name="name"/><span class="link rand-edit">生成</span></td>
    </tr>
    <tr>
      <td class="label"><label for="user-edit-state" class="form-label">状态</label></td>
      <td class="input">
        <input type="text" id="user-edit-state-button"/>
        <input type="hidden" id="user-edit-state"/>
      </td>
    </tr>
    <tr>
      <td class="label">
        <label for="user-edit-staff-name">关联档案</label>
      </td>
      <td class="input">
        <input type="text" id="user-edit-staff-name">
      </td>
    </tr>
    </tbody>
  </table>
</form>

<script type="text/javascript" src="/CRM/Public/js/user.js"></script>