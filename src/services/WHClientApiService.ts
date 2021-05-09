import axios, { AxiosRequestConfig } from "axios";
import { WH_CONFIG } from "../constants/WHClientConstants";
import {
  IArticle,
  IProduct,
  ISale,
  IBulkArticleUpdate,
} from "../interfaces/WHClientInteraces";

class WHClientApiService {
  private getData = async (url: string, params?: any): Promise<any> => {
    const axiosConfig: AxiosRequestConfig = {
      url,
      method: "GET",
      params,
    };
    return await axios.request(axiosConfig);
  };
  private postData = async (url: string, data?: any): Promise<any> => {
    const axiosConfig: AxiosRequestConfig = {
      url,
      method: "POST",
      data,
    };
    return await axios.request(axiosConfig);
  };
  private patchData = async (url: string, data?: any): Promise<any> => {
    const axiosConfig: AxiosRequestConfig = {
      url,
      method: "PATCH",
      data,
    };
    return await axios.request(axiosConfig);
  };

  public getProducts = async (): Promise<IProduct[]> => {
    try {
      const response = await this.getData(WH_CONFIG.apiEndPoint + "/products");
      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  public getArticles = async (): Promise<IArticle[]> => {
    try {
      const response = await this.getData(WH_CONFIG.apiEndPoint + "/articles");
      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  public getSales = async (): Promise<ISale[] | null> => {
    try {
      const response = await this.getData(WH_CONFIG.apiEndPoint + "/sales");
      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  public updateProductName(sales: ISale[] | null, products: IProduct[]) {
    return sales
      ? sales.map((sale) => {
          sale.productName = products.find(
            (product) => product.id === sale.productId
          )?.name;
          return sale;
        })
      : null;
  }

  public updateProductStock(products: IProduct[], articles: IArticle[] = []) {
    return products.map((product: IProduct) => {
      product.articles = product.articles.map((productArticle: IArticle) => {
        return {
          ...productArticle,
          ...articles.find((article) => article.id == productArticle.id),
        };
      });
      product.stock = Math.min(
        ...product.articles.map((article) =>
          Math.floor(article.amountInStock / article.amountRequired)
        )
      );
      return product;
    });
  }

  public registerSale = async (
    productId: string,
    amountSold: number
  ): Promise<any> => {
    return this.postData(WH_CONFIG.apiEndPoint + "/sales", {
      productId,
      amountSold,
    });
  };

  public updateArticleStock = async (
    product: IProduct,
    amountSold: number
  ): Promise<any> => {
    const updateRequestBody: IBulkArticleUpdate[] = product.articles.map(
      (article) => {
        return {
          id: article.id,
          amountToSubtract: article.amountRequired * amountSold,
        };
      }
    );
    return this.patchData(
      WH_CONFIG.apiEndPoint + "/articles",
      updateRequestBody
    );
  };
}

export const wHClientApiService = new WHClientApiService();
