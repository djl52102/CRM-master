<?php
namespace Home\Model;
use Think\Model;

class DocumentaryModel extends Model{
    //获取数据列表
    public function getList($page,$rows,$sort,$order,$keywords,$dateType,$dateFrom,$dateTo,$neg=false){
        //搜索
        $map=$keywords_map=array();
        if($keywords){
            $keywords_map['sn']=array('like','%'.$keywords.'%');
            $keywords_map['client_company']=array('like','%'.$keywords.'%');
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

        if($neg){
            $map['evolve']='谈判中';
        }

        $object=$this->field('id,sn,title,client_company,staff_name,way,evolve,enter,remark,create_time')
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
    public function register($client_id,$staff_id,$title,$client_company,$staff_name,$way,$evolve,$remark){
        $addData=array(
            'client_id'=>$client_id,
            'staff_id'=>$staff_id,
            'sn'=>getTime_String(),
            'title'=>$title,
            'client_company'=>$client_company,
            'staff_name'=>$staff_name,
            'way'=>$way,
            'evolve'=>$evolve,
            'remark'=>$remark,
            'enter'=>session('admin')['accounts'],
            'create_time'=>getTime()
        );

        if($this->create($addData)){
           $id= $this->add($addData);
            return $id?$id:0;
        }else{
            $this->getError();
        }
    }
    //根据id获取一条数据
    public function getOne($id){
        $map['id']=$id;
        $object=$this->where($map)->field('id,title,client_company,staff_name')
            ->find();
        return $object;
    }
    //根据id更新一条数据
    public function update($id,$company,$name,$title,$way,$evolve,$remark){
        $updateData=array(
            'id'=>$id,
            'client_company'=>$company,
            'staff_name'=>$name,
            'title'=>$title,
            'way'=>$way,
            'evolve'=>$evolve,
            'remark'=>$remark,
            'enter'=>session('admin')['accounts'],
            'create_time'=>getTime()
        );
        if($this->create($updateData)){
            $id=$this->save($updateData);
            return $id?$id:0;
        }else{
            $this->getError();
        }
    }

    //删除数据
    public function remove($ids){
        return $this->delete($ids);
    }
}