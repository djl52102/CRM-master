<?php
namespace Home\Controller;



class PostController extends HomeController{
    //加载数据列表
    public function getList(){
        if(IS_AJAX){
            $Post=D('Post');
            $this->ajaxReturn($Post->getList(
                I('post.page'),I('post.rows'),I('post.sort'),I('post.order'),I('post.keywords'),I('post.dateType'),
                I('post.dateFrom'),I('post.dateTo'),I('post.all')
            ));
        }else{
            $this->error('非法操作');
        }
    }
    public function register(){
        if(IS_AJAX){
            $Post=D('Post');
            $this->ajaxReturn($Post->register(
                I('post.name')
            ));
        }else{
            $this->error('非法操作');
        }
    }
    //根据id获得一条记录
    public function getOne(){
        if(IS_AJAX){
            $Post=D('Post');
            $this->ajaxReturn($Post->getOne(
                I('post.id')
            ));
        }else {
            $this->error('非法操作');
        }
    }
    //根据id修改一条记录
    public function update(){
        if(IS_AJAX){
            $Post=D('Post');
            $this->ajaxReturn($Post->update(
                I('post.id'),I('post.name')
            ));
        }else{
            $this->error('非法操作');
        }
    }
    //根据id集合删除数据
    public function remove(){
        if(IS_AJAX){
            $Post=D('Post');
            $this->ajaxReturn($Post->remove(
                I('post.ids')
            ));
        }else{
            $this->error('非法操作');
        }
    }
}
