<template>
  <div class="wh-client__tabs nav-tabs">
    <div class="wh-client__tabs-container nav container">
      <div class="wh-client__title">Warehouse Client</div>
      <WHClientTab
        v-for="tab in tabs"
        :key="tab.index"
        :tab-label="tab.label"
        :is-active="tab.id === currentTab"
        @onTabClick="(id) => $emit('onTabClick', tab.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IWHClientTab } from "../interfaces/WHClientInteraces";
import WHClientTab from "../components/WHClientTab.vue";

@Component({
  components: {
    WHClientTab,
  },
})
export default class WHClientTabsContainer extends Vue {
  @Prop() private tabs!: IWHClientTab[];
  @Prop() currentTab!: string;
}
</script>
