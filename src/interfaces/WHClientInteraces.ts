export interface IWHConfig {
  apiEndPoint: string;
  tabs: IWHClientTab[];
}
export interface IWHClientTab {
  id: string;
  label: string;
}

export interface IProduct {
  id: string;
  name: string;
  articles: IArticle[];
  stock?: number;
}

export interface IArticle {
  id: string;
  name?: string;
  amountInStock?: number;
  amountRequired: number;
}

export interface ISale {
  id: string;
  createdAt: string;
  productId: string;
  productName?: string;
  amountSold: number;
}

export interface IStore {
  products: IProduct[];
  articles: IArticle[];
  sales: ISale[] | null;
}

export interface IBulkArticleUpdate {
  id: string;
  amountToSubtract: number;
}
