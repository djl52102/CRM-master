<?php
namespace Home\Controller;

class StaffController extends HomeController{
    //加载数据列表
    public function getList(){
        if(IS_AJAX){
            $Staff=D('Staff');
            $this->ajaxReturn($Staff->getList(
                I('post.page'),I('post.rows'),I('post.sort'),I('post.order'),I('post.keywords'),I('post.dateType'),
                I('post.dateFrom'),I('post.dateTo'),I('post.gender'),I('post.id_card'),I('post.entryStatus'),
                I('post.maritalStatus'),I('post.education'),I('post.type'),I('post.nation'),I('post.post')
            ));
        }else{
            $this->error('非法操作');
        }
    }
    //新增数据
    public function register(){
        if(IS_AJAX){
            $Staff=D('Staff');
            echo $Staff->register(I('post.number'),
                I('post.name'),I('post.gender'),I('post.id_card'),I('post.tel'),I('post.type'),I('post.nation'),I('post.marital_status'),I('post.entry_status'),I('post.entry_date'),I('post.politic_status'),
                I('post.education'),I('post.intro'),I('post.post'),I('post.details')
            );
        }else{
            $this->error('非法操作');
        }
    }

    //根据id集合删除数据
    public function remove(){
        if(IS_AJAX){
            $Staff=D('Staff');
            echo $Staff->remove(
                I('post.ids')
            );
        }else{
            $this->error('非法操作');
        }
    }
    //根据id获取一条记录
    public function getOne(){
        $Staff=D('Staff');
        if(IS_AJAX){
            $this->ajaxReturn($Staff->getOne(
                I('post.id')
            ));
        }else{
            $this->Error('非法操作');
        }
    }
    //根据id更新记录
    public function update(){
      $Staff=D('Staff');
      if(IS_AJAX){
          $this->ajaxReturn($Staff->update(
              I('post.id'),I('post.gender'),I('post.intro'),I('post.details')
          ));
      }else{
          $this->getError('非法操作');
      }
  }
    //加载数据列表
    public function getNotRelationList(){
        if(IS_AJAX){
            $Staff=D('Staff');
            $this->ajaxReturn($Staff->getNotRelationList(
                I('post.page'),I('post.rows'),I('post.sort'),I('post.order')
            ));
        }else{
            $this->error('非法操作');
        }
    }
    //获取详情
    public function getDetails(){
        $Staff=D('Staff');
        if(IS_AJAX){
            $this->assign('object',$Staff->getDetails(I('get.id')));
            $this->display('details');
        }else{
            $this->Error('非法操作');
        }
    }
}
