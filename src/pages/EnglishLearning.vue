<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-teal-500 text-white p-4">
    <h1 class="text-5xl font-extrabold mb-6 drop-shadow-lg">English Learning</h1>
    <p class="text-xl mb-10 opacity-90">Choose your learning path.</p>
    <div class="flex flex-col space-y-4 w-full max-w-sm">
      <button class="py-3 px-6 bg-white text-green-600 font-semibold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-75"
        @click="router.push('/english-learning/aptis-quiz')">Aptis Quiz</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
