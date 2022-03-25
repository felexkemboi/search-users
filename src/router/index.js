import { createWebHistory, createRouter } from 'vue-router';
import GithubUsers from '../views/Users.vue';
import UserProfile from '../views/UserDetails.vue';

const routes = [
  {
    path: '/',
    name: 'users',
    component: GithubUsers,
  },
  {
    path: '/users/:user',
    name: 'user',
    component: UserProfile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
