<template>
  <div class="quiz-container">
    <h4 v-if="!showResults" class="quiz-title">Reading - Part 1 Quiz</h4>
    <h4 v-else class="quiz-title">Quiz Results</h4>

    <div v-if="!showResults" class="questions-list">
      <div v-for="(q, index) in questions" :key="index" class="question-card">
        <p class="question-text">{{ index + 1 }}. {{ q.question.replace('...', '_____') }}</p>
        <div class="options-list">
          <label v-for="(option, oIndex) in q.options" :key="oIndex" class="option-label">
            <input
              type="radio"
              :name="'question-' + index"
              :value="option"
              v-model="userAnswers[index]"
              class="option-radio"
            />
            {{ option }}
          </label>
        </div>
      </div>
      <button
        v-if="allQuestionsAnswered"
        @click="showResults = true"
        class="view-results-button"
      >
        View Result
      </button>
    </div>

    <div v-else class="results-screen">
      <div v-for="(q, index) in questions" :key="index" class="question-result-card">
        <p class="question-text">{{ index + 1 }}. {{ q.question.replace('...', '_____') }}</p>
        <p :class="['answer-text', userAnswers[index] === q.correctAnswer ? 'correct' : 'incorrect']">
          Your answer: {{ userAnswers[index] || 'Not answered' }}
        </p>
        <p v-if="userAnswers[index] !== q.correctAnswer" class="answer-text correct">
          Correct answer: {{ q.correctAnswer }}
        </p>
      </div>
      <h3 class="score-text">You got {{ score }}/{{ questions.length }} correct!</h3>
      <button @click="restartQuiz" class="try-again-button">Try Again</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import questionsData from '@/assets/aptis/reading_part1.json';

interface Question {
  question: string;
  correctAnswer: string;
  options: string[];
}

const questions = ref<Question[]>(questionsData);
const userAnswers = ref<string[]>(Array(questions.value.length).fill(''));
const showResults = ref(false);

const allQuestionsAnswered = computed(() => {
  return userAnswers.value.every(answer => answer !== '');
});

const score = computed(() => {
  return questions.value.reduce((count, q, index) => {
    if (userAnswers.value[index] === q.correctAnswer) {
      return count + 1;
    }
    return count;
  }, 0);
});

const restartQuiz = () => {
  userAnswers.value = Array(questions.value.length).fill('');
  showResults.value = false;
};
</script>

<style scoped>
.quiz-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  color: #333;
  text-align: center;
}

.quiz-title {
  font-size: 2.5em;
  color: #2c3e50;
  margin-bottom: 30px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.questions-list,
.results-screen {
  text-align: left;
}

.question-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.question-result-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.question-text {
  font-size: 1.3em;
  margin-bottom: 20px;
  color: #34495e;
  line-height: 1.6;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.option-label {
  font-size: 1.1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px 0;
  transition: color 0.3s ease;
}

.option-label:hover {
  color: #007bff;
}

.option-radio {
  margin-right: 15px;
  transform: scale(1.2);
  cursor: pointer;
}

.view-results-button,
.try-again-button {
  display: block;
  width: 100%;
  padding: 15px 25px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 30px;
}

.view-results-button:hover,
.try-again-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.answer-text {
  font-size: 1.1em;
  margin-top: 10px;
  padding-left: 10px;
  border-left: 4px solid;
}

.correct {
  color: #28a745;
  border-color: #28a745;
}

.incorrect {
  color: #dc3545;
  border-color: #dc3545;
}

.score-text {
  font-size: 2em;
  color: #28a745;
  margin-top: 40px;
  margin-bottom: 30px;
  font-weight: bold;
}
</style>
