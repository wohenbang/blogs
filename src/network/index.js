import originAxios from 'axios'
export default function axios(config) {
    // 创建axios实例
    const axiosInstance = originAxios.create({
      baseURL: 'http://192.168.101.27/App/action',
      timeout: 5000
    })
    // 使用内部创建的实例配合传进来的参数进行网络请求
    return axiosInstance(config)
}