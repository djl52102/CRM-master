<?php
namespace Home\Controller;

use Think\Controller;

class TestController extends Controller{
    public function index(){
        echo sha1(123456);
       $this->display();
    }

}