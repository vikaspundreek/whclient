<template>
  <div>
    <b-modal
      v-model="openModal"
      ref="addSalesModal"
      hide-footer
      title="Register a sale"
      @hide="onSaleCancel"
    >
      <div class="d-block">
        <h6>Select a product</h6>
        <select
          v-model="selectedProductId"
          class="form-control"
          ref="productList"
        >
          <option
            v-for="product in products"
            :key="product.index"
            :value="product.id"
          >
            {{ product.name }}({{ product.stock }})
          </option>
        </select>
        <input
          v-model="amountSold"
          class="form-control mt-4"
          type="number"
          value="0"
          min="1"
          :max="maxProductToOrder"
        />
      </div>
      <div v-if="!orderAmountValid" class="text-danger mt-2">
        Should select order amount less or equal to {{ maxProductToOrder }}
      </div>
      <div v-if="inProgress" class="mt-5 text-right">
        <b-button
          :disabled="!orderAmountValid"
          class="mt-3"
          variant="primary"
          @click="onSaleSubmit"
          >Submit</b-button
        >
        <b-button class="mt-3 ml-3" variant="secondary" @click="onSaleCancel"
          >Cancel</b-button
        >
      </div>
      <div v-if="isSuccess" class="mt-5 text-left">
        Sale has been added successfully.
        <b-button class="ml-3" variant="secondary" @click="onSaleCancel"
          >Close</b-button
        >
      </div>
      <div v-if="isFailure" class="mt-5 text-left">
        Something went wrong please try again
        <b-button class="ml-3" variant="primary" @click="onSaleSubmit"
          >Retry</b-button
        >
        <b-button class="ml-3" variant="secondary" @click="onSaleCancel"
          >Close</b-button
        >
      </div>
    </b-modal>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IProduct } from "../interfaces/WHClientInteraces";
import { BButton, BModal } from "bootstrap-vue";
import { WHClientProcessStatus } from "../enums/WHClientEnums";

@Component({
  components: {
    BModal,
    BButton,
  },
})
export default class WHClientRegisterSale extends Vue {
  @Prop() private products!: IProduct[];
  @Prop() saleRegistrationStatus!: string;
  private selectedProductId = this.products[0].id;
  private amountSold = 1;

  onSaleSubmit(): void {
    if (this.orderAmountValid) {
      this.$emit("onSaleSubmit", this.selectedProduct, this.amountSold);
    }
  }

  onSaleCancel(): void {
    this.$emit("onSaleModalCancel");
  }

  get maxProductToOrder(): number {
    return this.selectedProduct ? this.selectedProduct.stock : 0;
  }

  get selectedProduct(): IProduct {
    return this.products.find(
      (product) => product.id === this.selectedProductId
    );
  }

  get orderAmountValid(): boolean {
    return this.maxProductToOrder && this.amountSold <= this.maxProductToOrder;
  }

  get openModal(): boolean {
    return this.saleRegistrationStatus !== WHClientProcessStatus.NONE;
  }

  get inProgress(): boolean {
    return this.saleRegistrationStatus === WHClientProcessStatus.IN_PROGRESS;
  }

  get isSuccess(): boolean {
    return this.saleRegistrationStatus === WHClientProcessStatus.SUCCESS;
  }

  get isFailure(): boolean {
    return this.saleRegistrationStatus === WHClientProcessStatus.FAILURE;
  }
}
</script>
