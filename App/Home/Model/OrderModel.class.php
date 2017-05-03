<?php
namespace Home\Model;
use Think\Model;

class OrderModel extends Model{
    //获取数据列表
    public function getList($page,$rows,$sort,$order,$keywords,$dateType,$dateFrom,$dateTo){
        //搜索
        $map=$keywords_map=array();
        if($keywords){
            $keywords_map['crm_order.sn']=array('like','%'.$keywords.'%');
            $keywords_map['crm_order.title']=array('like','%'.$keywords.'%');
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


        $object=$this->field('
                              crm_order.id,
                              crm_order.sn,
                              crm_order.title,
                              crm_order.cost,
                              crm_order.pay_state,
                              crm_order.enter,
                              crm_order.create_time,
                              crm_documentary.client_company,
                              crm_documentary.staff_name
                                ')
            ->join('crm_documentary ON crm_order.documentary_id=crm_documentary.id','LEFT')
            ->where($map)
            ->order(array($sort=>$order))
            ->limit($rows*($page-1),$rows)
            ->select();

        return array(
            'total'=>$this->count(),
            'rows'=>$object?$object:''
        );
    }

    //新增操作
    public function register($doc_id,$sn,$title,$original,$cost,$details,$productList){

        $addData=array(
            'documentary_id'=>$doc_id,
            'sn'=>$sn,
            'title'=>$title,
            'original'=>$original,
            'cost'=>$cost,
            'details'=>$details,
            'enter'=>session('admin')['accounts'],
            'create_time'=>getTime()
        );
        if($this->create($addData)){
            $id=$this->add($addData);
            if($id){
                //附表添加
                M('Order_extend')->add(
                    array(
                        'order_id'=>$id,
                        'details'=>$details
                    )
                );

                //订单产品列表
                foreach($productList['rows'] as $key=>$value){
                    $addOutLib=array(
                        'product_id'=>$value['id'],
                        'order_sn'=>$addData['sn'],
                        'number'=>$value['number'],
                        'state'=>'未处理',
                        'enter'=>session('admin')['accounts'],
                        'create_time'=>getTime()
                    );
                }
                //新增出库
                M('Outlib')->add($addOutLib);

                //减库存
                $productMap['id']=$value['id'];
                $productUpdate=array(
                    //库存减少
                    'inventory'=>array('exp','inventory-'.$value['number']),
                    //添加出库
                    'inventory_out'=>array('exp','inventory_out+'.$value['number'])
                );

                M('Product')->where($productMap)->save($productUpdate);
                //更新跟单状态
                $mapDoc['id']=$doc_id;
                $update=array(
                    'evolve'=>'已完成'
                );
                M('Documentary')->where($mapDoc)->save($update);

                return $id;
            }else{
                return 0;
            }
        }else {
            return $this->getError();
        }
    }

    //根据Id集合删除数据
    public function remove($ids){
        return $this->delete($ids);
    }
    //获取详情
    public function getDetails($id){
        $map['crm_order.id']=$id;
        $object=$this->field('crm_order.id,crm_order.sn,crm_order.title,crm_order.original,crm_order.cost,crm_order.pay_state,crm_order.enter,crm_documentary.client_company,crm_documentary.staff_name')
            ->join('crm_documentary ON crm_order.documentary_id=crm_documentary.id','LEFT')
            ->where($map)
            ->find();
        $mapExtend['crm_order_extend.order_id']=$id;
        $extend=M('Order_extend')->where($mapExtend)->field('details')->find();
        $object['details']=html_entity_decode($extend['details']);

        $outlibMap['crm_outlib.order_sn']=$object['sn'];
        $oublib=M('Outlib')->field('crm_outlib.number,crm_outlib.state,crm_outlib.dispose_time,crm_product.sn,crm_product.name,crm_product.sell_price')
            ->join('crm_product ON crm_outlib.product_id=crm_product.id','LEFT')
            ->where($outlibMap)
            ->select();

        $object['outlib']=$oublib;

        return $object;
    }
}