import { createRouter, createWebHistory } from "vue-router";
import Show from "~/pages/show.vue";
import Setting from "~/pages/setting.vue";
import { createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Show,
    name: "show",

  },

  {
    path: "/setting",
    component: Setting,
    meta: {
      title: "设置界面",
    },
  },

];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
