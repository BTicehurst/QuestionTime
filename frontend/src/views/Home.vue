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
          >{{ question.content }}
          </router-link>
        </h2>
        <p>Answers: {{ question.answers_count }}</p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from "../common/api.service.js"

export default {
  name: "Home",
  data() {
    return {
      questions: []
    }
  },
  methods: {
    getQuestions() {
      let endpoint = "api/questions/";
      apiService(endpoint)
        .then(data => {

          // Use the below line 'objects.assign......' if not using pagination,
          // otherwise the http response data will not have a 'results' attr
          //
          // Object.assign(this.questions, data);
          this.questions.push(...data.results)
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