<template>
  <div class="wh-client__inventory-container container p-2">
    <div class="wh-client__product-list-container pt-4">
      <h4>Product List</h4>
      <WHClientProductList v-if="showProductList" :products="store.products" />
      <div v-else class="wh-client__no-products">
        <h6>Unsuccessful to load product list data...</h6>
        <b-button variant="primary" @click="$emit('retryLoad')"
          >Try Reload</b-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IStore } from "../interfaces/WHClientInteraces";
import WHClientProductList from "../components/WHClientProductList.vue";
import { BButton } from "bootstrap-vue";

@Component({
  components: { WHClientProductList, BButton },
})
export default class WHClientInventoryContainer extends Vue {
  @Prop() store!: IStore;

  get showProductList(): boolean {
    return this.store.products.length > 0 && this.store.articles.length > 0;
  }
}
</script>
