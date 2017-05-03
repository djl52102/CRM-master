<?php
namespace Home\Model;

use Think\Model;

class StaffModel extends Model{
    //获取数据列表
    public function getList($page,$rows,$sort,$order,$keywords,$dateType,$dateFrom,$dateTo,$gender,$id_card,$entry_Status,$maritalStatus,$education,$type,$nation,$post)
    {
        //搜索
        $map=$keywords_map=array();
        if($keywords){
            $keywords_map['name']=array('like','%'.$keywords.'%');
            $keywords_map['number']=array('like','%'.$keywords.'%');
            $keywords_map['tel']=array('like','%'.$keywords.'%');
            $keywords_map['_logic']='or';

            if(!empty($keywords_map)){
                $map['_complex']=$keywords_map;
            }

        };
        if($dateFrom && $dateTo){
            $map["$dateType"]=array(array('egt',$dateFrom),array('elt',$dateTo));
        }else if($dateFrom){
            $map["$dateType"]=array('egt',$dateFrom);
        }else if($dateTo){
            $map["$dateType"]=array('elt',$dateTo);
        };

        //组入SQL
        if($gender){
            $map['gender']=$gender;
        };
        if($id_card){
            $map['id_card']=$id_card;
        };
        if($entry_Status){
            $map['entry_status']=$entry_Status;
        };
        if($maritalStatus){
            $map['marital_status']=$maritalStatus;
        };
        if($education){
        $map['education']=$education;
       };
        if($type){
            $map['type']=$type;
        };
        if($nation){
            $map['nation']=$nation;
        };
        if($post){
            $map['post']=$post;
        };

        $object=$this->field('id,number,user_id,name,gender,type,id_card,post,tel,nation,marital_status,entry_status,entry_date,politics_status,education,create_time')
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
    public function register($number,$name,$gender,$id_card,$tel,$type,$nation,$marital_status,$entry_status,$entry_date,$politic_status,$education,$intro,$post,$details){
        $addData=array(
            'number'=>$number,
            'name'=>$name,
            'gender'=>$gender,
            'id_card'=>$id_card,
            'tel'=>$tel,
            'type'=>$type,
            'nation'=>$nation,
            'marital_status'=>$marital_status,
            'entry_status'=>$entry_status,
            'entry_date'=>$entry_date,
            'politics_status'=>$politic_status,
            'education'=>$education,
            'create_time'=>getTime(),
            'post'=>$post
        );
        if($this->create($addData)){
            $id=$this->add($addData);
            if($id){
                //向附表添加
                M('StaffExtend')->add(Array(
                    'staff_id' =>$id,
                    'intro'    =>$intro,
                    'details'  =>$details,
                ));
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
        $affectRow=$this->delete($ids);
        if($affectRow){
            $map['staff_id']=$ids;
            M('StaffExtend')->where($map)->delete();
        }
        return $affectRow;
    }
    //根据Id获取一条数据
    public function getOne($id){
        //主表id
        $map['crm_staff.id']=$id;
        //主附表左连接
        $object=$this->field('crm_staff.id,user_id,post,number,crm_staff.name,crm_staff.gender,crm_staff_extend.intro,crm_staff_extend.details')
                    ->join('crm_staff_extend ON crm_staff.id=crm_staff_extend.staff_id','LEFT')
                    ->where($map)
                    ->find();
        $object['details']=html_entity_decode($object['details']);
        return $object;
    }
    //根据id修改一条记录
    public function update($id,$gender,$intro,$details){
        $updateData=array(
            'id'=>$id,
            'gender'=>$gender
        );
        if($this->create($updateData)){
            //修改主表
            $affectRows=$this->save($updateData);
            //修改副表
            $map['staff_id']=$id;
            $extendAffectRow=M('staff_extend')->where($map)->save(array(
                'intro'=>$intro,
                'details'=>$details
            ));
            return $affectRows || $extendAffectRow;
        }else{
            return $this->getError();
        }
    }
    //获取数据列表
    public function getNotRelationList($page,$rows,$sort,$order)
    {
        $map['user_id']=0;
        $object=$this->field('id,number,name,gender,id_card,post,create_time')
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
        $object=$this->getOne($id);
        $map['id']=$object['user_id'];
        $object['user']=M('User')->field('accounts,state')->where($map)->find();
        return $object;
    }
}