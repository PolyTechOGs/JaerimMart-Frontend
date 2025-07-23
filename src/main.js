import axios from 'axios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)


axios.defaults.baseURL = 'http://localhost:8080' // 백엔드 주소
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('jwtToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})



app.use(createPinia())
app.use(router)

app.mount('#app')
