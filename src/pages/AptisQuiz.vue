<template>
  <div class="flex flex-col items-center justify-center p-4">
    <h2 class="text-4xl font-bold mb-6 drop-shadow-lg">Aptis Quiz</h2>
    <p class="text-lg mb-8 opacity-90">Select a skill to practice.</p>
    <div class="flex flex-col space-y-4 w-full max-w-sm">
      <button class="py-3 px-6 bg-white text-purple-600 font-semibold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-75"
        @click="router.push('/english-learning/aptis-quiz/reading')">Reading</button>
      <button class="py-3 px-6 bg-white text-purple-600 font-semibold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-75"
        @click="router.push('/english-learning/aptis-quiz/listening')">Listening</button>
      <button class="py-3 px-6 bg-white text-purple-600 font-semibold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-75"
        @click="router.push('/english-learning/aptis-quiz/writing')">Writing</button>
      <button class="py-3 px-6 bg-white text-purple-600 font-semibold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-75"
        @click="router.push('/english-learning/aptis-quiz/speaking')">Speaking</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
