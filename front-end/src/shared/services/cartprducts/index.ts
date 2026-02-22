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
  ICreateCartProduct,
  ICartProduct,
  IUpdateCartProduct,
} from "@/shared/interfaces/cartProducts/ICartProducts";

const route = "/cartProducts";

export type ICartProductResponse = IResponse<ICartProduct>;
export type ICartProductListResponse = IListResponse<ICartProduct>;

export const CartProductService = {
  create: async (data: ICreateCartProduct): Promise<ICartProductResponse> => {
    try {
      const result = await Api.post(`${route}`, data);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  findOne: async (id: string): Promise<ICartProductResponse> => {
    try {
      const result = await Api.get(`${route}/${id}`);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  findAll: async (): Promise<ICartProductListResponse> => {
    try {
      const result = await Api.get(route);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  update: async (
    id: string,
    data: IUpdateCartProduct,
  ): Promise<ICartProductResponse> => {
    try {
      const result = await Api.put(`${route}/${id}`, data);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  delete: async (id: string): Promise<ICartProductResponse> => {
    try {
      const result = await Api.delete(`${route}/${id}`);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },
};
