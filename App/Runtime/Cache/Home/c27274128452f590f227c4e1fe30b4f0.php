<?php if (!defined('THINK_PATH')) exit();?><!--Firefox火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="product"></table>
<!--工具条-->
<form id="product-tool" style="padding:5px;">
  <div class="tool-opt">
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="productOpt.add()">新增</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="productOpt.edit()">编辑</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="productOpt.remove()">删除</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="productOpt.reload()">刷新</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="productOpt.redo()">取消选定</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="productOpt.reset()">重置查询</a>
  </div>
  <!--查询区域-->
  <div class="tool-search" style="padding:0 0 0 7px;color:#333;">
    <label for="product-search-keywords">关键字:</label>
    <input type="text" id="product-search-keywords">
    <input type="text" id="product-search-type">
    <input type="text" id="product-search-date-type">
    <input type="text" id="product-search-date-from">
    <label for="product-search-date-to">-</label>
    <input type="text" id="product-search-date-to">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="productOpt.search()" style="margin-top:-1px;" >查询</a>
  </div>
</form>

<!--新增面板-->
<form id="product-add">
    <table class="form-table">
        <tbody>
        <tr>
            <td class="label"><label for="product-add-sn" class="form-label">产品编号</label></td>
            <td class="input"><input type="text" id="product-add-sn"/></td>
            <td class="label"><label for="product-add-name" class="form-label">产品名称</label></td>
            <td class="input"><input type="text" id="product-add-name"/></td>
        </tr>
        <tr>
            <td class="label"><label for="product-add-type" class="form-label">产品类型</label></td>
            <td class="input"><input type="text" id="product-add-type"/></td>
            <td class="label"><label for="product-add-pro_price" class="form-label">采购价格</label></td>
            <td class="input"><input type="text" id="product-add-pro_price"/></td>
        </tr>
        <tr>
            <td class="label"><label for="product-add-sell_price" class="form-label">出售价格</label></td>
            <td class="input"><input type="text" id="product-add-sell_price"/></td>
            <td class="label"><label for="product-add-unit" class="form-label">计量单位</label></td>
            <td class="input"><input type="text" id="product-add-unit"/></td>

        </tr>
        <tr>
            <td class="label">
                库存警报:
            </td>
            <td class="input" colspan="3">
                <input type="text" id="product-add-inventory_alarm">
            </td>
        </tr>
        <tr>
            <td class="label">
                详情:
            </td>
            <td colspan="3">
                <textarea class="textarea" id="product-add-details"></textarea>
            </td>
        </tr>
        </tbody>
    </table>
</form>
<!--修改面板-->
<form id="product-edit">
    <input  type="hidden" id="product-edit-id" name="id"/>
    <table class="form-table">
        <tbody>
        <tr>
            <td class="label"><label for="product-edit-sn" class="form-label">产品编号</label></td>
            <td class="input"><input type="text" id="product-edit-sn" name="sn"/></td>
            <td class="label"><label for="product-edit-name" class="form-label">产品名称</label></td>
            <td class="input"><input type="text" id="product-edit-name" name="name"/></td>
        </tr>
        <tr>
            <td class="label"><label for="product-edit-type" class="form-label">产品类型</label></td>
            <td class="input"><input type="text" id="product-edit-type" name="type"/></td>
            <td class="label"><label for="product-edit-pro_price" class="form-label">采购价格</label></td>
            <td class="input"><input type="text" id="product-edit-pro_price" name="pro_price"/></td>
        </tr>
        <tr>
            <td class="label"><label for="product-edit-sell_price" class="form-label">出售价格</label></td>
            <td class="input"><input type="text" id="product-edit-sell_price" name="sell_price"/></td>
            <td class="label"><label for="product-edit-unit" class="form-label">计量单位</label></td>
            <td class="input"><input type="text" id="product-edit-unit" name="unit"/></td>

        </tr>
        <tr>
            <td class="label">
                库存警报:
            </td>
            <td class="input" colspan="3">
                <input type="text" id="product-edit-inventory_alarm" name="inventory_alarm"/>
            </td>
        </tr>
        <tr>
            <td class="label">
                详情:
            </td>
            <td colspan="3">
                <textarea class="textarea" id="product-edit-details"></textarea>
            </td>
        </tr>
        </tbody>
    </table>
</form>
<script type="text/javascript" src="/CRM/Public/kindeditor/kindeditor-min.js"></script>
<script type="text/javascript" src="/CRM/Public/kindeditor/lang/zh_CN.js"></script>
<script type="text/javascript" src="/CRM/Public/js/product.js"></script>