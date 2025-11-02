import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import DeepTalk from './pages/DeepTalk.vue'
import QuestionSelection from './pages/QuestionSelection.vue'
import EnglishLearning from './pages/EnglishLearning.vue'
import AptisQuiz from './pages/AptisQuiz.vue'
import ReadingQuiz from './pages/ReadingQuiz.vue'
import ListeningQuiz from './pages/ListeningQuiz.vue'
import WritingQuiz from './pages/WritingQuiz.vue'
import SpeakingQuiz from './pages/SpeakingQuiz.vue'
import ReadingPart1 from './pages/ReadingPart1.vue'
import ReadingPart2 from './pages/ReadingPart2.vue'
import ReadingPart3 from './pages/ReadingPart3.vue'
import ReadingPart4 from './pages/ReadingPart4.vue'
import SpeakingPart1 from './pages/SpeakingPart1.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/select-questions', name: 'question-selection', component: QuestionSelection },
  { path: '/deeptalk/:setId', name: 'deeptalk-set', component: DeepTalk },
  { path: '/english-learning', name: 'english-learning', component: EnglishLearning },
  {
    path: '/english-learning/aptis-quiz',
    name: 'aptis-quiz',
    component: AptisQuiz,
  },
  {
    path: '/english-learning/aptis-quiz/reading',
    name: 'reading-quiz',
    component: ReadingQuiz,
  },
  { path: '/english-learning/aptis-quiz/reading/part1', name: 'reading-part1', component: ReadingPart1 },
  { path: '/english-learning/aptis-quiz/reading/part2', name: 'reading-part2', component: ReadingPart2 },
  { path: '/english-learning/aptis-quiz/reading/part3', name: 'reading-part3', component: ReadingPart3 },
  { path: '/english-learning/aptis-quiz/reading/part4', name: 'reading-part4', component: ReadingPart4 },
  { path: '/english-learning/aptis-quiz/listening', name: 'listening-quiz', component: ListeningQuiz },
  { path: '/english-learning/aptis-quiz/writing', name: 'writing-quiz', component: WritingQuiz },
  { path: '/english-learning/aptis-quiz/speaking', name: 'speaking-quiz', component: SpeakingQuiz },
  { path: '/english-learning/aptis-quiz/speaking/part1', name: 'speaking-part1', component: SpeakingPart1 },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
