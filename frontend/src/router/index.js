import { createRouter, createWebHistory } from "vue-router";
import AnswerEditor from "../views/AnswerEditor.vue";
import Home from "../views/Home.vue";
import Question from "../views/Question.vue";
import QuestionEditor from "../views/QuestionEditor.vue";
import NotFound from "../views/NotFound.vue";


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
    path: "/ask/:slug?",
    name: "question-editor",
    component: QuestionEditor,
    props: true
  },
  {
    path: "/answer/:id",
    name: "answer-editor",
    component: AnswerEditor,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page-not-found',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(//process.env.BASE_URL
    ),
  routes,
});

export default router;
