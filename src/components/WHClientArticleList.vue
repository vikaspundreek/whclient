<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Article Name</th>
        <th scope="col" class="text-right">Required</th>
        <th scope="col" class="text-right">Availability</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="wh-client__article pt-2"
        v-for="article in articles"
        :key="article.index"
      >
        <td>{{ article.name }}</td>
        <td class="text-right">{{ article.amountRequired }}</td>
        <td
          class="text-right wh-client__stock"
          v-html="getAvailability(article)"
        />
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IArticle } from "../interfaces/WHClientInteraces";

@Component
export default class WHClientArticleList extends Vue {
  @Prop() private articles!: IArticle[];
  private getAvailability(article: IArticle) {
    return article.amountInStock &&
      article.amountInStock >= article.amountRequired
      ? `<span class="article-stock">${article.amountInStock}</></span>`
      : '<span class="article-stock article-stock--unavailable">N/A</span>';
  }
}
</script>
