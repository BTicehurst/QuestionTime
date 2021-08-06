<template>
  <div class="single-question mt-2">
    <!-- div rendering the content, author and creation date of a question-->
    <div class="container">
      <h1>{{ question.content }}</h1>
      <p class="mb-0">
        Posted By:
        <span class="author-name">{{ question.author }}</span>
      </p>
      <p>{{ question.created_at }}</p>
      <hr />
      <!-- inform user if they've already answered -->
      <div v-if="userHasAnswered">
        <p class="answer-added">You've written an answer!</p>
      </div>
      <!-- if they haven't already answered, show them the answer form.
            showForm will only be true however if the 'answer the question' in 
            our next branch has been clicked. -->
      <div v-else-if="showForm">
        <form class="card" @submit.prevent="onSubmit">
          <div class="card-header px-3">Answer the Question</div>
          <div class="card-block">
            <textarea
              v-model="newAnswerBody"
              class="form-control"
              placeholder="Share your Knowledge!"
              rows="5"
            ></textarea>
          </div>
          <div class="card-footer px-3">
            <button type="submit" class="btn btn-sm btn-success">
              Submit your Answer
            </button>
          </div>
        </form>
        <p v-if="error" class="error mt-2">{{ error }}</p>
      </div>
      <!-- if user hasn't answered, and showForm is false (this button
            has not been clicked yet), user will see a 'Answer the question'
            button. This will disappear when clicked, as it will set showForm
            to true and the previous branch will override and display the
            answer form textarea -->
      <div v-else>
        <button class="btn btn-sm btn-success" @click="showForm = true">
          Answer the Question
        </button>
      </div>

      <hr />
    </div>

    <div class="container">
      <!-- render an AnswerComponent component once for every answer
            in the 'answers' array, filled from 'getQuestionAnswers' which is
            run whenever the Question component is 'created()'-->
      <AnswerComponent
        v-for="(answer, index) in answers"
        :answer="answer"
        :requestUser="requestUser"
        :key="index"
        @delete-answer="deleteAnswer"
      />
      <div class="my-4">
        <!-- loadingAnswers set to true while waiting for a promise response
                from 'getQuestionAnswers', during this time '...loading...' will display.-->
        <p v-show="loadingAnswers">...loading...</p>
        <!-- only show this button if 'next' is not null, indicating there are
                more django pages containing further answers that may be retrieved-->
        <button
          v-show="next"
          @click="getQuestionAnswers"
          class="btn btn-sm btn-outline-success"
        >
          Load More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import { apiService } from "@/common/api.service.js";
import AnswerComponent from "@/components/Answer.vue";

export default {
  name: "Question",
  // props this component expects to be passed to it when created
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  components: {
    AnswerComponent,
  },

  data() {
    return {
      question: {},
      answers: [],
      newAnswerBody: null,
      error: null,
      userHasAnswered: false,
      showForm: false,
      next: null,
      loadingAnswers: false,
      requestUser: null,
    };
  },

  methods: {
    setPageTitle(title) {
      document.title = title;
    },
    setRequestUser() {
      this.requestUser = window.localStorage.getItem("username");
    },
    getQuestionData() {
      let endpoint = `/api/questions/${this.slug}/`;
      // run apiService promise directed at 'endpoint'. Default method is GET
      apiService(endpoint)
        // response data is used as parameter in arrow function to grab
        // question data
        .then((data) => {
          this.question = data;
          this.userHasAnswered = data.user_has_answered;
          this.setPageTitle(data.content);
        });
    },
    getQuestionAnswers() {
      let endpoint = `/api/questions/${this.slug}/answers/`;
      if (this.next) {
        endpoint = this.next;
      }
      this.loadingAnswers = true;
      // run apiService promise directed at 'endpoint'. Default method is GET
      apiService(endpoint)
        // response data is used as parameter in arrow function to grab
        // answers data
        .then((data) => {
          this.answers.push(...data.results);
          this.loadingAnswers = false;
          if (data.next) {
            this.next = data.next;
          } else {
            this.next = null;
          }
        });
    },
    onSubmit() {
      if (this.newAnswerBody) {
        let endpoint = `/api/questions/${this.slug}/answer/`;
        apiService(endpoint, "POST", { body: this.newAnswerBody }).then(
          (data) => {
            this.answers.unshift(data);
          }
        );
        this.newAnswerBody = null;
        this.showForm = false;
        this.userHasAnswered = true;
        if (this.error) {
          this.error = null;
        }
      } else {
        this.error = "You can't send an empty answer!";
      }
    },
    async deleteAnswer(answer) {
      // delete a given answer from the answers array and make a delete request to the REST API
      let endpoint = `/api/answers/${answer.id}/`;
      try {
        await apiService(endpoint, "DELETE");
        this.answers.splice(this.answers.indexOf(answer), 1)
        this.userHasAnswered = false;
      } catch (err) {
        console.log(err);
      }
    },
  },

  created() {
    this.getQuestionData();
    this.getQuestionAnswers();
    this.setRequestUser();
  },
};
</script>

<style scoped>
.author-name {
  font-weight: bold;
  color: red;
}

.answer-added {
  font-weight: bold;
  color: green;
}

.error {
  font-weight: bold;
  color: red;
}
</style>