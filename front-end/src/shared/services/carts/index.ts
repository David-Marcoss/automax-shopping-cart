import {
  handleApiError,
  handleApiResponse,
} from "../axios-config/api-response";
import { Api } from "../axios-config";

import type { IResponse } from "@/shared/interfaces/response/IResponse";
import type {
  ICreateCart,
  ICart,
  IUpdateCart,
} from "@/shared/interfaces/carts/ICarts";

const route = "/carts";

export type ICartResponse = IResponse<ICart>;
export type ICartListResponse = IResponse<ICart[]>;

export const CartService = {
  create: async (data: ICreateCart): Promise<ICartResponse> => {
    try {
      const result = await Api.post(`${route}`, data);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  findOne: async (id: string): Promise<ICartResponse> => {
    try {
      const result = await Api.get(`${route}/${id}`);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  findAll: async (): Promise<ICartListResponse> => {
    try {
      const result = await Api.get(route);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  update: async (id: string, data: IUpdateCart): Promise<ICartResponse> => {
    try {
      const result = await Api.put(`${route}/${id}`, data);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  delete: async (id: string): Promise<ICartResponse> => {
    try {
      const result = await Api.delete(`${route}/${id}`);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },
};
