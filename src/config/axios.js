import axios from "axios";
import env from './env'


const instance = axios.create({
    baseURL: env.baseUrl,
})
// 拦截器
instance.interceptors.request.use(config => {
    return config
}, (error) => {
    return Promise.reject(error)
});

instance.interceptors.response.use((res) => {
    return res.data
}, (error) => {
    return Promise.reject(error)
})


export default instance
