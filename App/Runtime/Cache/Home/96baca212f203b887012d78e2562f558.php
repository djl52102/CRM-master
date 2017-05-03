<?php if (!defined('THINK_PATH')) exit();?><!--Firefox火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="inlib"></table>
<!--工具条-->
<form id="inlib-tool" style="padding:5px;">
  <div class="tool-opt">
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="inlibOpt.add()">新增</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="inlibOpt.reload()">刷新</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="inlibOpt.reset()">重置查询</a>
  </div>
  <!--查询区域-->
  <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
    <label for="inlib-search-keywords">关键字:</label>
    <input type="text" id="inlib-search-keywords">
    <input type="text" id="lnlib-search-type">
    <input type="text" id="lnlib-search-date-type">
    <input type="text" id="lnlib-search-date-from">
    <label for="lnlib-search-date-to">-</label>
    <input type="text" id="lnlib-search-date-to">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="lnlibOpt.search()" style="margin-top:-1px;" >查询</a>
  </div>
</form>

<!--新增面板-->
<form id="inlib-add">
  <table class="form-table">
    <tbody>
    <tr>
      <td class="label">
          <label for="inlib-add-product" class="form-label">入库产品:</label>
      </td>
        <td class="input">
            <input type="text" id="inlib-add-product">
        </td>
    </tr>

    </tbody>
  </table>
</form>

<script type="text/javascript" src="/CRM/Public/kindeditor/kindeditor-min.js"></script>
<script type="text/javascript" src="/CRM/Public/kindeditor/lang/zh_CN.js"></script>
<script type="text/javascript" src="/CRM/Public/js/inlib.js"></script>