<table class="details-table" style="max-width: 780px;">
  <tbody>
  <tr>
    <td class="label">产品名称：</td>
    <td class="content">{$object.name}</td>
    <td class="label">产品编号：</td>
    <td class="content">{$object.sn}</td>
  </tr>
  <tr>
    <td class="label">产品类型：</td>
    <td class="content">{$object.type}</td>
    <td class="label">计量单位：</td>
    <td class="content">{$object.unit}</td>
  </tr>
  <tr>
    <td class="label">采购价格：</td>
    <td class="content">{$object.pro_price}</td>
    <td class="label">出售价格：</td>
    <td class="content">{$object.sell_price}</td>
  </tr>
  <tr>
    <td class="label">库存：</td>
    <td class="content">{$object.inventory}</td>
    <td class="label">库存警报：</td>
    <td class="content">{$object.inventory_alarm}</td>
  </tr>
  <tr>
      <td class="label">入库总量：</td>
      <td class="content">{$object.inventory_in}</td>
      <td class="label">出库总量：</td>
      <td class="content">{$object.inventory_out}</td>
  </tr>
  <tr>
      <td class="label">创建时间:</td>
      <td class="content" colspan="3">{$object.create_time}</td>
  </tr>
  <tr>
      <td class="label">详情:</td>
      <td class="content" colspan="3">{$object.details}</td>
  </tr>
  </tbody>
</table>