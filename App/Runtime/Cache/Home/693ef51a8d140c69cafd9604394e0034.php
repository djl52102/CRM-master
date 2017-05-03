<?php if (!defined('THINK_PATH')) exit();?><table class="details-table" style="max-width: 780px;">
  <tbody>
  <tr>
    <td class="label">订单编号：</td>
    <td class="content"><?php echo ($object["sn"]); ?></td>
    <td class="label">标题：</td>
    <td class="content"><?php echo ($object["title"]); ?></td>
  </tr>
  <tr>
    <td class="label">原价：</td>
    <td class="content"><?php echo ($object["original"]); ?></td>
    <td class="label">总价：</td>
    <td class="content"><?php echo ($object["cost"]); ?></td>
  </tr>
  <tr>
    <td class="label">订单状态：</td>
    <td class="content"><?php echo ($object["pay_state"]); ?></td>
    <td class="label">录入员：</td>
    <td class="content"><?php echo ($object["enter"]); ?></td>
  </tr>
  <tr>
    <td class="label">关联公司：</td>
    <td class="content"><?php echo ($object["client_company"]); ?></td>
    <td class="label">跟单员：</td>
    <td class="content"><?php echo ($object["staff_name"]); ?></td>
  </tr>
  <tr>
    <td class="label">详情：</td>
    <td class="content"><?php echo ($object["details"]); ?></td>
  </tr>
  </tbody>
</table>
<table class="details-table" style="max-width:780px;">
    <tbody>
    <tr>
        <td class="label" style="text-align:center;">产品编号</td>
        <td class="label" style="text-align:center;">产品名称</td>
        <td class="label" style="text-align:center;">销售价格</td>
        <td class="label" style="text-align:center;">出货量</td>
        <td class="label" style="text-align:center;">状态</td>
        <td class="label" style="text-align:center;">出货时间</td>
    </tr>
    <?php if(is_array($object["outlib"])): $i = 0; $__LIST__ = $object["outlib"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$obj): $mod = ($i % 2 );++$i;?><tr>
            <td class="label" style="text-align:center;"><?php echo ($obj["sn"]); ?></td>
            <td class="label" style="text-align:center;"><?php echo ($obj["name"]); ?></td>
            <td class="label" style="text-align:center;"><?php echo ($obj["sell_price"]); ?></td>
            <td class="label" style="text-align:center;"><?php echo ($obj["number"]); ?></td>
            <td class="label" style="text-align:center;"><?php echo ($obj["state"]); ?></td>
            <td class="label" style="text-align:center;"><?php echo ($obj["dispose_time"]); ?></td>
        </tr><?php endforeach; endif; else: echo "" ;endif; ?>
    </tbody>
</table>