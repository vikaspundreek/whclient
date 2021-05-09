<template>
  <div class="wh-client__product-list">
    <div
      class="wh-client__product pt-2"
      v-for="product in products"
      :key="product.index"
    >
      <h6>{{ product.name }}</h6>
      <WHClientArticleList
        v-if="articlesDataAvailable(product)"
        :articles="product.articles"
      />
      <p v-else>
        <strong> Articles </strong>: articles detail not available at this
        moment.
      </p>
      <hr />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IArticle, IProduct } from "../interfaces/WHClientInteraces";
import WHClientArticleList from "./WHClientArticleList.vue";

@Component({
  components: { WHClientArticleList },
})
export default class WHClientProductList extends Vue {
  @Prop() private products!: IProduct[];

  private articlesDataAvailable(product: IProduct) {
    return (
      product.articles.length > 0 &&
      product.articles.every((article: IArticle) => article.name !== undefined)
    );
  }
}
</script>
