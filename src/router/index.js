import { createRouter, createWebHistory } from "vue-router";
import Show from "~/pages/show.vue";
import Setting from "~/pages/setting.vue";
import Compare from "~/pages/compare.vue";
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
    name: "Setting",
    props: true
  },
  {
    path: "/compare",
    component: Compare,
    meta: {
      title: "方案比较",
    },
    name: "Compare",
    props: true
  },

];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
