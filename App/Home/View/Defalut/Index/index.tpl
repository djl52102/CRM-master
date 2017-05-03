<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CRM客户关系管理系统</title>
  <link rel="stylesheet"  href="__EASYUI__/themes/bootstrap/easyui.css">
  <link rel="stylesheet"  href="__EASYUI__/themes/icon.css">
  <link rel="stylesheet"  href="__CSS__/index.css">
  <script type="text/javascript">
    var ThinkPHP={
      'MODULE':'__MODULE__'
    };
  </script>
</head>
<body class="easyui-layout" >
<!--软件头部-->
<div data-options="region:'north',split:true,border:false" class="layout-north">
  <div class="logo">
    <img src="__IMAGE__/logo.png" alt="CRM客户管理系统">
  </div>
  <div class="info">
      您好,{:session('admin')['accounts']}!
    <a href="javascript:void(0)" class="easyui-linkbutton" id="btn-edit" iconCls="icon-edit">修改密码</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" id="btn-logout" iconCls="icon-remove">登出系统</a>
  </div>
</div>

<!--修改密码-->
<form id="edit" class="easyui-dialog">
    <input type="hidden" id="edit-id" value="{:session('admin')['id']}"/>
    <table class="form-table">
        <tbody>
        <tr>
            <td class="label"><label for="edit-accounts" class="form-label">帐号</label></td>
            <td class="input"><input type="text" id="edit-accounts" class="easyui-textbox" value="{:session('admin')['accounts']}"/></td>
        </tr>
        <tr>
            <td class="label"><label for="edit-password" class="form-label">密码</label></td>
            <td class="input"><input type="password" id="edit-password" class="easyui-textbox"/></td>
        </tr>
        <tr>
            <td class="label"><label for="edit-notpassword" class="form-label">密码确认</label></td>
            <td class="input"><input type="password" id="edit-notpassword" class="easyui-textbox"/></td>
        </tr>
        </tbody>
    </table>
</form>

<!--软件左侧导航-->
<div data-options="region:'west',split:true,title:'导航',iconCls:'icon-world'" class="layout-west">
  <div id="tree"></div>
</div>

<!--软件主体区域-->
<div data-options="region:'center'" class="layout-center">
  <div id="tabs">
    <div title="起始页" iconCls="icon-house">
      <p>欢迎来到CRM客户关系管理系统</p>
    </div>
  </div>
</div>

<!--软件底部区域-->
<div data-options="region:'south',split:true" class="layout-south">
  ©2009-2016 瓢城Web 俱乐部. Powered by ThinkPHP and EasyUI.
</div>
<!--软件底部区域-->
<div id="menu" class="easyui-menu">
    <div class="closecur">关闭</div>
    <div class="closeall">关闭所有</div>
    <div class="closeother">关闭其他</div>
</div>
<!--details容器-->
<div id="details"></div>


<script type="text/javascript" src="__EASYUI__/jquery.min.js"></script>
<script type="text/javascript" src="__EASYUI__/jquery.easyui.min.js"></script>
<script type="text/javascript" src="__EASYUI__/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="__JS__/index.js"></script>
</body>
</html>