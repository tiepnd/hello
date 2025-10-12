<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Reading - Part 2</h1>
        <p class="text-lg text-gray-600">Order the sentences correctly</p>
        <div class="mt-4 text-sm text-gray-500">
          Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}
        </div>
      </div>

      <!-- Question Card -->
      <div v-if="currentQuestion" class="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {{ currentQuestion.title }}
        </h2>

         <!-- Draggable Sentences -->
         <div class="space-y-6">
           <VueDraggableNext 
             v-model="shuffledSentences" 
             :options="{ 
               animation: 200, 
               ghostClass: 'ghost',
               chosenClass: 'chosen',
               dragClass: 'drag'
             }"
             class="space-y-5"
           >
             <div 
               v-for="(sentence, index) in shuffledSentences" 
               :key="sentence"
               class="bg-white hover:bg-blue-50 border-2 border-gray-300 hover:border-blue-400 rounded-xl p-8 cursor-move transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 min-h-[50px] flex items-center"
             >
               <div class="flex items-center w-full">
                 <div class="flex-shrink-0 mr-6">
                 </div>
                 <div class="flex-1">
                   <span class="text-gray-800 text-xl font-medium leading-relaxed hover:text-blue-900 transition-colors duration-200 block">{{ sentence }}</span>
                 </div>
                 <div class="flex-shrink-0 ml-4 opacity-40 hover:opacity-70 transition-opacity duration-200">
                   <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                   </svg>
                 </div>
               </div>
             </div>
           </VueDraggableNext>
         </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-4 mt-8 justify-center">
          <button 
            @click="checkAnswer"
            :disabled="isChecking"
            class="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            ✅ Check Answer
          </button>
          
          <button 
            @click="shuffleSentences"
            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            🔁 Shuffle Again
          </button>
          
          <button 
            @click="toggleTip"
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            💡 Show Tip
          </button>
        </div>

        <!-- Tip Box -->
        <div v-if="showTip" class="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <h3 class="font-semibold text-yellow-800 mb-2">💡 Learning Tip:</h3>
          <p class="text-yellow-700">{{ currentQuestion.tips[0] }}</p>
        </div>

        <!-- Feedback Messages -->
        <div v-if="feedbackMessage" class="mt-8 p-6 rounded-2xl shadow-lg border-l-4" :class="feedbackClass">
          <div class="flex items-center">
            <div v-if="feedbackMessage.includes('Excellent')" class="flex-shrink-0 mr-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <div v-else class="flex-shrink-0 mr-4">
              <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold mb-1" :class="feedbackMessage.includes('Excellent') ? 'text-green-800' : 'text-red-800'">
                {{ feedbackMessage.includes('Excellent') ? '🎉 Congratulations!' : '❌ Try Again' }}
              </h3>
              <p class="text-base font-medium" :class="feedbackMessage.includes('Excellent') ? 'text-green-700' : 'text-red-700'">
                {{ feedbackMessage }}
              </p>
            </div>
          </div>
        </div>

        <!-- Next Question Button -->
        <div v-if="showNextButton" class="text-center mt-6">
          <button 
            @click="nextQuestion"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Next Question →
          </button>
        </div>
      </div>

      <!-- Completion Message -->
      <div v-if="isCompleted" class="bg-white rounded-xl shadow-lg p-8 text-center">
        <div class="text-6xl mb-4">🎉</div>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Congratulations!</h2>
        <p class="text-lg text-gray-600 mb-6">You've completed all Reading Part 2 questions!</p>
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
import { ref, computed, onMounted } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import readingPart2Data from '@/assets/aptis/reading_part2.json'

interface Question {
  id: number
  title: string
  sentences: string[]
  correctOrder: number[]
  tips: string[]
}

const questions = ref<Question[]>(readingPart2Data)
const currentQuestionIndex = ref(0)
const shuffledSentences = ref<string[]>([])
const showTip = ref(false)
const feedbackMessage = ref('')
const feedbackClass = ref('')
const showNextButton = ref(false)
const isChecking = ref(false)
const isCompleted = ref(false)

const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value]
})

// Initialize the quiz
onMounted(() => {
  shuffleSentences()
})

// Shuffle the sentences
const shuffleSentences = () => {
  if (currentQuestion.value) {
    shuffledSentences.value = [...currentQuestion.value.sentences].sort(() => Math.random() - 0.5)
    showTip.value = false
    feedbackMessage.value = ''
    showNextButton.value = false
    isChecking.value = false
  }
}

// Check if the current order matches the correct order
const checkAnswer = () => {
  if (!currentQuestion.value) return
  
  isChecking.value = true
  
  // Get the current order of sentences (1-based indices)
  const currentOrder = shuffledSentences.value.map((sentence, index) => {
    const originalIndex = currentQuestion.value.sentences.indexOf(sentence)
    return originalIndex + 1
  })
  
  // Check if the order matches
  const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(currentQuestion.value.correctOrder)
  
  setTimeout(() => {
    if (isCorrect) {
      feedbackMessage.value = "Excellent! You ordered them correctly."
      feedbackClass.value = "bg-gradient-to-r from-green-50 to-emerald-50 border-green-400"
      showNextButton.value = true
    } else {
      feedbackMessage.value = "Try again! Some sentences are in the wrong order."
      feedbackClass.value = "bg-gradient-to-r from-red-50 to-rose-50 border-red-400"
    }
    isChecking.value = false
  }, 500)
}

// Toggle tip visibility
const toggleTip = () => {
  showTip.value = !showTip.value
}

// Move to next question
const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    shuffleSentences()
  } else {
    isCompleted.value = true
  }
}

// Restart the entire quiz
const restartQuiz = () => {
  currentQuestionIndex.value = 0
  isCompleted.value = false
  shuffleSentences()
}
</script>

<style scoped>
/* Custom styles for draggable items */
.ghost {
  opacity: 0.4;
  background: linear-gradient(135deg, #e0f2fe, #f0f9ff);
  border: 2px dashed #0ea5e9;
  transform: rotate(2deg) scale(0.95);
  box-shadow: 0 20px 40px rgba(14, 165, 233, 0.2);
  border-radius: 12px;
}

.chosen {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-color: #3b82f6;
  transform: scale(1.02);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.25);
  z-index: 10;
}

.drag {
  background: linear-gradient(135deg, #ddd6fe, #c4b5fd);
  border-color: #8b5cf6;
  transform: rotate(3deg) scale(1.05);
  box-shadow: 0 25px 50px rgba(139, 92, 246, 0.3);
  z-index: 1000;
  cursor: grabbing !important;
}

/* Enhanced transitions and animations */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects for better UX */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:-translate-y-1 {
  transform: translateY(-4px);
}

/* Active state for better feedback */
.active\:scale-95:active {
  transform: scale(0.95);
}
</style>
