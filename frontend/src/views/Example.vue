<template>
  <div class="example">
    <h1>First single-file component</h1>
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: "example",
    data() {
        return {
            message: "Hello World!"
        }
    },

    setup() {        
    },
})
</script>


<style scoped>
    h1 {
        color: red;
    }
</style>