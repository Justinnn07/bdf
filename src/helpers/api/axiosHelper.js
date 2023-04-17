import axios from "axios"

const axiosInstance = axios.create()

;(async () => {
  const accessToken = localStorage.getItem("token")
  axiosInstance.defaults.headers.common["authorization"] = accessToken
    ? `Bearer ${accessToken}`
    : ""
  axiosInstance.interceptors.response.use(
    response => {
      // console.log("axios response")
      // console.log(response)
      return response
    },
    error => {
      if (error.response?.status === 401) {
        window.location.replace("/login")
      }
      return Promise.reject(error)
    }
  )
})()

export default axiosInstance
