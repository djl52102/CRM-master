<?php
namespace Home\Controller;



class UserController extends HomeController{
    //加载数据列表
    public function getList(){
        if(IS_AJAX){
            $User=D('User');
            $this->ajaxReturn($User->getList(
                I('post.page'),I('post.rows'),I('post.sort'),I('post.order'),I('post.keywords'),I('post.dateType'),
                I('post.dateFrom'),I('post.dateTo'),I('post.state')
            ));
        }else{
            $this->error('非法操作');
        }
    }
    //新增数据
    public function register(){
        if(IS_AJAX){
            $User=D('User');
            echo $User->register(
                I('post.accounts'),I('post.password'),I('post.notpassword'),I('post.staff_id'),I('post.staff_name'),I('post.state'),I('post.not')
            );
        }else{
            $this->error('非法操作');
        }
    }
    //根据id获得一条记录
    public function getOne(){
        if(IS_AJAX){
            $User=D('User');
            $this->ajaxReturn($User->getOne(
                I('post.id')
            ));
        }else {
            $this->error('非法操作');
        }
    }
    //根据id修改一条记录
    public function update(){
        if(IS_AJAX){
            $User=D('User');
            $this->ajaxReturn($User->update(
                I('post.id'),I('post.password'),I('post.state'),I('post.staff_id'),I('staff_name')
            ));
        }else{
            $this->error('非法操作');
        }
    }
    //根据id集合删除数据
    public function remove(){
        if(IS_AJAX){
            $User=D('User');
            $this->ajaxReturn($User->remove(
                I('post.ids')
            ));
        }else{
            $this->error('非法操作');
        }
    }
    //审核状态
    public function state()
    {
        if (IS_AJAX) {
            $User = D('User');
            $this->ajaxReturn($User->state(
                I('post.id'),I('post.state')
            ));
        } else {
            $this->error('非法操作');
        }
    }
    //根据一条记录更改密码
    public function editPassword(){
        if (IS_AJAX) {
            $User = D('User');
            echo $User->editPassword(
                I('post.id'),I('post.password'),I('post.notpassword')
            );
        } else {
            $this->error('非法操作');
        }
    }
}