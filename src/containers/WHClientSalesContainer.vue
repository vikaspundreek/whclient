import {WHClientProcessStatus} from "@/enums/WHClientEnums"; import
{WHClientProcessStatus} from "@/enums/WHClientEnums"; import
{WHClientProcessStatus} from "@/enums/WHClientEnums";
<template>
  <div class="wh-client__sales-container container p-2">
    <div class="wh-client__product-list-container pt-4">
      <h4>Sales List</h4>

      <WHClientSaleList
        v-if="store.products.length && store.sales && store.sales.length > 15"
        :sales="store.sales"
      />

      <b-button v-if="store.products.length" @click="showRegistrationModal"
        >Register a Sale</b-button
      >
      <WHClientRegisterSale
        :products="productsWithStock"
        :sale-registration-status="saleRegistrationStatus"
        @onSaleModalCancel="onSaleModalCancel"
        @onSaleSubmit="
          (productId, amountSold) => registerSale(productId, amountSold)
        "
      />

      <div
        v-if="!store.sales || !store.products.length"
        class="wh-client__no-products"
      >
        <h6>Unsuccessful to load sales list data...</h6>
        <b-button variant="primary" @click="$emit('retryLoad')"
          >Try Reload</b-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import WHClientSaleList from "../components/WHClientSaleList.vue";
import { IProduct, IStore } from "../interfaces/WHClientInteraces";
import { wHClientApiService } from "../services/WHClientApiService";
import WHClientRegisterSale from "../components/WHClientRegisterSale.vue";
import { WHClientProcessStatus } from "../enums/WHClientEnums";
import { BButton } from "bootstrap-vue";

@Component({
  components: {
    WHClientSaleList,
    WHClientRegisterSale,
    BButton,
  },
})
export default class WHClientSalesContainer extends Vue {
  @Prop() store!: IStore;
  private saleRegistrationStatus = WHClientProcessStatus.NONE;

  onSaleModalCancel(): void {
    if (this.saleRegistrationStatus === WHClientProcessStatus.SUCCESS) {
      this.$emit("reloadData");
    }
    this.saleRegistrationStatus = WHClientProcessStatus.NONE;
  }

  private async registerSale(product: IProduct, amountSold: number) {
    try {
      await wHClientApiService.registerSale(product.id, amountSold);
      await wHClientApiService.updateArticleStock(product, amountSold);
      this.saleRegistrationStatus = WHClientProcessStatus.SUCCESS;
    } catch (e) {
      this.saleRegistrationStatus = WHClientProcessStatus.FAILURE;
      console.log(e);
    }
  }

  private showRegistrationModal() {
    this.saleRegistrationStatus = WHClientProcessStatus.IN_PROGRESS;
  }

  get productsWithStock(): IProduct[] {
    return this.store.products.filter(
      (product) => product.stock && product.stock > 0
    );
  }
}
</script>
