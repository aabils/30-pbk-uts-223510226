import { createRouter, createWebHistory } from 'vue-router';

import Todos from '../views/Todos.vue';
import Posts from '../views/Posts.vue';
import Albums from '../views/Albums.vue';
import Photos from '../views/Photos.vue';

const routes = [
  {
    path: '/todos',
    name: 'Todos',
    component: Todos,
  },
  {
    path: '/posts',
    name: 'Post',
    component: Posts,
  },
  {
    path: '/albums',
    name: 'Albums',
    component: Albums,
  },
  {
    path: '/albums/:id',
    name: 'Photos',
    component: Photos,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
