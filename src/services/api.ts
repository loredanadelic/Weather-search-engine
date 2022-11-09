import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios, { AxiosRequestConfig, ResponseType } from 'axios';


export interface Options {
  body?: Record<string, any>;
  headers?: Record<string, unknown>;
  data?: any;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: any;
  hide4xxErrorNotifications?: boolean;
  responseType?: ResponseType;
}

export const defaultOptions: Options = {
  body: {},
  method: 'GET',
};

export const useQueryApi = <R>(
  path: string,
  queryKey: QueryKey,
  options?: Options,
  useQueryOptions: UseQueryOptions<R> = {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  },
) => useQuery<R>(queryKey, () => apiCall(path, { ...(options || defaultOptions) }), useQueryOptions);

export const apiCall = <R>(path: string, options: Options = defaultOptions) =>
  api<R>(path, options)
    .then((data) => data.data)
    .catch((err) => {
      return Promise.reject(err.response.data);
    });

const api = <R>(path: string, { method, body, data, params, responseType }: Options) => {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: process.env.REACT_APP_BASE_URL + path,
    method,
    data:
      data ||
      (method !== 'GET' && {
        ...body,
      }),
    params,
    
  };

  if (responseType) {
    axiosRequestConfig['responseType'] = responseType;
  }
  return axios.request<R>(axiosRequestConfig);
};
