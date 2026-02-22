import {
  handleApiError,
  handleApiResponse,
} from "../axios-config/api-response";
import { Api } from "../axios-config";

import type {
  IListResponse,
  IResponse,
} from "@/shared/interfaces/response/IResponse";
import type {
  ICreateProduct,
  IProduct,
  IUpdateProduct,
} from "@/shared/interfaces/products/IProducts";

const route = "/products";

export type IProductResponse = IResponse<IProduct>;
export type IProductListResponse = IListResponse<IProduct>;

export const ProductService = {
  create: async (data: ICreateProduct): Promise<IProductResponse> => {
    try {
      const result = await Api.post(`${route}`, data);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  findOne: async (id: string): Promise<IProductResponse> => {
    try {
      const result = await Api.get(`${route}/${id}`);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  findAll: async (): Promise<IProductListResponse> => {
    try {
      const result = await Api.get(route);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  update: async (
    id: string,
    data: IUpdateProduct,
  ): Promise<IProductResponse> => {
    try {
      const result = await Api.put(`${route}/${id}`, data);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  delete: async (id: string): Promise<IProductResponse> => {
    try {
      const result = await Api.delete(`${route}/${id}`);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },
};
