<?php
namespace Home\Model;
use Think\Model;

class InlibModel extends Model{
    //新增操作
    public function register($id,$number,$staff,$mode,$mode_explain){
        $addData=array(
            'product_id'=>$id,
            'number'=>$number,
            'staff_name'=>$staff,
            'mode'=>$mode,
            'mode_explain'=>$mode_explain,
            'enter'=>session('admin')['accounts'],
            'create_time'=>getTime()
        );
        if($this->create($addData)){
            $product_id=$this->add($addData);
            $map['id']=$id;
            M('Product')->where($map)->save(array(
                'inventory'=>array('exp','inventory+'.$number),
                'inventory_in'=>array('exp','inventory_in+'.$number)
            ));
            return $product_id?$product_id:0;
        }else {
            return $this->getError();
        }
    }
    //获取数据列表
    public function getList($page,$rows,$sort,$order,$keywords,$dateType,$dateFrom,$dateTo,$produce=false){
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

        if($produce) {
            $map['mode'] = '采购';
        }

        $object=$this->field('crm_inlib.id,crm_inlib.number,crm_inlib.staff_name,crm_inlib.mode,crm_inlib.mode_explain
        ,crm_inlib.enter,crm_inlib.create_time,crm_product.sn,crm_product.name,crm_product.type,crm_product.pro_price,crm_product.sell_price')
            ->join('crm_product ON crm_inlib.product_id=crm_product.id','LEFT')
            ->where($map)
            ->order(array($sort=>$order))
            ->limit($rows*($page-1),$rows)
            ->select();

        return array(
            'total'=>$this->count(),
            'rows'=>$object?$object:''
        );
    }
    //获取详情
    public function getDetails($id){
        $map['crm_inlib.id']=$id;
        $object=$this->field('crm_inlib.id,crm_inlib.number,crm_inlib.staff_name,crm_inlib.mode,crm_inlib.mode_explain,crm_inlib.enter,crm_product.sn,crm_product.name,
        crm_product.inventory,crm_product.inventory_in,crm_product.pro_price')
            ->join('crm_product ON crm_inlib.product_id=crm_product.id','LEFT')
            ->where($map)
            ->find();
        return $object;
    }
}