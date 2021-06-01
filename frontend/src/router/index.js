import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Question from "../views/Question.vue";
import QuestionEditor from "../views/QuestionEditor.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/question/:slug",
    name: "question",
    component: Question,
    props: true
  },
  {
    path: "/ask",
    name: "question-editor",
    component: QuestionEditor,
  },
];

const router = createRouter({
  history: createWebHistory(//process.env.BASE_URL
    ),
  routes,
});

export default router;
