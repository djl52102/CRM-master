<?php
namespace Home\Controller;
use Think\Controller;

class OutlibController extends Controller{
    //加载数据列表
    public function getList(){
        if(IS_AJAX){
            $Outlib=D('Outlib');
            $this->ajaxReturn($Outlib->getList(
                I('post.page'),I('post.rows'),I('post.sort'),I('post.order'),I('post.keywords'),I('post.dateType'),
                I('post.dateFrom'),I('post.dateTo')
            ));
        }else{
            $this->error('非法操作');
        }
    }
    //出库订单
    public function deliver(){
        if(IS_AJAX){
            $Outlib=D('Outlib');
            echo $Outlib->deliver(I('post.ids'));
        }else{
            $this->getError('非法操作');
        }
    }
}