<?php
namespace Home\Controller;
use Think\Controller;

class AuthController extends HomeController{
//    //重写index方法
//    public function index(){
//        $Auth=D('AuthGroup');
//        //传值
//        $this->assign('Auth',$Auth->getAuthGroup());
//        //继承父类方法
//        parent::index();
//
//    }
    //加载数据列表
    public function getList(){
        if(IS_AJAX){
            $Auth=D('AuthGroup');
            $this->ajaxReturn($Auth->getList(
                I('post.page'),I('post.rows'),I('post.sort'),I('post.order'),I('post.keywords'),I('post.dateType'),
                I('post.dateFrom'),I('post.dateTo')
            ));
        }else{
            $this->error('非法操作');
        }
    }
    //新增角色
    public function register(){
        if(IS_AJAX){
            $Auth=D('AuthGroup');
            echo ($Auth->register(I('post.title'),I('post.rule')));
        }else{
            $this->error('非法操作');
        }
    }

    //获取所有权限
    public function getAuthGroup(){
        if(IS_AJAX){
            $Auth=D('AuthGroup');
            $this->ajaxReturn($Auth->getAuthGroup(I('post.rules')));
        }else{
            $this->error('非法操作');
        }
    }
    //删除权限
    public function remove(){
        if(IS_AJAX){
            $Auth=D('AuthGroup');
            $this->ajaxReturn($Auth->remove(I('post.ids')));
        }else{
            $this->error('非法操作');
        }
    }
    //根据id获取记录
    public function getOne(){
        if(IS_AJAX){
            $Auth=D('AuthGroup');
            $this->ajaxReturn($Auth->getOne(I('post.id')));
        }else{
            $this->error('非法操作');
        }
    }
    //根据id更新记录
    public function update(){
        if(IS_AJAX){
            $Auth=D('AuthGroup');
            $this->ajaxReturn($Auth->update(I('post.id'),I('post.rules')));
        }else{
            $this->error('非法操作');
        }
    }
}