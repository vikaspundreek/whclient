import { mount } from "@vue/test-utils";
import WHClientProductList from "@/components/WHClientProductList.vue";
import { IProduct } from "@/interfaces/WHClientInteraces";

const mockProductData: IProduct[] = [
  {
    id: "a269a247-0d38-4b47-9630-79c9ae545b68",
    name: "Dining Chair",
    articles: [
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
    ],
  },
  {
    id: "6fed6191-ee01-4563-a33d-5010abe0db36",
    name: "Dining Table",
    articles: [
      {
        id: "0517f083-0e15-4876-8d1f-6fa45900431c",
        amountRequired: 4,
        name: "Leg",
        amountInStock: 12,
      },
      {
        id: "6892b98b-9b87-4520-9a9e-7528f1d78cb4",
        amountRequired: 1,
        name: "Table Top",
        amountInStock: 0,
      },
      {
        id: "addc65a8-c759-41d8-a18a-89fe446ad484",
        amountRequired: 8,
        name: "Screw",
        amountInStock: 17,
      },
    ],
  },
];

describe("WHClientProductList.vue", () => {
  it("Render product list as per provided products data with articles with name", () => {
    const wrapper = mount(WHClientProductList, {
      propsData: { products: mockProductData },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("Render product list with one of them having not full article data", () => {
    mockProductData[0].articles[0].name = undefined;
    const wrapper = mount(WHClientProductList, {
      propsData: { products: mockProductData },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
