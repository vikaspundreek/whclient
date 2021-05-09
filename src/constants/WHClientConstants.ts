import { IWHConfig } from "../interfaces/WHClientInteraces";
export const WH_CONFIG: IWHConfig = {
  tabs: [
    { id: "inventory", label: "Inventory" },
    { id: "sales", label: "Sales" },
  ],
  apiEndPoint: process.env.VUE_APP_ENDPOINT_URL,
};
