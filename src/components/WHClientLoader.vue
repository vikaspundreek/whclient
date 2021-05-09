<template>
  <div v-if="isLoading" class="pt-5 text-center">
    <span
      class="spinner-border text-primary"
      role="status"
      aria-hidden="true"
    ></span>
    Loading...
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class WHClientLoader extends Vue {
  @Prop() private isLoading!: boolean;
}
</script>
