<?php
return array(
	//'配置项'=>'配置值'
    //设置可访问目录
    'MODULE_ALLOW_LIST'=>array('Home'),
    //设置默认目录
    'DEFAULT_MODULE'=>'Home',
    //URL重写目录
    'URL_MODEL'=>2,
    //设置模板后缀
    'TMPL_TEMPLATE_SUFFIX'=>'.tpl',
    //设置默认主题目录
    'DEFAULT_THEME'=>'Defalut',
    //PDO数据连接
    'DB_TYPE'               =>  'mysql',     // 数据库类型
    'DB_HOST'               =>  'localhost', // 服务器地址
    'DB_NAME'               =>  'crm',          // 数据库名
    'DB_USER'               =>  'root',      // 用户名
    'DB_PWD'                =>  '123456',          // 密码
    'DB_PORT'               =>  '3306',        // 端口
    'DB_PREFIX'             =>  'crm_',    // 数据库表前缀
    //拒绝强制小写
    'DB_PARAMS'=>array(\PDO::ATTR_CASE=>\PDO::CASE_NATURAL)
);