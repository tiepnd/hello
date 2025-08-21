import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import DeepTalk from './pages/DeepTalk.vue'
import QuestionSelection from './pages/QuestionSelection.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/select-questions', name: 'question-selection', component: QuestionSelection },
  { path: '/deeptalk/:setId', name: 'deeptalk-set', component: DeepTalk },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
