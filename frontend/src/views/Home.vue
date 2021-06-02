<template>
  <div class="home">
    <div class='container mt-5'>
      <div v-for="question in questions"
            :key="question.pk">
        <p class="mb-0">Posted By:
          <span class="question-author">{{ question.author }}</span>
        </p>
        <h2>
          <router-link
            :to="{ name: 'question', params: { slug: question.slug }}"
            class="question-link"
          >
            <!-- if a question is longer than 'preview_length', replace
            excess characters with '...' -->
            <h2 v-if="question.content.length > preview_length">
              {{ question.content.slice(0,preview_length) + "..." }}
            </h2>
            <h2 v-else>
              {{ question.content.slice(0,preview_length) }}
            </h2>
          </router-link>
        </h2>
        <p>Answers: {{ question.answers_count }}</p>
        <hr>
      </div>
      <div class="my-4">
        <!-- loadingQuestions set to true while waiting for a promise response
        from 'getQuestions', during this time '...loading...' will display.-->
        <p v-show="loadingQuestions">...loading...</p>
        <!-- only show this button if 'next' is not null, indicating there are
        more django pages containing further questions that may be retrieved-->
        <button
          v-show="next"
          @click="getQuestions"
          class="btn btn-sm btn-outline-success"
          >Load More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from "@/common/api.service.js"

export default {
  name: "Home",
  data() {
    return {
      questions: [],
      next: null,
      loadingQuestions: false,
      preview_length: 100
    }
  },
  methods: {
    getQuestions() {
      let endpoint = "api/questions/";
      if (this.next) {
        endpoint = this.next;
      }
      this.loadingQuestions = true;

      apiService(endpoint)
        .then(data => {

          // Use the below line 'objects.assign...' ONLY if not using pagination,
          // otherwise the http response data will not have a 'results' attr
          //
          // Object.assign(this.questions, data);
          this.questions.push(...data.results)
          this.loadingQuestions = false;
          if (data.next) {
            this.next = data.next;
          } else {
            this.next = null;
          }
        })
    }
  },
  created() {
    this.getQuestions()
    document.title = "QuestionTime";
  }
};
</script>

<style scoped>
.question-author {
  font-weight: bold;
  color: red;
}

.question-link {
  font-weight: bold;
  color: black;
}

.question-link:hover {
  color: #62686D;
  text-decoration: none;
}

</style>