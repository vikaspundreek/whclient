<template>
  <div id="app" class="wh-client">
    <WHClientTabsContainer
      :tabs="config.tabs"
      :current-tab="currentTab"
      @onTabClick="(tabId) => onTabClick(tabId)"
    />
    <WHClientInventoryContainer
      v-if="currentTab === config.tabs[0].id && !isLoading"
      :store="store"
      @retryLoad="fetchData()"
    />
    <WHClientSalesContainer
      v-if="currentTab === config.tabs[1].id && !isLoading"
      :store="store"
      @retryLoad="fetchData()"
      @reloadData="fetchData(true)"
    />
    <WHClientLoader :is-loading="isLoading" />
  </div>
</template>

<style lang="scss">
@import "./styles/index.scss";
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WHClientTabsContainer from "./containers/WHClientTabsContainer.vue";
import WHClientSalesContainer from "./containers/WHClientSalesContainer.vue";
import WHClientInventoryContainer from "./containers/WHClientInventoryContainer.vue";
import { WH_CONFIG } from "./constants/WHClientConstants";
import { IStore, IWHConfig } from "./interfaces/WHClientInteraces";
import { wHClientApiService } from "./services/WHClientApiService";
import WHClientLoader from "./components/WHClientLoader.vue";

@Component({
  components: {
    WHClientTabsContainer,
    WHClientSalesContainer,
    WHClientInventoryContainer,
    WHClientLoader,
  },
})
export default class App extends Vue {
  private config: IWHConfig = WH_CONFIG;
  private store: IStore = { products: [], sales: [], articles: [] };
  private isLoading = false;
  private currentTab: string = this.config.tabs[0].id;

  mounted():void {
    this.fetchData(true);
  }

  private async fetchData(isFullReload: boolean) {
    this.isLoading = true;
    try {
      this.store.articles =
        this.store.articles.length && !isFullReload
          ? this.store.articles
          : await wHClientApiService.getArticles();

      this.store.products =
        this.store.products.length && !isFullReload
          ? this.store.products
          : await wHClientApiService.getProducts();

      this.store.products = wHClientApiService.updateProductStock(
        this.store.products,
        this.store.articles
      );
      console.log(this.store.sales);
      this.store.sales =
        this.store.sales?.length && !isFullReload
          ? this.store.sales
          : await wHClientApiService.getSales();

      this.store.sales = wHClientApiService.updateProductName(
        this.store.sales,
        this.store.products
      );
      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
    }
  }

  onTabClick(tabId: string): void {
    if (!this.isLoading) {
      this.currentTab = tabId;
    }
  }
}
</script>
