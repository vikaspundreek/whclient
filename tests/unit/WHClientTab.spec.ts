import { shallowMount } from "@vue/test-utils";
import WHClientTab from "@/components/WHClientTab.vue";

describe("WHClientTab.vue", () => {
  const tabLabel = "Inventory";
  it("renders tab with correct title and active true state", () => {
    const wrapper = shallowMount(WHClientTab, {
      propsData: { tabLabel, isActive: true },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("renders tab with correct title and active false state", () => {
    const wrapper = shallowMount(WHClientTab, {
      propsData: { tabLabel, isActive: false },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("should emit onTabClick with correct param when clicked on non active tab", () => {
    const wrapper = shallowMount(WHClientTab, {
      propsData: { tabLabel, isActive: false },
    });
    wrapper.find(".wh-client__tab").trigger("click");
    expect(wrapper.emitted("onTabClick")).not.toBe(undefined);
  });
  it("should not emit onTabClick when clicked on active tab", () => {
    const wrapper = shallowMount(WHClientTab, {
      propsData: { tabLabel, isActive: true },
    });
    wrapper.find(".wh-client__tab").trigger("click");
    expect(wrapper.emitted("onTabClick")).toBe(undefined);
  });
});
