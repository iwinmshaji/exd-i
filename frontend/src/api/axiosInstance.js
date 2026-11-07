import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:"https://exd-mrn.onrender.com"
})

export default axiosInstance