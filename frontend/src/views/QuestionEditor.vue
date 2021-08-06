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
import { apiService } from "@/common/api.service.js"

// below is everything that will get exported to the 'App.vue' file 

export default {
    name: "QuestionEditor",
    props: {
        slug: {
            type: String,
            required: false
        }
    },
    
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
        // custom 'onSubmit' behaviour to override bootstrap form default
        onSubmit() {
            // if question_body is empty
            if (!this.question_body) {
                this.error = "You can't send an empty question!";
            // if question_body is > 240 characters
            } else if (this.question_body.length > 240) {
                this.error = "Ensure this field has no more than 240 characters";
            } else {
                
                let endpoint = "/api/questions/";
                let method = "POST";

                if (this.slug !== undefined) {
                    endpoint += `${ this.slug }/`;
                    console.log('endpoint is', endpoint)
                    method = "PUT";
                }

                // if question_body is valid, run apiService promise providing
                // the endpoint url, POST method, and the question_body as content
                // to be posted
                
                apiService(endpoint, method, {content: this.question_body})
                    // Use the response data from the apiService promise to...
                    .then(question_data => {
                        // automatically push the user to a new url/vue router
                        // page, with the url being the link to the question
                        // just posted
                        console.log('testing');
                        console.log(question_data.slug);
                        console.log('testing');
                        this.$router.push({
                            name: 'question',
                            params: { slug: question_data.slug }
                        })
                    })
            }
        }
    },
    async beforeRouteEnter (to, from, next) {
        // ...
        if (to.params.slug !== undefined) {
            let endpoint = `/api/questions/${ to.params.slug }/`;
            let data = await apiService(endpoint);
            return next(vm => (vm.question_body = data.content))
        } else {
            return next();
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