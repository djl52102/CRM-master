<?php
namespace Home\Controller;
use Think\Controller;

class ReceiptController extends Controller{
    //加载数据列表
    public function getList(){
        if(IS_AJAX){
            $Receipt=D('Receipt');
            $this->ajaxReturn($Receipt->getList(
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
            $Receipt=D('Receipt');
            echo $Receipt->register(I('post.order_sn'),I('post.title'),I('post.cost'),I('post.remark'));
        }else{
            $this->getError('非法操作');
        }
    }
}