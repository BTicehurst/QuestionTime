<template>
  <div class="container mt-2">
    <h1 class="mb-3">Edit your Answer</h1>

    <!-- override default form submit behaviour to call custom 'onSubmit'
        method -->
    <form @submit.prevent="onSubmit">
      <textarea
        v-model="answerBody"
        class="form-control"
        rows="3"
      ></textarea>
      <br />
      <button type="submit" class="btn btn-success">Publish your answer</button>
    </form>
    <p v-if="error" class="muted mt-2">{{ error }}</p>
  </div>
</template>

<script>
import { apiService } from "@/common/api.service.js";

export default {
  name: "AnswerEditor",
  props: {
    id: {
      type: Number,
      required: true
    },
    // These below are being declared and assigned to this component's data()
    // in the 'beforeRouteEnter' below instead.

    // previousAnswer: {
    //     type: String,
    //     required: true
    // },
    // questionSlug: {
    //     type: String,
    //     required: true
    // }

  },
  data() {
      return {
          questionSlug: null,
          answerBody: null,
          error: null
      }
  },
  methods: {
      onSubmit() {
          if (this.answerBody) {
            let endpoint = `/api/answers/${this.id}/`
            apiService(endpoint, "PUT", { body: this.answerBody })
                .then(() => {
                    this.$router.push({
                        name: "question",
                        params: {slug: this.questionSlug}
                    })
                })
          } else {
              this.error = "You can't submit an empty answer"
          }
      }
  },
  // this will run before this route/component is entered.
  // this allows us to just be passed the answer's 'id' value from a previous
  // component, and then this component will grab all the other data that it
  // needs via an API call.
  // This stops the component from being dependent on multiple values or
  // and entire object being passed from the calling component.
  // This makes it self-sufficient

  async beforeRouteEnter(to, from, next) {
    let endpoint = `/api/answers/${to.params.id}/`;
    let data = await apiService(endpoint);
    // to.params.previousAnswer = data.body;
    // to.params.questionSlug = data.question_slug;
    return next(vm => (
        vm.answerBody = data.body,
        vm.questionSlug = data.question_slug
    ));
  },
};
</script>