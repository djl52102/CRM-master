<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CRM客户关系管理系统</title>
  <link rel="stylesheet"  href="/CRM/Public/easyui/themes/bootstrap/easyui.css">
  <link rel="stylesheet"  href="/CRM/Public/easyui/themes/icon.css">
  <link rel="stylesheet"  href="/CRM/Public/css/login.css">
  <script type="text/javascript">
    var ThinkPHP={
      'MODULE':'/CRM/Home',
      'IMG':'/CRM/Public/image',
        'INDEX':'<?php echo U("Index/index");?>'
    };
  </script>
</head>
<body>
<!--登录面板-->
<form id="login" class="easyui-dialog">
    <table class="form-table" style="max-width:420px">
        <tbody>
        <tr>
            <td class="label" style="width:83px"><label for="login-accounts" class="form-label">帐号</label></td>
            <td class="input"><input type="text" id="login-accounts" class="easyui-textbox"/></td>
        </tr>
        <tr>
            <td class="label" style="width:83px"><label for="login-password" class="form-label">密码</label></td>
            <td class="input"><input type="password" id="login-password" class="easyui-textbox"/></td>
        </tr>
        <tr>
            <td colspan="2" class="register">没有业务帐号?<a href="javascript:void(0)" class="btn-register">[快速申请]</a></td>
        </tr>
        </tbody>
    </table>
</form>
<!--快速注册-->
<form id="register">
    <table class="form-table" style="max-width: 420px;">
        <tbody>
        <tr>
            <td class="label"><label for="register-accounts">帐号</label></td>
            <td class="input"><input type="text" id="register-accounts" class="easyui-textbox" /></td>
        </tr>
        <tr>
            <td class="label"><label for="register-password">密码</label></td>
            <td class="input"><input type="password" id="register-password" class="easyui-textbox"/></td>
        </tr>
        <tr>
            <td class="label"><label for="register-not-password">确认密码</label></td>
            <td class="input"><input type="password" id="register-not-password" class="easyui-textbox"/></td>
        </tr>
        </tbody>
    </table>
</form>


<script type="text/javascript" src="/CRM/Public/easyui/jquery.min.js"></script>
<script type="text/javascript" src="/CRM/Public/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="/CRM/Public/easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="/CRM/Public/js/login.js"></script>
</body>
</html>