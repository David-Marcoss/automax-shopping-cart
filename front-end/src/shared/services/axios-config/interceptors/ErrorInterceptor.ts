import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
  if (error.response?.status === 401) {
    const errorMessage = (error.response?.data as { message?: string })
      ?.message;

    console.log("interceptor: ", error.response);
    return Promise.reject(new Error(errorMessage));
  }

  return Promise.reject(error);
};
