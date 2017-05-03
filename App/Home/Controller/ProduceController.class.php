<?php
namespace Home\Controller;
class ProduceController extends HomeController{
    //加载数据列表
    public function getList(){
        if(IS_AJAX){
            $Inlib=D('Inlib');
            $this->ajaxReturn($Inlib->getList(
                I('post.page'),I('post.rows'),I('post.sort'),I('post.order'),I('post.keywords'),I('post.dateType'),
                I('post.dateFrom'),I('post.dateTo'),I('post.produce')
            ));
        }else{
            $this->error('非法操作');
        }
    }
}