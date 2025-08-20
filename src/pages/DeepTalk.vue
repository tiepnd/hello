<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-purple-600 text-white p-4 cursor-pointer"
    @click="nextQuestion" @keydown.space="nextQuestion" tabindex="0">
    <h1 class="text-7xl font-extrabold mb-8 text-center leading-tight drop-shadow-lg">
      {{ currentQuestion }}
    </h1>
    <!-- <button
      class="mt-12 py-3 px-8 bg-white text-purple-600 font-semibold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
      @click.stop="$router.push('/')">Home</button> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const questions = [
  "Điều gì khiến bạn thích nhất trong mối quan hệ của chúng ta?",
  "Bạn muốn thay đổi điều gì ở đây?",
  "Bạn có muốn thử điều gì mới mẻ cùng chúng tôi không?",
  "Khi nào là lúc anh cảm thấy gần gũi với em nhất?",
  "Bạn muốn sống ở đâu một ngày nào đó và tại sao?",
  "Bạn cảm thấy thế nào khi sống chung với ai đó?",
  "Bạn mong đợi điều gì nếu chúng ta sống cùng nhau?",
  "Bạn cảm thấy thế nào về việc mua nhà chung?",
  "Bạn cảm thấy thế nào khi kết hôn?",
  "Bạn đã bao giờ nghĩ đến việc sẽ có gia đình một ngày nào đó chưa?",
  "Có công việc nào bạn thích hay ghét không?",
  "Bạn cảm thấy thế nào về việc chia tách và/hoặc hợp nhất tài chính của chúng tôi?",
  "Có điều gì bạn sợ nói với tôi không?",
  "Mục tiêu công việc hoặc nghề nghiệp của bạn trong năm tới là gì?",
  "Với bạn, điều gì quan trọng hơn, sự nghiệp hay gia đình?",
  "Bạn có nghĩ chúng ta hợp nhau không?",
  "Bạn nghĩ chúng ta bổ sung cho nhau như thế nào?",
  "Bạn có nghĩ rằng việc có thể dành thời gian riêng tư là quan trọng không?",
  "Bạn có nghĩ chúng ta có mối quan hệ lành mạnh không?",
  "Bạn có nghĩ chúng ta nên hẹn hò đôi nhiều hơn không?",
  "Bạn có nghĩ chúng ta nên cùng nhau làm nhiều việc nhà hơn, như nấu ăn và dọn dẹp không?",
  "Bạn có nghĩ cả hai chúng ta đều có thể làm việc nhà không?",
  "Bạn đã bao giờ cảm thấy mình phải nỗ lực cải thiện mối quan hệ của chúng ta chưa?",
  "Bạn muốn chúng ta cùng nhau làm nhiều hơn điều gì với tư cách là một cặp đôi?",
  "Bạn sẽ ra sao nếu không theo đuổi ước mơ của mình?",
  "Bạn có tin vào cơ hội thứ hai không?",
  "Khoảnh khắc tuyệt vời nhất trong cuộc đời bạn cho đến nay là gì?",
  "Trong quá khứ hay hiện tại, có ai đó mà bạn muốn làm lành không? Nếu có, đó là ai và tại sao?",
  "Bạn mong muốn ai đó vẫn còn sống?",
  "Nếu bạn có thể nhận được sự an ủi từ một người, đó sẽ là ai?",
  "Bạn cảm thấy được chấp nhận nhiều nhất ở đâu?",
  "Bạn đã học được gì về bản thân mình trong năm qua?",
  "Bạn có nghĩ chúng ta đủ quan tâm đến nhau không?",
  "Trong mối quan hệ của chúng ta, đã bao giờ chúng ta không dành đủ sự quan tâm cho nhau chưa? Nếu có, thì khi nào?",
  "Bạn thích kiểu tóc nào của tôi nhất?",
  "Mối quan hệ của bố mẹ bạn như thế nào?",
  "Mối quan hệ của cha mẹ bạn có ảnh hưởng đến mối quan hệ của bạn không?",
  "Bạn đã thay đổi thế nào kể từ khi 20 tuổi?",
  "Tôi đã thay đổi thế nào kể từ lần đầu chúng ta gặp nhau?",
  "Có kỷ niệm nào về mối quan hệ của chúng ta mà bạn muốn lưu giữ mãi mãi không?",
];

const currentQuestionIndex = ref(0);
const currentQuestion = ref(questions[currentQuestionIndex.value]);

const nextQuestion = () => {
  currentQuestionIndex.value = (currentQuestionIndex.value + 1) % questions.length;
  currentQuestion.value = questions[currentQuestionIndex.value];
};

const handleKeydown = (event: KeyboardEvent) => {
  event.preventDefault();
  if (event.code === 'Space') {
    nextQuestion();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

</script>

<style scoped>
/* No scoped styles needed as we are using Tailwind CSS */
</style>
