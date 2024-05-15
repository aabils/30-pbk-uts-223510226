// router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import Todos from './components/post.vue';
import Post from './components/todos.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/todos',
      name: 'Todos',
      components: Todos
    },
    {
      path: '/post',
      name: 'Post',
      components: Post
    }
  ]
});
