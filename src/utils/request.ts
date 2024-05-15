import { ResultEnum } from "@/enums/httpEnum";
import { useUserStore } from "@/stores/userStore";
import { message, Modal } from "ant-design-vue";
import axios, { CanceledError } from "axios";


// /**
//  * @emits 请求的选项
//  *
//  * @export
//  * @interface RequestOptions
//  * @extends {AxiosRequestConfig}
//  */
// export interface RequestOptions extends AxiosRequestConfig {
//     // 是否直接从响应中提出数据
//     isReturnResult?: boolean;
//     // 请求成功提示信息
//     successMsg?: string;
//     // 请求失败提示信息
//     errorMsg?: string;
//     // 成功后是否返回后端的成功信息
//     showSuccessMsg?: boolean;
//     // 失败后是否返回后端的失败信息
//     showErrorMsg?: boolean;
//     // 请求信息的格式
//     requestType?: 'json' | 'form';
// }

const UNKNOWN_ERROR = '未知错误，请重试';

// 请求路径前缀
export const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

// 实现取消请求
const controller = new AbortController();

const service = axios.create({
    baseURL: baseApiUrl,
    timeout: 10000,
    signal: controller.signal,
});

// 请求拦截器
service.interceptors.request.use(
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
    }
)

// 响应拦截器
service.interceptors.response.use(
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
export default service;