<?php
namespace Home\Controller;
use Think\Controller;

class InlibController extends HomeController{
    //新增数据
    public function register(){
        if(IS_AJAX){
            $Inlib=D('Inlib');
            echo $Inlib->register(I('post.id'),I('post.number'),I('post.staff'),I('post.mode'),I('post.mode_explain'));
        }else{
            $this->error('非法操作');
        }
    }
    //加载数据列表
    public function getList(){
        if(IS_AJAX){
            $Inlib=D('Inlib');
            $this->ajaxReturn($Inlib->getList(
                I('post.page'),I('post.rows'),I('post.sort'),I('post.order'),I('post.keywords'),I('post.dateType'),
                I('post.dateFrom'),I('post.dateTo')
            ));
        }else{
            $this->error('非法操作');
        }
    }
    //获取详情
    public function getDetails(){
        $Inlib=D('Inlib');
        if(IS_AJAX){
            $this->assign('object',$Inlib->getDetails(I('get.id')));
            $this->display('details');
        }else{
            $this->Error('非法操作');
        }
    }
}