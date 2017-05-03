<?php
namespace Home\Model;
use Think\Model;

class ProductModel extends Model{
    //获取数据列表
    public function getList($page,$rows,$sort,$order,$keywords,$dateType,$dateFrom,$dateTo,$type,$alarm=false){
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

        //组入sql
        if($type){
            $map['type']=$type;
        }
        //当库存低于或等于警报值，筛选
        if($alarm){
            $map['_string']='`inventory`<=`inventory_alarm`';
        }

        $object=$this->field('id,sn,name,type,unit,pro_price,sell_price,inventory,inventory_in,inventory_out,inventory_alarm,create_time')
            ->where($map)
            ->order(array($sort=>$order))
            ->limit($rows*($page-1),$rows)
            ->select();

        return array(
            'total'=>$this->count(),
            'rows'=>$object?$object:''
        );
    }
    //根据Id集合删除数据
    public function remove($ids){
        return $this->delete($ids);
    }
    //新增操作
    public function register($name,$sn,$type,$unit,$pro_price,$sell_price,$inventory_alarm,$details){
        $addData=array(
            'name'=>$name,
            'sn'=>$sn,
            'type'=>$type,
            'unit'=>$unit,
            'pro_price'=>$pro_price?$pro_price:0,
            'sell_price'=>$sell_price?$sell_price:0,
            'inventory_alarm'=>$inventory_alarm?$inventory_alarm:10,
            'create_time'=>getTime()
        );
        if($this->create($addData)){
            $id=$this->add($addData);
            if($id){
                M('Product_extend')->add(array(
                    'product_id'=>$id,
                    'details'=>$details
                ));
                return $id;
            }else{
                return 0;
            }
        }else {
            return $this->getError();
        }
    }
    //根据Id获取一条数据
    public function getOne($id){
        //主表id
        $map['crm_product.id']=$id;
        //主附表左连接
        $object=$this->field('crm_product.id,crm_product.sn,crm_product.name,crm_product.type,crm_product.unit,crm_product.pro_price,crm_product.sell_price,crm_product.inventory_alarm,crm_product_extend.details')
            ->join('crm_product_extend ON crm_product.id=crm_product_extend.product_id','LEFT')
            ->where($map)
            ->find();
        $object['details']=html_entity_decode($object['details']);
        return $object;
    }
   //根据id修改一条记录
    public function update($id,$sn,$name,$type,$unit,$pro_price,$sell_price,$inventory_alarm,$details){
        $updateData=array(
            'id'=>$id,
            'sn'=>$sn,
            'name'=>$name,
            'type'=>$type,
            'unit'=>$unit,
            'pro_price'=>$pro_price,
            'sell_price'=>$sell_price,
            'inventory_alarm'=>$inventory_alarm
        );
        if($this->create($updateData)){
            //修改主表
            $affectRows=$this->save($updateData);
            //修改副表
            $map['product_id']=$id;
            $extendAffectRow=M('product_extend')->where($map)->save(array(
                'details'=>$details
            ));
            return $affectRows || $extendAffectRow;
        }else{
            return $this->getError();
        }
    }
    //获取详情
    public function getDetails($id){
        $map['crm_product.id']=$id;
        $object=$this->field('crm_product.id,crm_product.name,crm_product.sn,crm_product.type,crm_product.pro_price,crm_product.sell_price,
        crm_product.unit,crm_product.inventory,crm_product.inventory_alarm,crm_product.inventory_in,crm_product.inventory_out,crm_product.create_time,crm_product_extend.details')
        ->join('crm_product_extend ON crm_product.id=crm_product_extend.product_id','LEFT')
       ->where($map)
      ->find();
        $object['details']=html_entity_decode($object['details']);
        return $object;
    }
}

