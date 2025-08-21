<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4">
    <h1 class="text-4xl font-extrabold mb-8 drop-shadow-lg">Choose Your Deep Talk Set</h1>
    <div class="flex flex-col space-y-4 w-full max-w-sm">
      <button
        v-for="set in questionSets"
        :key="set.id"
        class="py-3 px-6 bg-white text-blue-600 font-semibold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75"
        @click="selectSet(set.id)"
      >
        {{ set.name }}
      </button>
      <button
        class="mt-4 py-3 px-6 bg-transparent border-2 border-white text-white font-semibold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
        @click="$router.push('/')"
      >
        Back to Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import allQuestionSets from '../assets/questions.json';

const router = useRouter();
const questionSets = allQuestionSets;

const selectSet = (setId: string) => {
  router.push({ name: 'deeptalk-set', params: { setId: setId } });
};
</script>

<style scoped>
/* No scoped styles needed as we are using Tailwind CSS */
</style>
