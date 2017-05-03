<!--Firefox火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="receipt"></table>
<!--工具条-->
<form id="receipt-tool" style="padding:5px;">
  <div class="tool-opt">
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="receiptOpt.add()">新增</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="receiptOpt.edit()">编辑</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="receiptOpt.remove()">删除</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="receiptOpt.reload()">刷新</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="receiptOpt.redo()">取消选定</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="receiptOpt.reset()">重置查询</a>
  </div>
  <!--查询区域-->
  <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
    <label for="receipt-search-keywords">关键字:</label>
    <input type="text" id="receipt-search-keywords">
    <input type="text" id="receipt-search-date-type">
    <input type="text" id="receipt-search-date-from">
    <label for="receipt-search-date-to">-</label>
    <input type="text" id="receipt-search-date-to">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="receiptOpt.search()" style="margin-top:-1px;" >查询</a>
  </div>
</form>

<!--新增面板-->
<form id="receipt-add">
    <input type="text" id="receipt-add-order-sn">
  <table class="form-table" style="max-width:420px">
    <tbody>
    <tr>
      <td class="label"><label for="receipt-add-title" class="form-label">订单标题</label></td>
      <td class="input"><input type="text" id="receipt-add-title"/></td>
    </tr>
    <tr>
      <td class="label"><label for="receipt-add-order" class="form-label">收款订单</label></td>
      <td class="input"><input type="text" id="receipt-add-order"/></td>
    </tr>
    <tr>
      <td class="label">订单报价:</td>
      <td class="input cost"></td>
    </tr>
    <tr>
      <td class="label"><label for="receipt-add-cost" class="form-label">收款金额</label></td>
      <td class="input"><input type="text" id="receipt-add-cost"/></td>
    </tr>
    <tr>
        <td class="label"><label for="receipt-add-remark" class="form-label">订单备注</label></td>
        <td class="input"><input type="text" id="receipt-add-remark"/></td>
    </tr>
    </tbody>
  </table>
</form>

<!--修改面板-->
<form id="receipt-edit">
  <input type="hidden" id="receipt-edit-id" name="id">
  <table class="form-table">
    <tbody>
    <tr>
      <td class="label"><label for="receipt-edit-company" class="form-label">公司名称</label></td>
      <td class="input"><input type="text" id="receipt-edit-company" name="company"/></td>
    </tr>
    <tr>
      <td class="label"><label for="receipt-edit-name" class="form-label">联系人</label></td>
      <td class="input"><input type="text" id="receipt-edit-name" name="name"/></td>
    </tr>
    <tr>
      <td class="label"><label for="receipt-edit-tel" class="form-label">联系电话</label></td>
      <td class="input"><input type="text" id="receipt-edit-tel" name="tel"/></td>
    </tr>
    <tr>
      <td class="label"><label for="receipt-edit-pro_source" class="form-label">渠道来源</label></td>
      <td class="input"><input type="text" id="receipt-edit-source" name="source"/></td>
    </tr>
    </tbody>
  </table>
</form>


<!--选择订单弹窗-->
<div id="receipt-order">
    <table id="receipt-search-order"></table>
</div>
<form id="receipt-tool-order" style="padding:5px;">
    <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
        <label for="receipt-search-keywords-order">关键字:</label>
        <input type="text" id="receipt-search-keywords-order">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="receiptOrderOpt.search()" style="margin-top:-1px;" >查询</a>
        <a href="javascript:void(0)"  class="easyui-linkbutton" plain="true" style="float:right" iconCls="icon-undo" onclick="receiptOrderOpt.reset()">重置查询</a>
    </div>
</form>

<script type="text/javascript" src="__JS__/receipt.js"></script>