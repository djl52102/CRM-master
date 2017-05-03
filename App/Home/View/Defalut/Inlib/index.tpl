<!--Firefox火狐浏览器渲染遮罩专用-->
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
    <input type="text" id="inlib-search-type">
    <input type="text" id="inlib-search-date-type">
    <input type="text" id="inlib-search-date-from">
    <label for="inlib-search-date-to">-</label>
    <input type="text" id="inlib-search-date-to">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="inlibOpt.search()" style="margin-top:-1px;" >查询</a>
  </div>
</form>

<!--新增面板-->
<form id="inlib-add">
    <input type="hidden" id="inlib-add-product-id">
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
    <tr>
        <td class="label">
            <label for="inlib-add-number" class="form-label">入库数量:</label>
        </td>
        <td class="input">
            <input type="text" id="inlib-add-number">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="inlib-add-staff-name" class="form-label">经办人:</label>
        </td>
        <td class="input">
            <input type="text" id="inlib-add-staff-name">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="inlib-add-mode" class="form-label">入库方式:</label>
        </td>
        <td class="input">
            <input type="text" id="inlib-add-mode">
        </td>
    </tr>
    <tr>
        <td class="label">
            <label for="inlib-add-mode-explain" class="form-label">入库说明:</label>
        </td>
        <td class="input">
            <input type="text" id="inlib-add-mode-explain">
        </td>
    </tr>
    </tbody>
  </table>
</form>

<!--选择产品弹窗-->
<div id="inlib-product">
    <table id="inlib-search-product"></table>
</div>

<!--选择经办人弹窗-->
<div id="inlib-staff">
    <table id="inlib-search-staff"></table>
</div>

<!--选择产品工具条-->
<form id="inlib-tool-product" style="padding:5px;">
    <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
        <label for="inlib-search-keywords-product">关键字:</label>
        <input type="text" id="inlib-search-keywords-product">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="inlibProductOpt.search()" style="margin-top:-1px;" >查询</a>
        <a href="javascript:void(0)"  class="easyui-linkbutton" plain="true" style="float:right" iconCls="icon-undo" onclick="inlibProductOpt.reset()">重置查询</a>
    </div>
</form>

<!--选择经办人工具条-->
<form id="inlib-tool-staff" style="padding:5px;">
    <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
        <label for="inlib-search-keywords-staff">关键字:</label>
        <input type="text" id="inlib-search-keywords-staff">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="inlibStaffOpt.search()" style="margin-top:-1px;" >查询</a>
        <a href="javascript:void(0)"  class="easyui-linkbutton" plain="true" style="float:right" iconCls="icon-undo" onclick="inlibStaffOpt.reset()">重置查询</a>
    </div>
</form>

<script type="text/javascript" src="__JS__/inlib.js"></script>