<?php
namespace Home\Controller;
class OrderController extends HomeController{
    //加载数据列表
    public function getList(){
        if(IS_AJAX){
            $Order=D('Order');
            $this->ajaxReturn($Order->getList(
                I('post.page'),I('post.rows'),I('post.sort'),I('post.order'),I('post.keywords'),I('post.dateType'),
                I('post.dateFrom'),I('post.dateTo')
            ));
        }else{
            $this->error('非法操作');
        }
    }
    //新增数据
    public function register(){
        if(IS_AJAX){
            $Order=D('Order');
            echo $Order->register(I('post.doc_id'),I('post.sn'),I('post.title'),I('post.original'),I('post.cost'),I('post.details'),I('post.productList'));
        }else{
            $this->error('非法操作');
        }
    }
    //删除数据
    public function remove($ids){
       if(IS_AJAX){
           $Order=D('Order');
           echo $Order->remove(I('post.ids'));
       }else{
           $this->error('非法操作');
       }
    }
    //获取详情
    public function getDetails(){
        $Order=D('Order');
        if(IS_AJAX){
            $this->assign('object',$Order->getDetails(I('get.id')));
            $this->display('details');
        }else{
            $this->Error('非法操作');
        }
    }
}