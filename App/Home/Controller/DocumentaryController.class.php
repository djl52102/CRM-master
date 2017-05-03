<?php
namespace Home\Controller;
class DocumentaryController extends HomeController{
    //加载数据列表
    public function getList(){
        if(IS_AJAX){
            $Documentary=D('Documentary');
            $this->ajaxReturn($Documentary->getList(
                I('post.page'),I('post.rows'),I('post.sort'),I('post.order'),I('post.keywords'),I('post.dateType'),
                I('post.dateFrom'),I('post.dateTo'),I('post.neg')
            ));
        }else{
            $this->error('非法操作');
        }
    }
    //新增数据
    public function register(){
        if(IS_AJAX){
            $Documentary=D('Documentary');
            echo $Documentary->register(I('post.client_id'),I('post.staff_id'),I('post.title'),I('post.client_company'),I('post.staff_name'),
            I('post.way'),I('post.evolve'),I('post.remark'));
        }else{
            $this->getError('非法操作');
        }
    }
    //根据id获取一条数据
    public function getOne(){
        if(IS_AJAX){
            $Documentary=D('Documentary');
            $this->ajaxReturn($Documentary->getOne(I('post.id'))) ;
        }else{
            $this->getError('非法操作');
        }
    }
    //根据id更新一条数据
    public function update(){
        if(IS_AJAX){
            $Documentary=D('Documentary');
            $this->ajaxReturn($Documentary->update(I('post.id'),I('post.company'),I('post.name'),I('post.title'),I('post.way'),I('post.evolve'),
                I('post.remark')));
        }else{
            $this->getError('非法操作');
        }
    }
    //根据id集合删除数据
    public function remove(){
        if(IS_AJAX){
            $Documentary=D('Documentary');
            echo $Documentary->remove(I('post.ids'));
        }else{
            $this->getError('非法操作');
        }
    }
}