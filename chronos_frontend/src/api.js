import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Points to my local Django Backend
//     headers: {
//     'Content-Type': 'application/json',
//   },
});

// Request Interceptor: Automatically injects Access Token into headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Promise represents the completion of an asynchronous operation
        return Promise.reject(error)
  }
)

export default api;