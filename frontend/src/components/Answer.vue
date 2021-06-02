<template>
    <div class="single-answer">
        <p class="text-muted">
            <strong>{{ answer.author }}</strong> &#8901; {{ answer.created_at }}
        </p>
        <p>{{ answer.body }}</p>
        <hr>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: "AnswerComponent",

    // props this component expects to be passed to it when created
    props: {
        answer: {
            type: Object,
            required: true
        }
    },
    setup() {
        
    },
})
</script>
