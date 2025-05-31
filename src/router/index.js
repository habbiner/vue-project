import { createRouter, createWebHistory } from 'vue-router'
import TheDashBoard from '@/views/TheDashBoard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: TheDashBoard,
      meta: {
        title: 'AgroTech | Dash'
      }
    },
  ],
})

export default router