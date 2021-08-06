<template>
  <div id="app">
    <!-- load the navbar component, and then whatever component router-view
        is currently pointing to -->
    <NavbarComponent />
    <router-view />
  </div>
</template>

<script>
import { apiService } from "@/common/api.service.js";
import { defineComponent } from "@vue/composition-api";
import NavbarComponent from "@/components/Navbar.vue";

export default defineComponent({
  name: "App",
  components: {
    NavbarComponent,
  },
  methods: {
    async setUserInfo() {
      const data = await apiService("/api/user/");
      const requestUser = data["username"];
      window.localStorage.setItem("username", requestUser);
    },
  },
  created() {
    this.setUserInfo();
  },
  setup() {},
});
</script>


<style>
html,
body {
  height: 100%;
  font-family: "Playfair Display", serif;
}

.btn:focus {
  box-shadow: none !important;
}
</style>
