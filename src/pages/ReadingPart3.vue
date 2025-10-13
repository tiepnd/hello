<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Reading - Part 3</h1>
        <p class="text-lg text-gray-600">Read the text and answer the questions</p>
        <div class="mt-4 text-sm text-gray-500">
          Topic {{ currentTopicIndex + 1 }} of {{ topics.length }}
        </div>
      </div>

      <!-- Topic Card -->
      <div v-if="!isCompleted" class="bg-white rounded-xl shadow-lg p-8 mb-6">
        <!-- Topic Title -->
        <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center border-b pb-4">
          {{ currentTopic.topic }}
        </h2>

        <!-- Show current paragraph -->
        <div class="mb-8">
          <div 
            v-if="currentParagraph"
            class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-400"
          >
            <h3 class="text-lg font-semibold text-blue-800 mb-4">
              Paragraph {{ currentParagraph.id }}
            </h3>
            <p class="text-gray-700 leading-relaxed text-lg">{{ currentParagraph.text }}</p>
          </div>
        </div>

        <!-- Question List -->
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-6">Select 1 or 2 Questions:</h3>
          
          <div 
            v-for="question in currentTopic.questions" 
            :key="question.id" 
            class="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg border mb-3 transition"
            :class="{
              'bg-green-100 border-green-400': isAnswerChecked && selectedQuestionIds.includes(question.id) && question.correctAnswer === currentParagraph.id,
              'bg-red-100 border-red-400': isAnswerChecked && selectedQuestionIds.includes(question.id) && question.correctAnswer !== currentParagraph.id
            }"
          >
            <div 
              class="flex items-start gap-4 cursor-pointer hover:bg-gray-100"
              @click="toggleSelectedQuestion(question.id)"
            >
              <input 
                type="checkbox"
                v-model="selectedQuestionIds"
                :value="question.id"
                class="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <p class="font-medium text-gray-800">{{ question.question }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-4 mt-8 justify-center">
          <!-- Check -->
          <button 
            v-if="!isAnswerChecked && !showTryAgain"
            @click="checkAnswers"
            class="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            ✅ Check Answers
          </button>

          <!-- Try Again -->
          <button 
            v-if="showTryAgain"
            @click="tryAgain"
            class="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            🔁 Try Again
          </button>

          <!-- Next Topic -->
          <button
            @click="nextTopic"
            class="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Next Topic →
          </button>
        </div>

        <!-- Score -->
        <div v-if="isAnswerChecked" class="mt-6 p-4 bg-gray-100 rounded-lg text-center">
          <span class="text-lg font-semibold text-gray-700">
            Score: {{ currentScore }}/{{ selectedQuestionIds.length }}
          </span>
        </div>
      </div>

      <!-- Completion -->
      <div v-if="isCompleted" class="bg-white rounded-xl shadow-lg p-8 text-center">
        <div class="text-6xl mb-4">🎉</div>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Congratulations!</h2>
        <p class="text-lg text-gray-600 mb-6">You've completed all Reading Part 3 topics!</p>
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-l-4 border-green-400">
          <h3 class="text-xl font-semibold text-green-800 mb-2">Final Results</h3>
          <div class="text-2xl font-bold text-green-700">
            Total Score: {{ totalCorrectAnswers }}/{{ totalQuestions }}
          </div>
        </div>

        <button 
          @click="restartQuiz"
          class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          🔄 Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import readingPart3Data from '@/assets/aptis/reading_part3.json'

interface Paragraph { id: string; text: string }
interface Question { id: number; question: string; correctAnswer: string }
interface Topic { topic: string; paragraphs: Paragraph[]; questions: Question[] }

const topics = ref<Topic[]>(readingPart3Data)
const currentTopicIndex = ref(0)
const currentParagraphIndex = ref(0)

const selectedAnswers = reactive<Record<number, string[]>>({})
const selectedQuestionIds = ref<number[]>([])
const isAnswerChecked = ref(false)
const currentScore = ref(0)
const isCompleted = ref(false)
const showTryAgain = ref(false)

const currentTopic = computed(() => topics.value[currentTopicIndex.value])
const currentParagraph = computed(() => currentTopic.value.paragraphs[currentParagraphIndex.value])
const isLastTopic = computed(() => currentTopicIndex.value === topics.value.length - 1)

onMounted(() => {
  shuffleQuestionsForAllTopics()
  initializeAnswers()
})

/** 🔀 Shuffle mảng ngẫu nhiên */
const shuffleArray = <T>(array: T[]): T[] => {
  return array.map(x => [x, Math.random()] as [T, number])
              .sort((a, b) => a[1] - b[1])
              .map(([x]) => x)
}

/** 🔀 Random danh sách câu hỏi mỗi topic */
const shuffleQuestionsForAllTopics = () => {
  topics.value.forEach(topic => {
    topic.questions = shuffleArray(topic.questions)
  })
}

const initializeAnswers = () => {
  currentTopic.value.questions.forEach(q => {
    if (!selectedAnswers[q.id]) selectedAnswers[q.id] = []
  })
}

const toggleSelectedQuestion = (id: number) => {
  if (selectedQuestionIds.value.includes(id)) {
    selectedQuestionIds.value = selectedQuestionIds.value.filter(q => q !== id)
  } else if (selectedQuestionIds.value.length < 2) {
    selectedQuestionIds.value.push(id)
  }
}

const checkAnswers = () => {
  if (selectedQuestionIds.value.length === 0) {
    alert("Please select at least one question!")
    return
  }

  let score = 0
  selectedQuestionIds.value.forEach(id => {
    const q = currentTopic.value.questions.find(q => q.id === id)
    if (q && q.correctAnswer === currentParagraph.value.id) {
      score++
    }
  })

  currentScore.value = score
  isAnswerChecked.value = true

  if (score === selectedQuestionIds.value.length) {
    // ✅ Tất cả đúng → sang paragraph hoặc topic tiếp theo
    setTimeout(() => {
      if (currentParagraphIndex.value < currentTopic.value.paragraphs.length - 1) {
        nextParagraph()
      } else {
        nextTopic()
      }
    }, 800)
  } else {
    // ❌ Sai → hiện Try Again
    showTryAgain.value = true
  }
}

const nextParagraph = () => {
  currentParagraphIndex.value++
  resetForNewParagraph()
}

const tryAgain = () => {
  showTryAgain.value = false
  isAnswerChecked.value = false
  currentScore.value = 0
  selectedQuestionIds.value = []
}

const nextTopic = () => {
  if (currentTopicIndex.value < topics.value.length - 1) {
    currentTopicIndex.value++
    resetForNewTopic()
  } else {
    isCompleted.value = true
  }
}

const resetForNewParagraph = () => {
  selectedQuestionIds.value = []
  isAnswerChecked.value = false
  currentScore.value = 0
  showTryAgain.value = false
}

const resetForNewTopic = () => {
  selectedQuestionIds.value = []
  isAnswerChecked.value = false
  currentScore.value = 0
  currentParagraphIndex.value = 0
  showTryAgain.value = false
  shuffleQuestionsForAllTopics()
  initializeAnswers()
}

const restartQuiz = () => {
  currentTopicIndex.value = 0
  currentParagraphIndex.value = 0
  isCompleted.value = false
  showTryAgain.value = false
  Object.keys(selectedAnswers).forEach(k => delete selectedAnswers[parseInt(k)])
  shuffleQuestionsForAllTopics()
  initializeAnswers()
}

const totalCorrectAnswers = computed(() => {
  let total = 0
  topics.value.forEach(topic => {
    topic.questions.forEach(q => {
      const user = selectedAnswers[q.id] || []
      if (user.includes(q.correctAnswer)) total++
    })
  })
  return total
})

const totalQuestions = computed(() => 
  topics.value.reduce((sum, t) => sum + t.questions.length, 0)
)
</script>

<style scoped>
label:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
input[type="checkbox"]:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
