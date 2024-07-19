import type { RequestConfig, RequestOptions } from '@umijs/max';
import { message, notification } from 'antd';

// Error treatment plan: error type
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// The response data format agreed with the back end
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name Error treatment
 * The error handling of pro comes with it can make your own changes here
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // Error treatment: UMI@3 error treatment scheme.
  errorConfig: {
    // Error throw
    errorThrower: (res) => {
      const { success, data, errorCode, errorMessage, showType } =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // Throw the self -made error
      }
    },
    // Error receiving and processing
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // Our error throwing errors.
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        // Axios error
        // The request is successfully issued and the server also responds to the status code, but the status code exceeds the range of 2xx

        if (error.response.status === 401) {
          // message.error(`Silahkan login terlebih dahulu`);
        } else {
          message.error(`Response status:${error.response.status}`);
        }
      } else if (error.request) {
        // The request has been successfully initiated, but it has not received a response
        // ```Error.Request``` is an instance of XMLHTTPREQUEST in the browser,
        // And in Node.js is an instance of http.clientRequest
        message.error('None response! Please retry.');
      } else {
        // There is something wrong when sending a request
        message.error('Request error, please retry.');
      }
    },
  },

  // Request interceptor
  requestInterceptors: [
    (config: RequestOptions) => {
      const authHeader = { Authorization: `Bearer ${localStorage.getItem('Authorization') || ''}` };

      // Intercept the request configuration and perform personalized processing.
      // const url = config?.url?.concat('?token = 123');
      const url = config?.url;
      return { ...config, url, interceptors: true, headers: authHeader };
    },
  ],

  // Response interceptor
  responseInterceptors: [
    (response) => {
      // Intercepting response data and personalized processing
      const { data } = response as unknown as ResponseStructure;

      if (data?.success === false) {
        message.error('Request failed!');
      }
      return response;
    },
  ],
};
