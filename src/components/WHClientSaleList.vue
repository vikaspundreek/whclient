<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Product</th>
        <th scope="col" class="text-right">Amount</th>
        <th scope="col">Date</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="wh-client__article pt-2"
        v-for="sale in sales"
        :key="sale.index"
      >
        <td>{{ sale.id }}</td>
        <td :title="sale.productId">{{ sale.productName }}</td>
        <td class="text-right">{{ sale.amountSold }}</td>
        <td>{{ getSaleDate(sale) }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ISale } from "../interfaces/WHClientInteraces";

@Component
export default class WHClientSaleList extends Vue {
  @Prop() private sales!: ISale[];
  private getSaleDate(sale: ISale) {
    return new Date(Date.parse(sale.createdAt)).toDateString();
  }
}
</script>
