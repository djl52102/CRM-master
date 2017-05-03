<?php
namespace Home\Model;
use Think\Model;

class AuthGroupModel extends Model{
    //获取数据列表
    public function getList($page,$rows,$sort,$order,$keywords,$dateType,$dateFrom,$dateTo){
        //搜索
        $map=$keywords_map=array();
        if($keywords){
            $keywords_map['title']=array('like','%'.$keywords.'%');
            $keywords_map['_logic']='or';
        }

        //将复合SQL组入$map
        if (!empty($keywords_map)) {
            $map['_complex'] = $keywords_map;
        }
        if($dateFrom && $dateTo){
            $map["$dateType"]=array(array('egt',$dateFrom),array('elt',$dateTo));
        }else if($dateFrom){
            $map["$dateType"]=array('egt',$dateFrom);
        }else if($dateTo){
            $map["$dateType"]=array('elt',$dateTo);
        }

        $object=$this->field('id,title,status,rules,create_time')
            ->where($map)
            ->order(array($sort=>$order))
            ->limit($rows*($page-1),$rows)
            ->select();

        foreach($object as $key=>$value){
            $AuthRule=M('AuthRule');
            $mapRules['id']=array('in',$value['rules']);
            $titleArray=$AuthRule->where($mapRules)->field('title')->select();

            $title='';

            foreach($titleArray as $key2=>$value2){
                $title.=$value2['title'].',';
            }
            $object[$key]['rules']=substr($title,0,-1);
        }

        return array(
            'total'=>$this->count(),
            'rows'=>$object?$object:''
        );
    }

    //获得节点名称
    public function getAuthGroup($rules){
        //得到所有节点
        $object = M('AuthRule')->field('id,name AS url,title AS text,iconCls,nid')->select();


        //声明树数组
        $nav=$tree = array();
        //将所有主节点筛选出来
        foreach ($object as $key=>$value)
        {
            if ($value['nid'] == 0)
            {
                $tree[] = $value;
            }
        }
        //将子节点添加到主节点中
        foreach($tree as $treeKey=>$treeValue)
        {
            foreach($object as $objectKey=>$objectValue)
            {
                //得到需要选择的数组
                $rules_array=explode(',',$rules);
                //让权限处于选定状态
                if(in_array($objectValue['id'],$rules_array)){
                    $objectValue['checked']=true;
                }
                if($treeValue['id'] == $objectValue['nid'])
                {
                    $tree[$treeKey]['children'][]=$objectValue;
                }
            }

        }
        //剔除点空导航
        foreach($tree as $treeKey=>$treeValue){
            if($tree[$treeKey]['children']){
                $nav[]=$tree[$treeKey];
            }
        }

        return $nav ;
    }
    //新增操作
    public function register($title,$rule){
        $addData=array(
            'title'=>$title,
            'rules'=>$rule,
            'create_time'=>getTime()
        );
        if($this->create($addData)){
            $id=$this->add($addData);
            if($id){
                return $id;
            }else{
                return 0;
            }
        }
    }
    //删除操作
    public function remove($ids){
        return $this->delete($ids);
    }
    //根据id获取一条记录
    public function getOne($id){
        $map['id']=$id;
        $object=$this->field('id,title,status,rules')->where($map)->find();
        return $object;
    }
    //更新记录
    public function update($id,$rules){
        $updateData=array(
            'id'=>$id,
            'rules'=>$rules
        );
        if($this->create($updateData)){
            $id=$this->save($updateData);
            return $id?$id:0;
        }else{
            $this->getError();
        }
    }
}