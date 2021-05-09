<template>
  <div
    class="wh-client__tab nav-link"
    :class="isActive ? 'active' : ''"
    @click="onClick"
  >
    {{ tabLabel }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class WHClientTab extends Vue {
  @Prop() private tabLabel!: string;
  @Prop() private isActive!: boolean;
  onClick(): void {
    !this.isActive && this.$emit("onTabClick");
  }
}
</script>
