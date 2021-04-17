<template>
    <div id="app">
        <NavbarComponent />
        <router-view />
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import NavbarComponent from "./components/Navbar.vue"

export default defineComponent({
  name: "App",
  components: {
      NavbarComponent
  },
  setup() {
    
  },
})
</script>


<style>
    html, body {
        height: 100%;
        font-family: 'Playfair Display', serif;
    }

    .btn:focus {
      box-shadow: none !important;
    }
</style>
