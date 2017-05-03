<?php
namespace Home\Model;
use Think\Model;

class AuthRuleModel extends Model{
    public function getTree($ids)
    {
        //得到的节点
        $map['nid']=0;
        $map['id'] = array('in', $ids);
        $map['_logic']='or';
        $object = $this->field('id,name AS url,title AS text,iconCls,nid')->where($map)->select();


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
}