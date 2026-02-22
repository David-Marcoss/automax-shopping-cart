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
  ICreateOltInfos,
  IOltInfos,
  IOltInfosSearchFilter,
} from "@/shared/interfaces/oltInfos";
import Environment from "@/shared/environments";

const route = "/oltsInfo";

export type IOltInfosResponse = IResponse<IOltInfos>;
export type IOltInfosListResponse = IListResponse<IOltInfos>;

export const OltInfosService = {
  create: async (data: ICreateOltInfos): Promise<IOltInfosResponse> => {
    try {
      const result = await Api.post(`${route}`, data);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  findOne: async (id: string): Promise<IOltInfosResponse> => {
    try {
      const result = await Api.get(`${route}/${id}`);
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },

  findAll: async ({
    search,
    page = "1",
    perPage = Environment.LIST_ITEMS_LIMIT,
    oltType,
    state,
  }: IOltInfosSearchFilter): Promise<IOltInfosListResponse> => {
    try {
      const result = await Api.get(route, {
        params: {
          search: search ? search : undefined,
          page: page ? Number(page) : undefined,
          perPage: perPage ? Number(perPage) : undefined,
          oltType: oltType ? oltType : undefined,
          state: state ? state : undefined,
        },
      });
      return handleApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  },
};
