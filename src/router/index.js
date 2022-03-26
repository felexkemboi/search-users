import { createWebHistory, createRouter } from 'vue-router';
import GithubUsers from '../views/Users.vue';

const routes = [
  {
    path: '/',
    name: 'users',
    component: GithubUsers,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
