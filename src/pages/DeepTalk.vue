<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-purple-600 text-white p-4 cursor-pointer"
    @click="nextQuestion" @keydown.space="nextQuestion" tabindex="0">
    <h1 class="text-7xl font-extrabold mb-8 text-center leading-tight drop-shadow-lg">
      {{ currentQuestion }}
    </h1>
    <button
      class="mt-12 py-3 px-8 bg-white text-purple-600 font-semibold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
      @click.stop="$router.push('/')">Home</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import allQuestionSets from '../assets/questions.json'; // Import your JSON file

const route = useRoute();
const questions = ref<string[]>([]);
const currentQuestionIndex = ref(0);
const currentQuestion = ref('');

const loadQuestions = () => {
  const setId = route.params.setId as string;
  const selectedSet = allQuestionSets.find(set => set.id === setId);
  if (selectedSet) {
    questions.value = selectedSet.questions;
    currentQuestionIndex.value = 0; // Reset index when loading new set
    currentQuestion.value = questions.value[currentQuestionIndex.value];
  } else {
    // Handle case where set is not found, e.g., redirect or show error
    console.error('Question set not found!');
    currentQuestion.value = 'Bộ câu hỏi không tồn tại.';
  }
};

const nextQuestion = () => {
  if (questions.value.length === 0) return;
  currentQuestionIndex.value = (currentQuestionIndex.value + 1) % questions.value.length;
  currentQuestion.value = questions.value[currentQuestionIndex.value];
};

const handleKeydown = (event: KeyboardEvent) => {
  event.preventDefault();
  if (event.code === 'Space') {
    nextQuestion();
  }
};

onMounted(() => {
  loadQuestions();
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

// Watch for changes in route params to reload questions if navigating between sets
watch(() => route.params.setId, (newSetId, oldSetId) => {
  if (newSetId !== oldSetId) {
    loadQuestions();
  }
});

</script>

<style scoped>
/* No scoped styles needed as we are using Tailwind CSS */
</style>
