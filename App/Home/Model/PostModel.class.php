<?php
namespace Home\Model;

use Think\Model;

class PostModel extends Model{
    //自动验证
    protected  $_validate=array(
        //2-20位之间
        array('name','2,20','职位名称长度不合法',self::VALUE_VALIDATE,'length',self::MODEL_BOTH),
        //职位被占用
        array('name','','职位被占用',self::VALUE_VALIDATE,'unique',self::MODEL_BOTH),
    );
    //获取数据列表
   public function getList($page,$rows,$sort,$order,$keywords,$dateType,$dateFrom,$dateTo,$all=false){
       if($all){
           return $this->field('name')->select();
       }
       //搜索
       $map=array();
       if($keywords){
           $map['name']=array('like','%'.$keywords.'%');
       }
        if($dateFrom && $dateTo){
            $map["$dateType"]=array(array('egt',$dateFrom),array('elt',$dateTo));
        }else if($dateFrom){
            $map["$dateType"]=array('egt',$dateFrom);
        }else if($dateTo){
            $map["$dateType"]=array('elt',$dateTo);
        }

       $object=$this->field('id,name,create_time')
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
    public function register($name){
        $addData=array(
            'name'=>$name,
            'create_time'=>getTime()
        );
        if($this->create($addData)){
            $id=$this->add($addData);
            return $id ? $id : 0;
        }else{
            if($this->getError()=='职位被占用'){
                return -1;
            }
            return $this->getError();
        }
    }


    //根据id获取一条记录
    public function getOne($id){
        $map['id']=$id;
        return $this->field('id,name')->where($map)->find();
    }

    //根据id修改一条记录
    public function update($id,$name){
        $updateData=array(
            'id'=>$id,
            'name'=>$name,
        );
        if($this->create($updateData)){
            $id=$this->save($updateData);
            return $id ? $id : 0;
        }else{
            if($this->getError()=='产品名称被占用'){
                return -1;
            }
            return $this->getError();
        }
    }
    //根据Id集合删除数据
    public function remove($ids){
        return $this->delete($ids);
    }
}

