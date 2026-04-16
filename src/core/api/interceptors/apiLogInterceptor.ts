import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Logs the details of an outgoing API request.
 * This function is attached to the request interceptor.
 */
const logOnRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const { method, url, data } = config;
    console.log(`🚀 [API Request] ${method?.toUpperCase()} ${url}`);
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
    console.log(`✅ [API Response] ${status} ${config.url}`);
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
    const { message, response, config } = error;
    console.error(`❌ [API Error] ${config?.method?.toUpperCase()} ${config?.url}`);

    if (response) {
        // सर्वर ने 2xx रेंज के बाहर स्टेटस कोड के साथ जवाब दिया
        console.error(`Status: ${response.status}`);
        const responseData = response.data as any;
        if (responseData?.message) {
            console.error(`API Message: ${responseData.message}`);
        } else {
            console.error('Error Data:', JSON.stringify(responseData, null, 2));
        }
    } else if (error.request) {
        // रिक्वेस्ट की गई थी लेकिन कोई जवाब नहीं मिला
        console.error('Error Request:', 'No response received (maybe timeout or network issue)');
    } else {
        // रिक्वेस्ट सेट अप करते समय कुछ हुआ
        console.error('Error Message:', message);
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
