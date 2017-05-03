<?php if (!defined('THINK_PATH')) exit();?><!--Firefox火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="order"></table>
<!--工具条-->
<form id="order-tool" style="padding:5px;">
  <div class="tool-opt">
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="orderOpt.add()">新增</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="orderOpt.edit()">编辑</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="orderOpt.remove()">删除</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="orderOpt.reload()">刷新</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="orderOpt.redo()">取消选定</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="orderOpt.reset()">重置查询</a>
  </div>
  <!--查询区域-->
  <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
    <label for="order-search-keywords">关键字:</label>
    <input type="text" id="order-search-keywords">
    <input type="text" id="order-search-date-type">
    <input type="text" id="order-search-date-from">
    <label for="order-search-date-to">-</label>
    <input type="text" id="order-search-date-to">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="orderOpt.search()" style="margin-top:-1px;" >查询</a>
  </div>
</form>

<!--新增面板-->
<form id="order-add">
    <input type="hidden" id="order-add-documentary-id">
    <input type="hidden" id="order-add-original-price">
  <table class="form-table" style="max-width:420px">
    <tbody>
    <tr>
      <td class="label"><label for="order-add-title" class="form-label">订单标题:</label></td>
      <td class="input"><input type="text" id="order-add-title"/></td>
      <td class="label"><label for="order-add-sn" class="form-label">关联订单:</label></td>
      <td class="input"><input type="text" id="order-add-sn"/></td>
    </tr>
    <tr>
      <td class="label">
          <label for="order-add-product-button">计单产品:</label>
      </td>
      <td class="input" colspan="3">
          <a id="order-add-product-button" style="width:70px;height:26px;">添加</a>
      </td>
    </tr>
    <tr>
        <td class="label">

        </td>
        <td class="input" colspan="3">
            <table id="order-product-list"></table>
        </td>
    </tr>
    <tr>
      <td class="label"><label>计单原价:</label></td>
      <td class="input original_price" style="height:30px;">￥0.00</td>
    </tr>
    <tr>
      <td class="label"><label for="order-add-cost" class="form-label">订单金额</label></td>
      <td class="input"><input type="text" id="order-add-cost"/></td>
    </tr>
    <tr>
        <td class="label">
            订单备注：
        </td>
        <td class="input" colspan="3">
            <textarea id="order-add-details" class="textarea"></textarea>
        </td>
    </tr>
    </tbody>
  </table>
</form>

<!--修改面板-->
<form id="order-edit">
  <input type="hidden" id="order-edit-id" name="id">
  <table class="form-table">
    <tbody>
    <tr>
      <td class="label"><label for="order-edit-company" class="form-label">公司名称</label></td>
      <td class="input"><input type="text" id="order-edit-company" name="company"/></td>
    </tr>
    <tr>
      <td class="label"><label for="order-edit-name" class="form-label">联系人</label></td>
      <td class="input"><input type="text" id="order-edit-name" name="name"/></td>
    </tr>
    <tr>
      <td class="label"><label for="order-edit-tel" class="form-label">联系电话</label></td>
      <td class="input"><input type="text" id="order-edit-tel" name="tel"/></td>
    </tr>
    <tr>
      <td class="label"><label for="order-edit-pro_source" class="form-label">渠道来源</label></td>
      <td class="input"><input type="text" id="order-edit-source" name="source"/></td>
    </tr>
    </tbody>
  </table>
</form>

<!--选择关联订单弹窗-->
<div id="order-documentary">
    <table id="order-search-documentary"></table>
</div>
<form id="order-tool-documentary" style="padding:5px;">
    <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
        <label for="order-search-keywords-documentary">关键字:</label>
        <input type="text" id="order-search-keywords-documentary">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="orderDocumentaryOpt.search()" style="margin-top:-1px;" >查询</a>
        <a href="javascript:void(0)"  class="easyui-linkbutton" plain="true" style="float:right" iconCls="icon-undo" onclick="orderDocumentaryOpt.reset()">重置查询</a>
    </div>
</form>

<!--选择产品弹窗-->
<div id="order-product">
    <table id="order-search-product"></table>
</div>
<form id="order-tool-product" style="padding:5px;">
    <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
        <label for="order-search-keywords-product">关键字:</label>
        <input type="text" id="order-search-keywords-product">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="orderProductOpt.search()" style="margin-top:-1px;" >查询</a>
        <a href="javascript:void(0)"  class="easyui-linkbutton" plain="true" style="float:right" iconCls="icon-undo" onclick="orderProductOpt.reset()">重置查询</a>
    </div>
</form>

<script type="text/javascript" src="/CRM/Public/kindeditor/kindeditor-min.js"></script>
<script type="text/javascript" src="/CRM/Public/kindeditor/lang/zh_CN.js"></script>
<script type="text/javascript" src="/CRM/Public/js/order.js"></script>