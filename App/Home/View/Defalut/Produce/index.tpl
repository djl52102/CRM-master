<!--Firefox火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="produce"></table>
<!--工具条-->
<form id="produce-tool" style="padding:5px;">
  <div class="tool-opt">
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="produceOpt.reload()">刷新</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="produceOpt.reset()">重置查询</a>
  </div>
  <!--查询区域-->
  <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
    <label for="produce-search-keywords">关键字:</label>
    <input type="text" id="produce-search-keywords">
    <input type="text" id="produce-search-type">
    <input type="text" id="produce-search-date-type">
    <input type="text" id="produce-search-date-from">
    <label for="produce-search-date-to">-</label>
    <input type="text" id="produce-search-date-to">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="produceOpt.search()" style="margin-top:-1px;" >查询</a>
  </div>
</form>

<script type="text/javascript" src="__JS__/produce.js"></script>