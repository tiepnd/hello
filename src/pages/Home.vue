<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white p-4">
    <h1 class="text-5xl font-extrabold mb-6 drop-shadow-lg">Welcome to Our Special Place</h1>
    <p class="text-xl mb-10 opacity-90">Discover moments, share thoughts, connect deeper.</p>
    <div class="flex flex-col space-y-4 w-full max-w-sm">
      <button class="py-3 px-6 bg-white text-blue-600 font-semibold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75"
        @click="router.push('/deeptalk')">Deep Talk Questions for Lovers</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<style scoped>
/* No scoped styles needed as we are using Tailwind CSS */
</style>
