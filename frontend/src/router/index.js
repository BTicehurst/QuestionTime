import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Question from "../views/Question.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/question/:slug",
    name: "question",
    component: Question,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(//process.env.BASE_URL
    ),
  routes,
});

export default router;
