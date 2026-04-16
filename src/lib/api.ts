import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('storefront_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('storefront_token')
      localStorage.removeItem('storefront_user_id')
      localStorage.removeItem('storefront_email')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
