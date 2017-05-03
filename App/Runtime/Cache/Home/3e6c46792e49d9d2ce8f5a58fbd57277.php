<?php if (!defined('THINK_PATH')) exit();?><table class="details-table" style="max-width: 780px;">
  <tbody>
  <tr>
    <td class="label">产品名称：</td>
    <td class="content"><?php echo ($object["name"]); ?></td>
    <td class="label">产品编号：</td>
    <td class="content"><?php echo ($object["sn"]); ?></td>
  </tr>
  <tr>
    <td class="label">采购价格：</td>
    <td class="content"><?php echo ($object["pro_price"]); ?></td>
    <td class="label">库存：</td>
    <td class="content"><?php echo ($object["inventory"]); ?></td>
  </tr>
  <tr>
    <td class="label">入库总量：</td>
    <td class="content"><?php echo ($object["inventory_in"]); ?></td>
    <td class="label">入库数量：</td>
    <td class="content"><?php echo ($object["number"]); ?></td>
  </tr>
  <tr>
    <td class="label">经办人：</td>
    <td class="content"><?php echo ($object["staff_name"]); ?></td>
    <td class="label">入库模式：</td>
    <td class="content"><?php echo ($object["mode"]); ?></td>
  </tr>
  <tr>
      <td class="label">入库说明：</td>
      <td class="content"><?php echo ($object["mode_explain"]); ?></td>
      <td class="label">操作员：</td>
      <td class="content"><?php echo ($object["enter"]); ?></td>
  </tr>
  </tbody>
</table>