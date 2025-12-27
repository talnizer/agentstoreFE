import { defer, Observable } from "rxjs";
import { axiosRequestConfiguration } from "./AxiosConfig";
import { initialization as initializeAxios } from "./AxiosSetup";
import { map } from "rxjs/operators";

const axiosInstance = initializeAxios(axiosRequestConfiguration);

const setAuthToken = (token: string) => {
  // axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return;
};
const get = <T>(
  url: string,
  headers?: object,
  queryParams?: object
): Observable<T> => {
  return defer(() =>
    axiosInstance.get<T>(url, { params: queryParams, headers: headers })
  ).pipe(map((result: any) => result.data));
};

const post = <T>(
  url: string,
  body: object,
  headers?: object,
  queryParams?: object
): Observable<T | void> => {
  return defer(() =>
    axiosInstance.post<T>(url, body, { params: queryParams, headers: headers })
  ).pipe(map(result => result.data));
};

const put = <T>(
  url: string,
  body: object,
  queryParams?: object
): Observable<T | void> => {
  return defer(() =>
    axiosInstance.put<T>(url, body, { params: queryParams })
  ).pipe(map(result => result.data));
};

const patch = <T>(
  url: string,
  body: object,
  queryParams?: object
): Observable<T | void> => {
  return defer(() =>
    axiosInstance.patch<T>(url, body, { params: queryParams })
  ).pipe(map(result => result.data));
};

const deleteR = <T>(url: string, id: string): Observable<T | void> => {
  return defer(() => axiosInstance.delete(`${url}/${id}`)).pipe(
    map(result => result.data)
  );
};

export default { setAuthToken, get, post, put, patch, delete: deleteR };
