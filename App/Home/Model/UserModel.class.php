<?php
namespace Home\Model;

use Think\Model;

class UserModel extends Model{
    //自动验证
    protected  $_validate=array(
        //帐号2-20位之间
        array('accounts','2,20','职位名称长度不合法',self::EXISTS_VALIDATE,'length',self::MODEL_INSERT),
        //帐号被占用
        array('accounts','','帐号被占用',self::EXISTS_VALIDATE,'unique',self::MODEL_INSERT),
        //新增密码6-30位之间
        array('password','6,30','密码长度应在6-30位之间',self::EXISTS_VALIDATE,'length',self::MODEL_INSERT),
        //修改密码6-30位，可以为空
        array('password','6,30','密码长度应在6-30位之间',self::VALUE_VALIDATE,'length',self::MODEL_UPDATE),
        //验证确认密码
        array('notpassword','password','两次密码必须一致',self::EXISTS_VALIDATE,'confirm',self::MODEL_INSERT),
        //登录验证:帐号2-20位之间
        array('accounts','2,20','帐号长度不合法',self::EXISTS_VALIDATE,'length',4),
        //登录验证:密码6-30位之间
        array('password','6,30','密码长度不合法',self::EXISTS_VALIDATE,'length',4),
    );
    //获取数据列表
    public function getList($page,$rows,$sort,$order,$keywords,$dateType,$dateFrom,$dateTo,$state){
        //搜索
        $map=array();
        if($keywords){
            $map['accounts']=array('like','%'.$keywords.'%');
        }
        if($dateFrom && $dateTo){
            $map["$dateType"]=array(array('egt',$dateFrom),array('elt',$dateTo));
        }else if($dateFrom){
            $map["$dateType"]=array('egt',$dateFrom);
        }else if($dateTo){
            $map["$dateType"]=array('elt',$dateTo);
        }
        //将审核状态注入sql
        if($state){
            $map['state']=$state;
        }

        $object=$this->field('   crm_user.id,
                                    crm_user.accounts,
                                    crm_user.last_login_time,
                                    crm_user.last_login_ip,
                                    crm_user.login_count,
                                    crm_user.state,
                                    crm_user.create_time,
                                    crm_staff.name,
                                    crm_staff.post')
            ->join('    crm_staff ON crm_staff.id=crm_user.staff_id', 'LEFT')
            ->order(array($sort=>$order))
            ->limit($rows*($page-1),$rows)
            ->select();

        return array(
            'total'=>$this->count(),
            'rows'=>$object?$object:''
        );
    }
    //新增操作
    public function register($accounts,$password,$notpassword='',$staff_id,$staff_name,$state='',$not=0){
        $addData=array(
            'accounts'=>$accounts,
            'password'=>$password,
            'notpassword'=>$notpassword,
            'staff_name'=>$staff_name,
            'state'=>$state?$state:'正常',
            'create_time'=>getTime()
        );
        //没有确认密码,直接设置unset不验证
        if($not==0){
            unset($addData['notpassword']);
        }
        if($this->create($addData)){
            $addData['password']=sha1($password);
            $id=$this->add($addData);
            if($staff_id){
                $map['id']=$staff_id;
                M('staff')->where($map)->save(array(
                    'user_id'=>$id
                ));
                return $id;
            }else{
                return 0;
            }
        }else {
            if ($this->getError() == '帐号被占用')
            {
                return -1;
            }
            return $this->getError();
        }
    }


    //根据id获取一条记录
    public function getOne($id){
        $map['id']=$id;
        return $this->field('id,accounts,state')->where($map)->find();
    }

    //根据id修改一条记录
    public function update($id,$password,$state,$staff_id,$staff_name){
        $updateData=array(
            'id'=>$id,
            'password'=>$password,
            'state'=>$state,
        );
        if($this->create($updateData)){
            if(empty($password)){
                unset($updateData['password']);
            }else{
                $updateData['password']=sha1($password);
            }
            if(is_numeric($staff_id)){
                $updateData['staff_name']=$staff_name;
                //原本的至清零
                M('Staff')->where('user_id='.$id)->setField('user_id',0);
                //现在的赋值
                M('Staff')->where('id='.$staff_id)->setField('user_id',$id);
            }
            $id=$this->save($updateData);
            return $id ? $id : 0;
        }
    }
    //根据Id集合删除数据
    public function remove($ids){
        $map['user_id']=array('in',$ids);
        //删除前解除绑定
        M('Staff')->where($map)->setField('user_id',0);
        return $this->delete($ids);
    }
    //审核状态
    public function state($id,$state){
        $stateData=array(
            'id'=>$id,
            'state'=>$state
        );
        return $this->save($stateData);
    }
    //验证帐号密码
    public function checkUser($accounts,$password){
        $checkData=array(
            'accounts'=>$accounts,
            'password'=>$password
        );
        if($this->create($checkData,4)){
                $map=array(
                    'accounts'=>$accounts,
                    'password'=>sha1($password)
                );
                $object=$this->field('id,accounts,state')
                    ->where($map)
                    ->find();
                if($object){
                    //验证状态，冻结返回-1
                    if($object['state']=='冻结'){
                        return -1;
                    }
                    //登录成功，写入session
                    session('admin',array(
                        'id'=>$object['id'],
                        'accounts'=>$object['accounts']
                    ));
                    //刷新登录信息
                    $loginUpdate=array(
                        'id'=>$object['id'],
                        'last_login_time'=>getTime(),
                        'last_login_ip'=>get_client_ip(),
                        'login_count'=>array('exp','login_count+1')
                    );
                    //保存更新
                    $this->save($loginUpdate);
                    return $object['id'];
                }else{
                    //验证失败返回0
                    return 0;
                }
        }else{
            return $this->getError();
        };
    }
    //根据id修改密码
    public function editPassword($id,$password,$notpassword){
        $updateData=array(
            'id'=>$id,
            'password'=>$password,
            'notpassword'=>$notpassword,
        );
        if($this->create($updateData)){
            $updateData['password']=sha1($password);
            $id=$this->save($updateData);
            return $id ? $id : 0;
        }
    }
}