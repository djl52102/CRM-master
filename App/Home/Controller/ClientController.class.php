<?php
namespace Home\Controller;
class ClientController extends HomeController{
    //加载数据列表
    public function getList(){
        if(IS_AJAX){
            $Client=D('Client');
            $this->ajaxReturn($Client->getList(
                I('post.page'),I('post.rows'),I('post.sort'),I('post.order'),I('post.keywords'),I('post.dateType'),
                I('post.dateFrom'),I('post.dateTo'),I('post.type')
            ));
        }else{
            $this->error('非法操作');
        }
    }
    //新增数据
    public function register(){
        if(IS_AJAX){
            $Client=D('Client');
            echo $Client->register(I('post.company'),I('post.name'),I('post.tel'),I('post.source'));
        }else{
            $this->error('非法操作');
        }
    }
    //根据id获取一条记录
    public function getOne(){
        $Client=D('Client');
        if(IS_AJAX){
            $this->ajaxReturn($Client->getOne(
                I('post.id')
            ));
        }else{
            $this->Error('非法操作');
        }
    }
    //根据id更新一条记录
    public function update(){
        $Client=D('Client');
        if(IS_AJAX){
            $this->ajaxReturn($Client->update(
                I('post.id'),I('post.company'),I('post.name'),I('post.tel'),I('post.source')
            ));
        }else{
            $this->Error('非法操作');
        }
    }
    //根据id删除一条记录
    public function remove(){
        $Client=D('Client');
        if(IS_AJAX){
            $this->ajaxReturn($Client->remove(
                I('post.ids')));
        }else{
            $this->getErroe('非法操作');
        }
    }

}