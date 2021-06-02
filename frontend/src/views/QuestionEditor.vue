<template>
    <div class="container mt-2">
        <h1 class="mb-3">Ask a Question</h1>

        <!-- override default form submit behaviour to call custom 'onSubmit'
        method -->
        <form @submit.prevent="onSubmit">
            <textarea 
            v-model="question_body"
            class="form-control"
            placeholder="What do you want to ask?"
            rows="3"
            ></textarea>
            <br>
            <button
                type="submit"
                class="btn btn-success"
                >Publish
            </button>
        </form>
        <p v-if="error" class="muted mt-2">{{ error }}</p>
    </div>
</template>

<script>
import { apiService } from "../common/api.service.js"

// below is everything that will get exported to the 'App.vue' file 

export default {
    name: "QuestionEditor",
    
    // Data passes and initialises the models to be used within the component
    // to App.vue, so they can be used within the methods: and template

    data() {
        return {
            question_body: null,
            error: null,
        }
    },

    // declare methods to be usable within the component's template, or 
    // override methods used within the base template/app.vue while this
    // component is open

    methods: {
        onSubmit() {
            if (!this.question_body) {
                this.error = "You can't send an empty question!";
            } else if (this.question_body.length > 240) {
                this.error = "Ensure this field has no more than 240 characters";
            } else {
                let endpoint = "api/questions/";
                let method = "POST";

                apiService(endpoint, method, {content: this.question_body})
                    .then(question_data => {
                        this.$router.push({
                            name: 'question',
                            params: { slug: question_data.slug }
                        })
                    })
            }
        }
    },
    // logic to be run when the component is loaded/created
    created() {
        document.title = "Editor - QuestionTime";
    },
    setup() {
        
    },
}
</script>