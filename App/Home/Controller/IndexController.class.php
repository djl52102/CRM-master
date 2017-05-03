<?php
namespace Home\Controller;

use Think\Auth;
use Think\Controller;
class IndexController extends Controller{
    //加载主页面
    public function index()
    {
        if (session('admin'))
        {
            $this->display();
        } else {
            $this->redirect('Login/index');
        }
    }
    //加载导航
    public function getTree(){
        //获取当前权限角色ID
        $Auth = new Auth();
        $groups = $Auth->getGroups(session('admin')['id'])[0]['rules'];

//        //获取当前角色对应的菜单权限的ID
//        $AuthRule = M('AuthRule');
//        $map['id'] = array('in', $groups);
//
//       $object = $AuthRule->field('id')->where($map)->select();
////
////
////        //nav_id
//          $id = '';
////
////        //组合成字符串
//        foreach ($object as $key=>$value) {
//            $id .= $value['id'].',';
//        }

        $this->ajaxReturn(D('AuthRule')->getTree($groups));
    }
}