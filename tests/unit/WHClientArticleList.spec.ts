import { shallowMount } from "@vue/test-utils";
import WHClientArticleList from "../../src/components/WHClientArticleList.vue";
import { IArticle } from "@/interfaces/WHClientInteraces";
const mockArticleList: IArticle[] = [
  {
    id: "0517f083-0e15-4876-8d1f-6fa45900431c",
    amountRequired: 4,
    name: "Leg",
    amountInStock: 12,
  },
  {
    id: "831b92b8-677b-42cc-a585-335ea4ccccb6",
    amountRequired: 1,
    name: "Seat",
    amountInStock: 2,
  },
  {
    id: "addc65a8-c759-41d8-a18a-89fe446ad484",
    amountRequired: 8,
    name: "Screw",
    amountInStock: 17,
  },
];

describe("WHClientArticleList.vue", () => {
  it("Render article list as per provided article data", () => {
    const wrapper = shallowMount(WHClientArticleList, {
      propsData: { articles: mockArticleList },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("Render article list with one article is availability less than requirement", () => {
    mockArticleList[0].amountInStock = mockArticleList[0].amountRequired - 1;
    const wrapper = shallowMount(WHClientArticleList, {
      propsData: { articles: mockArticleList },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
