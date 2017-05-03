<table class="details-table" style="max-width: 780px;">
  <tbody>
  <tr>
    <td class="label">订单编号：</td>
    <td class="content">{$object.sn}</td>
    <td class="label">标题：</td>
    <td class="content">{$object.title}</td>
  </tr>
  <tr>
    <td class="label">原价：</td>
    <td class="content">{$object.original}</td>
    <td class="label">总价：</td>
    <td class="content">{$object.cost}</td>
  </tr>
  <tr>
    <td class="label">订单状态：</td>
    <td class="content">{$object.pay_state}</td>
    <td class="label">录入员：</td>
    <td class="content">{$object.enter}</td>
  </tr>
  <tr>
    <td class="label">关联公司：</td>
    <td class="content">{$object.client_company}</td>
    <td class="label">跟单员：</td>
    <td class="content">{$object.staff_name}</td>
  </tr>
  <tr>
    <td class="label">详情：</td>
    <td class="content">{$object.details}</td>
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
    <volist name="object.outlib" id="obj">
        <tr>
            <td class="label" style="text-align:center;">{$obj.sn}</td>
            <td class="label" style="text-align:center;">{$obj.name}</td>
            <td class="label" style="text-align:center;">{$obj.sell_price}</td>
            <td class="label" style="text-align:center;">{$obj.number}</td>
            <td class="label" style="text-align:center;">{$obj.state}</td>
            <td class="label" style="text-align:center;">{$obj.dispose_time}</td>
        </tr>
    </volist>
    </tbody>
</table>