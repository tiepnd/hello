<template>
  <div class="page-wrapper">
    <div class="header">
      <nav class="breadcrumb">menu / hello / english-learning / aptis-quiz / speaking / part1</nav>
      <h1 class="title">Speaking — Part 1 (Flashcards)</h1>
    </div>

    <div class="container">
      <div class="card-area">
        <div
          class="flashcard"
          :class="{ flipped: isFlipped }"
          @click="flipCard"
          role="button"
          :aria-label="`Card ${currentIndex + 1} of ${cards.length}. Click to flip`"
        >
          <!-- Front -->
          <div class="card-face card-front">
            <p class="card-label">Question</p>
            <div class="card-content">
              <p class="question-text">{{ currentCard?.question }}</p>
            </div>
          </div>

          <!-- Back -->
          <div class="card-face card-back">
            <p class="card-label">Answer</p>
            <div class="card-content">
              <p class="answer-text">{{ currentCard?.answer }}</p>
            </div>
          </div>
        </div>

        <div class="controls">
          <div class="progress">Card {{ currentIndex + 1 }} / {{ cards.length }}</div>

          <div class="buttons">
            <button class="btn" @click="prevCard" :disabled="cards.length === 0">Previous</button>
            <button class="btn" @click="nextCard" :disabled="cards.length === 0">Next</button>
            <button class="btn" @click="shuffleCards" :disabled="cards.length === 0">Shuffle</button>
            <button class="btn" @click="toggleAutoPlay" :class="{ active: autoPlay }">
              {{ autoPlay ? 'Stop Auto Play' : 'Auto Play' }}
            </button>
          </div>
        </div>
      </div>

      <aside class="sidebar">
        <div class="notes">
          <h3>Tips</h3>
          <ul>
            <li>Click the card to flip and reveal the model answer.</li>
            <li>Use Shuffle to practice randomly.</li>
            <li>Auto Play flips card every 5 seconds.</li>
            <li>When moving to next card, the card resets to front side automatically.</li>
          </ul>
        </div>

        <div class="actions">
          <button class="small-btn" @click="goToFirst" :disabled="cards.length === 0">Go to First</button>
          <button class="small-btn" @click="goToLast" :disabled="cards.length === 0">Go to Last</button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import cardsData from '@/assets/aptis/speaking_part1.json';

interface Card {
  question: string;
  answer: string;
}

const cards = ref<Card[]>([]);
const currentIndex = ref(0);
const isFlipped = ref(false);
const autoPlay = ref(false);
let autoPlayTimer: number | null = null;

onMounted(() => {
  // clone loaded data to ensure reactivity and safety (avoid mutating imported object)
  cards.value = Array.isArray(cardsData) ? JSON.parse(JSON.stringify(cardsData)) : [];
});

onBeforeUnmount(() => {
  stopAutoPlay();
});

const currentCard = computed(() => cards.value[currentIndex.value] ?? null);

function flipCard() {
  isFlipped.value = !isFlipped.value;
}

function nextCard() {
  if (cards.value.length === 0) return;
  currentIndex.value = (currentIndex.value + 1) % cards.value.length;
  isFlipped.value = false; // show front by default
}

function prevCard() {
  if (cards.value.length === 0) return;
  currentIndex.value = (currentIndex.value - 1 + cards.value.length) % cards.value.length;
  isFlipped.value = false;
}

function shuffleCards() {
  if (cards.value.length === 0) return;
  // Fisher-Yates shuffle
  for (let i = cards.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards.value[i], cards.value[j]] = [cards.value[j], cards.value[i]];
  }
  currentIndex.value = 0;
  isFlipped.value = false;
}

function goToFirst() {
  if (cards.value.length === 0) return;
  currentIndex.value = 0;
  isFlipped.value = false;
}

function goToLast() {
  if (cards.value.length === 0) return;
  currentIndex.value = cards.value.length - 1;
  isFlipped.value = false;
}

/** Auto Play: flip the card every 5 seconds.
 * Behavior:
 *  - If currently front, it flips to back.
 *  - If currently back, it moves to next card and shows front.
 */
function startAutoPlay() {
  stopAutoPlay();
  autoPlay.value = true;
  autoPlayTimer = window.setInterval(() => {
    if (!isFlipped.value) {
      // flip to back
      isFlipped.value = true;
    } else {
      // move to next and show front
      nextCard();
      // isFlipped already set to false in nextCard()
    }
  }, 5000);
}

function stopAutoPlay() {
  autoPlay.value = false;
  if (autoPlayTimer !== null) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
}

function toggleAutoPlay() {
  if (autoPlay.value) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
}
</script>

<style scoped>
/* Page layout */
.page-wrapper {
  max-width: 1100px;
  margin: 28px auto;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  color: #1f2937;
  padding: 16px;
}

.header {
  margin-bottom: 18px;
}

.breadcrumb {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 6px;
}

.title {
  font-size: 1.6rem;
  font-weight: 700;
}

/* Main container */
.container {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
}

/* Card area */
.card-area {
  flex: 1 1 600px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Flashcard */
.flashcard {
  width: 100%;
  max-width: 720px;
  height: 340px;
  perspective: 1400px;
  cursor: pointer;
  margin-bottom: 18px;
}

.card-face {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 340px;
  backface-visibility: hidden;
  border-radius: 1rem; /* rounded-2xl */
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08); /* shadow-lg */
  padding: 1.25rem; /* p-6 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.6s cubic-bezier(.2,.8,.2,1), opacity 0.3s;
  overflow: auto;
}

/* Container to hold both faces */
.flashcard .card-front,
.flashcard .card-back {
  transform-style: preserve-3d;
}

/* Positioning faces */
.card-front {
  background: #ffffff;
  transform: rotateY(0deg) translateZ(0);
  z-index: 2;
}

.card-back {
  background: #eff6ff; /* bg-blue-50 */
  transform: rotateY(180deg);
  z-index: 1;
}

/* Flipped state */
.flashcard.flipped .card-front {
  transform: rotateY(-180deg);
  z-index: 1;
}
.flashcard.flipped .card-back {
  transform: rotateY(0deg);
  z-index: 2;
}

/* inner content */
.card-label {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 8px;
  font-weight: 600;
}

.card-content {
  background: transparent;
  padding: 12px;
  border-radius: 8px;
}

.question-text,
.answer-text {
  font-size: 1.2rem;
  line-height: 1.5;
  color: #0f172a;
  white-space: pre-wrap;
}

/* Controls */
.controls {
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.progress {
  color: #374151;
  font-weight: 600;
}

.buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 6px;
}

.btn {
  background: #0ea5e9;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.12s ease, background 0.12s ease;
}

.btn:hover { transform: translateY(-3px); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

.btn.active {
  background: #06b6d4;
}

/* Sidebar */
.sidebar {
  width: 260px;
  min-width: 220px;
  border-radius: 12px;
  padding: 14px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  align-self: flex-start;
}

.notes h3 {
  margin: 0 0 8px 0;
  font-weight: 700;
}

.notes ul {
  padding-left: 18px;
  margin: 0;
  color: #374151;
  line-height: 1.5;
}

.actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.small-btn {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #f8fafc;
  cursor: pointer;
  font-weight: 600;
}
.small-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* Responsive */
@media (max-width: 880px) {
  .container {
    flex-direction: column;
    align-items: center;
  }
  .sidebar {
    width: 100%;
    max-width: 720px;
  }
  .flashcard {
    height: 320px;
  }
}
</style>
