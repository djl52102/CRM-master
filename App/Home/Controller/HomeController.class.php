<?php
namespace Home\Controller;
use Think\Auth;
use Think\Controller;

class HomeController extends Controller{
    //加载主页面
    public function index(){
        if(session('admin')){
            $this->display();
        }else{
            $this->redirect('Login/index');
        }
    }
//    //空方法，防止不存在的方法被运行
//    public function _empty(){
//        $this->redirect('Index/index');
//    }
    //构造方法,初始化
    //protected继承Controller方法
    protected function _initialize(){
        //实例化权限类
        $Auth=new Auth();
        //验证规则
        if(!$Auth->check(CONTROLLER_NAME,session('admin')['id'])){
            exit('<p>您没有权限访问此模块!</p>');
        }
    }
}