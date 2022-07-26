import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import qs from "qs";

// 创建一个 axios 实例
const service: AxiosInstance = axios.create({
	baseURL: "/",
	timeout: 50000,
	headers: { "Content-Type": "application/json" }
});

// 添加请求拦截器
service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		if (!config.headers) return;

		if (config.headers["Content-Type"] === "application/x-www-form-urlencoded") {
			config.data = qs.stringify(config.data);
		}
		return config;
	},
	(error: AxiosError) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response: AxiosResponse) => {
		const res = response.data;
		const config = response?.config as AxiosRequestConfig & { showErrorMessage: boolean };
		if (res.code && res.code !== 200) {
			// `token` 过期或者账号已在别处登录
			if (res.code === 401) {
				return Promise.reject(res);
			}

			if (config?.showErrorMessage !== false) ElMessage.error(res.msg);
			return Promise.reject(res);
		}
		return Promise.resolve(res);
	},
	(error: AxiosError) => {
		const response = error.response;
		const config = response?.config as AxiosRequestConfig & { showErrorMessage: boolean };
		if (error.message.indexOf("timeout") != -1) {
			ElMessage.error("网络超时");
		} else if (error.message == "Network Error") {
			ElMessage.error("网络连接错误");
		} else {
			if (config?.showErrorMessage !== false) ElMessage.error(error.message);
		}
		return Promise.reject(error);
	}
);

export default service;
