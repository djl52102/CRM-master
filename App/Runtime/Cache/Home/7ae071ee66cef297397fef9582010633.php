<?php if (!defined('THINK_PATH')) exit();?><!--Firefox火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="outlib"></table>
<!--工具条-->
<form id="outlib-tool" style="padding:5px;">
  <div class="tool-opt">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="outlibOpt.deliver()" style="margin-top:-1px;" >出库</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="outlibOpt.reload()">刷新</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="outlibOpt.reset()">重置查询</a>
  </div>
  <!--查询区域-->
  <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
    <label for="outlib-search-keywords">关键字:</label>
    <input type="text" id="outlib-search-keywords">
    <input type="text" id="outlib-search-type">
    <input type="text" id="outlib-search-date-type">
    <input type="text" id="outlib-search-date-from">
    <label for="outlib-search-date-to">-</label>
    <input type="text" id="outlib-search-date-to">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="outlibOpt.search()" style="margin-top:-1px;" >查询</a>
  </div>
</form>

<!--选择产品弹窗-->
<div id="outlib-product">
  <table id="outlib-search-product"></table>
</div>

<!--选择经办人弹窗-->
<div id="outlib-staff">
  <table id="outlib-search-staff"></table>
</div>

<!--选择产品工具条-->
<form id="outlib-tool-product" style="padding:5px;">
  <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
    <label for="outlib-search-keywords-product">关键字:</label>
    <input type="text" id="outlib-search-keywords-product">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="outlibProductOpt.search()" style="margin-top:-1px;" >查询</a>
    <a href="javascript:void(0)"  class="easyui-linkbutton" plain="true" style="float:right" iconCls="icon-undo" onclick="outlibProductOpt.reset()">重置查询</a>
  </div>
</form>

<!--选择经办人工具条-->
<form id="outlib-tool-staff" style="padding:5px;">
  <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
    <label for="outlib-search-keywords-staff">关键字:</label>
    <input type="text" id="outlib-search-keywords-staff">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="outlibStaffOpt.search()" style="margin-top:-1px;" >查询</a>
    <a href="javascript:void(0)"  class="easyui-linkbutton" plain="true" style="float:right" iconCls="icon-undo" onclick="outlibStaffOpt.reset()">重置查询</a>
  </div>
</form>

<script type="text/javascript" src="/CRM/Public/js/outlib.js"></script>