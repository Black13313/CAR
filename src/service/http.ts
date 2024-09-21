import axios, {AxiosInstance} from "axios";

import {message} from "ant-design-vue";
import router from '../router'
import {userStore} from "../store/user";
import {hideLoading} from "./helper";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

apiClient.interceptors.request.use((config) => {
  const user: any = userStore()
  config.headers!.Authorization = `Bearer ${user.access_token}`;
  config.headers!.Accept = "application/json";
  return config
})

apiClient.interceptors.response.use((response) => {
  hideLoading()

  if (response.data?.DidError) {
    const err = new Error(response.data?.errorMessage)
    handleError(err)
    return Promise.reject(err)
  }

  return response
}, (error) => {
  handleError(error)
  return Promise.reject(error)
})

const handleError = (error: any) => {
  hideLoading()
  if (error.response?.status === 401) {
    message.error(error.response.data.message)
    // clear login data
    const user: any = userStore()
    user.clearUserData()
    // goto login page
    return router.push('/login')
  } else {
    if (error.response && error.response?.data && error.response?.data?.message) {
      message.error(error.response.data.message)
    } else {
      message.error(error.message)
    }
  }
}

export default apiClient
