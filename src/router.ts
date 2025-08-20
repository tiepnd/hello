import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import DeepTalk from './pages/DeepTalk.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/deeptalk', component: DeepTalk },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
