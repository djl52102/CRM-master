<?php
namespace Home\Model;
use Think\Model;

class OutlibModel extends Model{
    //获取数据列表
    public function getList($page,$rows,$sort,$order,$keywords,$dateType,$dateFrom,$dateTo){
        //搜索
        $map=$keywords_map=array();
        if($keywords){
            $keywords_map['name']=array('like','%'.$keywords.'%');
            $keywords_map['sn']=array('like','%'.$keywords.'%');
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


        $object=$this->field('crm_outlib.id,crm_outlib.order_sn,crm_product.sn,crm_product.sell_price,crm_outlib.number,crm_outlib.clerk,crm_outlib.enter,crm_outlib.state,crm_outlib.dispose_time,crm_product.create_time')
            ->join('crm_product ON crm_outlib.product_id=crm_product.id','LEFT')
            ->where($map)
            ->order(array($sort=>$order))
            ->limit($rows*($page-1),$rows)
            ->select();

        return array(
            'total'=>$this->count(),
            'rows'=>$object?$object:''
        );
    }

    //出库操作
    public function deliver($ids){
        $map['id']=array('in',$ids);
        $update=array(
            'clerk'  => session('admin')['accounts'],
            'state'  => '已出库',
            'dispose_time'=>getTime()
        );
        return $this->where($map)->save($update);
    }

}