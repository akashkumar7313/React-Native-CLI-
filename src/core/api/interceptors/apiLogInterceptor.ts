import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Logs the details of an outgoing API request.
 * This function is attached to the request interceptor.
 */
const logOnRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const { method, url, data, baseURL } = config;
    const fullUrl = `${baseURL || ''}${url || ''}`;

    console.log(`🚀 Method: ${method?.toUpperCase()}`);
    console.log(`🔗 URL: ${fullUrl}`);

    if (data) {
        console.log('📦 Request Body:', JSON.stringify(data, null, 2));
    }
    return config;
};

/**
 * Logs the details of an incoming API response.
 * This function is attached to the response interceptor.
 */
const logOnResponse = (response: AxiosResponse): AxiosResponse => {
    const { status, config, data } = response;
    const fullUrl = `${config.baseURL || ''}${config.url || ''}`;

    console.log(`✅ Status Code: ${status}`);
    console.log(`🔗 URL: ${fullUrl}`);

    if (data) {
        console.log('📦 Response Body:', JSON.stringify(data, null, 2));
    }
    return response;
};

/**
 * Logs the details of an API error.
 * This function is attached to both request and response error handlers.
 */
const logOnError = (error: AxiosError): Promise<AxiosError> => {
    const { message, response, config, request } = error;
    const fullUrl = `${config?.baseURL || ''}${config?.url || ''}`;

    console.error(`❌ Method: ${config?.method?.toUpperCase()}`);
    console.error(`🔗 URL: ${fullUrl}`);

    if (response) {
        // Server responded with a status code outside 2xx (e.g., 422, 500)
        console.error(`❌ Error Status: ${response.status}`);
        const responseData = response.data as any;
        if (responseData?.message) {
            console.error(`API Message: ${responseData.message}`);
        } else {
            console.error('📦 Error Data:', JSON.stringify(responseData, null, 2));
        }
    } else if (request) {
        // Request was made but no response received (Timeout/Network)
        console.error('❌ Error: No response received from server.');
        console.error('📝 Technical Detail: Check if URL is correct or server is down.');
    } else {
        // Something happened in setting up the request
        console.error('❌ Error Message:', message);
    }

    return Promise.reject(error);
};

/**
 * Adds logging interceptors to an Axios instance.
 * These interceptors will only be active in development mode.
 */
export const addApiLogInterceptor = (instance: any) => {
    // केवल डेवलपमेंट मोड में लॉगिंग इंटरसेप्टर जोड़ें
    if (__DEV__) {
        instance.interceptors.request.use(logOnRequest, logOnError);
        instance.interceptors.response.use(logOnResponse, logOnError);
    }
};
