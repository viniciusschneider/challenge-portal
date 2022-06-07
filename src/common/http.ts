import { environment } from "@/environments/environment";
import { HttpMessage } from "@/enums/http-message.enum";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import store from "@/store/index";

class HttpService {
  private readonly axios = axios.create({
    baseURL: environment.apiUrl,
  });

  constructor() {
    this.axios.interceptors.request.use(this.handleRequest);
    this.axios.interceptors.response.use(this.handleResponse, this.handleError);
  }

  private handleRequest(config: AxiosRequestConfig) {
    const token = store.state.user.accessToken?.token;

    if (token)
      config.headers.Authorization = `Bearer ${token}`;
  
    return config;
  }

  private handleResponse({ data }: AxiosResponse) {
    return data;
  }

  private handleError(error: any): Promise<any> {
    const status = error?.response?.data?.status;

    if (status === HttpMessage.InvalidCredentials)
      store.commit("ui/setSnackbar", {
        text: "Credenciais inválidas!",
        status: "error",
      });

    return Promise.reject(error);
  }

  get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this.axios.get(url, config);
  }

  post<T>(url: string, data: {}, config: AxiosRequestConfig = {}): Promise<T> {
    return this.axios.post(url, data, config);
  }

  put<T>(url: string, data: {}): Promise<T> {
    return this.axios.put(url, data);
  }
}

export default new HttpService();
