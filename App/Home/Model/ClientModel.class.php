<?php
namespace Home\Model;
use Think\Model;

class ClientModel extends Model{
    //获取数据列表
    public function getList($page,$rows,$sort,$order,$keywords,$dateType,$dateFrom,$dateTo,$type){
        //搜索
        $map=$keywords_map=array();
        if($keywords){
            $keywords_map['name']=array('like','%'.$keywords.'%');
            $keywords_map['company']=array('like','%'.$keywords.'%');
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


        //组合sql
        if($type){
            $map['source']=$type;
        }


        $object=$this->field('id,company,name,tel,source,enter,create_time')
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
    public function register($company,$name,$tel,$source){
        $addData=array(
            'company'=>$company,
            'name'=>$name,
            'tel'=>$tel,
            'source'=>$source,
            'enter'=>session('admin')['accounts'],
            'create_time'=>getTime()
        );
        if($this->create($addData)){
            $id=$this->add($addData);
            return $id?$id:0;
        }else {
            return $this->getError();
        }
    }
    //根据Id获取一条数据
    public function getOne($id){
        //主表id
        $map['id']=$id;
        //获取一条数据
        $object=$this->field('id,company,name,tel,source')
            ->where($map)
            ->find();
        return $object;
    }
    //根据id更新一条数据
    public function update($id,$company,$name,$tel,$source){
        $updateData=array(
            'id'=>$id,
            'company'=>$company,
            'name'=>$name,
            'tel'=>$tel,
            'source'=>$source
        );
        if($this->create($updateData)){
            $id=$this->save($updateData);
            return $id?$id:0;
        }else{
            $this->getError();
        }
    }
    //根据id删除一条记录
   public function remove($ids){
       return $this->delete($ids);
   }
}