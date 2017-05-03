<?php
namespace Home\Model;
use Think\Model;

class ReceiptModel extends Model{
    //获取数据列表
    public function getList($page,$rows,$sort,$order,$keywords,$dateType,$dateFrom,$dateTo){
        //搜索
        $map=$keywords_map=array();
        if($keywords){
            $keywords_map['order_sn']=array('like','%'.$keywords.'%');
            $keywords_map['title']=array('like','%'.$keywords.'%');
            $keywords_map['_logic']='or';

            if(!empty($keywords_map)){
                $map['_complex']=$keywords_map;
            }
        }
        if($dateFrom && $dateTo){
            $map["$dateType"]=array(array('egt',$dateFrom),array('elt',$dateTo));
        }else if($dateFrom){
            $map["$dateType"]=array('egt',$dateFrom);
        }else if($dateTo){
            $map["$dateType"]=array('elt',$dateTo);
        }


        $object=$this->field('id,title,order_sn,cost,enter,remark,create_time')
            ->where($map)
            ->order(array($sort=>$order))
            ->limit($rows*($page-1),$rows)
            ->select();

        return array(
            'total'=>$this->count(),
            'rows'=>$object?$object:''
        );
    }
    //新增数据
    public function register($order_sn,$title,$cost,$remark){
        $addData=array(
            'order_sn'=>$order_sn,
            'title'=>$title,
            'cost'=>$cost,
            'remark'=>$remark,
            'enter'=>session('admin')['accounts'],
            'create_time'=>getTime()
        );

        if($this->create($addData)){
            $id= $this->add($addData);

            //设置订单未付款改为已付款
            $mapOrder['order_sn']=$order_sn;
            $updateOrder=array(
                'pay_state'=>'已付款'
            );

            M('Order')->where($mapOrder)->save($updateOrder);

            //设置出库未处理，改为已付款
            $mapOutlib['order_sn']=$order_sn;
            $updateOutlib=array(
                'state' => '已付款',
            );
            M('Outlib')->where($mapOutlib)->save($updateOutlib);
            return $id?$id:0;
        }else{
            $this->getError();
        }
    }

}