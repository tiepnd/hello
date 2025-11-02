<template>
  <div class="flex flex-col items-center justify-center p-4">
    <h3 class="text-3xl font-bold mb-6 drop-shadow-lg">Speaking Quiz</h3>
    <p class="text-lg mb-8 opacity-90">Select a part to practice.</p>
    <div class="flex flex-col space-y-4 w-full max-w-sm">
      <button class="py-3 px-6 bg-white text-red-600 font-semibold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-75"
        @click="router.push('/english-learning/aptis-quiz/speaking/part1')">Part 1</button>
      <button class="py-3 px-6 bg-white text-red-600 font-semibold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-75"
        @click="router.push('/english-learning/aptis-quiz/reading/part2')">Part 2</button>
      <button class="py-3 px-6 bg-white text-red-600 font-semibold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-75"
        @click="router.push('/english-learning/aptis-quiz/reading/part3')">Part 3</button>
      <button class="py-3 px-6 bg-white text-red-600 font-semibold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-75"
        @click="router.push('/english-learning/aptis-quiz/reading/part4')">Part 4</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
