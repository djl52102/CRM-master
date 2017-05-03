<?php
namespace Home\Controller;
class ProductController extends HomeController{
    //加载数据列表
    public function getList(){
        if(IS_AJAX){
            $Product=D('Product');
            $this->ajaxReturn($Product->getList(
                I('post.page'),I('post.rows'),I('post.sort'),I('post.order'),I('post.keywords'),I('post.dateType'),
                I('post.dateFrom'),I('post.dateTo'),I('post.type'),I('post.alarm')
            ));
        }else{
            $this->error('非法操作');
        }
    }
    //根据id集合删除数据
    public function remove(){
        if(IS_AJAX){
            $Product=D('Product');
            $this->ajaxReturn($Product->remove(
                I('post.ids')
            ));
        }else{
            $this->error('非法操作');
        }
    }
    //新增数据
    public function register(){
        if(IS_AJAX){
            $Product=D('Product');
            echo $Product->register(I('post.name'),I('post.sn'),I('post.type'),I('post.unit'),I('post.pro_price'),I('post.sell_price'),I('post.inventory_alarm'),I('post.details'));
        }else{
            $this->error('非法操作');
        }
    }
    //根据id获取一条记录
    public function getOne(){
        $Product=D('Product');
        if(IS_AJAX){
            $this->ajaxReturn($Product->getOne(
                I('post.id')
            ));
        }else{
            $this->Error('非法操作');
        }
    }
    //根据id更新记录
    public function update(){
        $Product=D('Product');
        if(IS_AJAX){
            $this->ajaxReturn($Product->update(
                I('post.id'),I('post.sn'),I('post.name'),I('post.type'),I('post.unit'),
                I('post.pro_price'),I('post.sell_price'),I('post.inventory_alarm'),I('post.details')
            ));
        }else{
            $this->getError('非法操作');
        }
    }
    //获取详情
    public function getDetails(){
        $Product=D('Product');
        if(IS_AJAX){
            $this->assign('object',$Product->getDetails(I('get.id')));
            $this->display('details');
        }else{
            $this->Error('非法操作');
        }
    }
}

