import { ResultEnum } from "@/enums/httpEnum";
import { useUserStore } from "@/stores/userStore";
import { message, Modal } from "ant-design-vue";
import axios, { CanceledError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";

const UNKNOWN_ERROR = '未知错误，请重试';

// 请求路径前缀
export const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

// 实现取消请求
const controller = new AbortController();

type Result<T> = {
    code: number;
    message: string;
    data: T;
};

export class Request {
    // axios实例
    axiosInstance: AxiosInstance;
    // 基础配置
    baseConfig: AxiosRequestConfig = {
        baseURL: baseApiUrl,
        timeout: 10000,
        signal: controller.signal // 用于终止未完成的请求
    };

    // 构造函数
    constructor(config: AxiosRequestConfig) {
        // 创建axios实例
        this.axiosInstance = axios.create(Object.assign(this.baseConfig, config));
        // 配置请求拦截器
        this.axiosInstance.interceptors.request.use(
            (config) => {
            // 获取token，并添加到请求头
            const userStore = useUserStore();
            const token = userStore.token;
            if (token && config.headers) {
                config.headers['Authorization'] = token;
                // debug
                // console.log(token);
            }
            return config;
        },
        (error) => {
            Promise.reject(error);
        });
        // 配置响应拦截器
        this.axiosInstance.interceptors.response.use(
            (response) => {
                const result = response.data;

                // 返回代码不为200，发生错误
                if (result.code !== ResultEnum.SUCCESS) {
                    message.error(result.message || UNKNOWN_ERROR);

                    if ([1101, 1105].includes(result.code)) {
                        Modal.confirm({
                            title: '警告',
                            content: result.message || '账号异常，您可以取消停留在该页上，或重新登录',
                            onOk() {
                                // 清除Storage信息
                                localStorage.clear();
                                // 刷新当前页面
                                window.location.reload();
                            },
                          });
                    }

                    // 抛出其他错误
                    const error = new Error(result.message || UNKNOWN_ERROR) as Error & { code: any };
                    error.code = result.code;
                    return Promise.reject(error);
                } else {
                    return response.data;
                }
            },
            (error) => {
                // 请求取消错误
                if (!(error instanceof CanceledError)) {
                  // 处理 422 或者 500 的错误异常提示
                  const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR;
                  message.error({ content: errMsg, key: errMsg });
                  error.message = errMsg;
                }
                return Promise.reject(error);
              },
        )
    }

    // 定义请求方法
    public request (config: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.axiosInstance.request(config);
    }

    // 封装get方法
    public get<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<Result<T>> {
        return this.axiosInstance.get(url, config) as Promise<Result<T>>;
    }

    // 封装post方法
    public post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<Result<T>> {
        return this.axiosInstance.post(url, data, config) as Promise<Result<T>>;
    }

    // 封装put方法
    public put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<Result<T>> {
        return this.axiosInstance.put(url, data, config) as Promise<Result<T>>;
    }

    // 封装patch方法
    public patch<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<Result<T>> {
        return this.axiosInstance.patch(url, data, config) as Promise<Result<T>>;
    }

    // 封装delete方法
    public delete<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<Result<T>> {
        return this.axiosInstance.delete(url, config) as Promise<Result<T>>;
    }
}

// 导出Request实例
export default new Request({});