<template>
  <div class="wrapper">
    <nav class="navbar">
      <ul>
        <li><button @click="selectMenu = 'home'">HOME</button></li>
        <li><button @click="selectMenu = 'post'">POST</button></li>
        <li><button @click="selectMenu = 'todos'">TODOS</button></li>
      </ul>
    </nav>
    <component :is="currentComponent">
      <slot></slot>
    </component>
  </div>
</template>

<script>
import Todos from './Todos.vue';
import Post from './Post.vue';
import Home from './Home.vue';

export default {
  components: {
    Todos,
    Post,
    Home
  },
  data() {
    return {
      selectMenu: 'home' // Default to home page
    };
  },
  computed: {
    currentComponent() {
      switch (this.selectMenu) {
        case 'todos':
          return 'Todos';
        case 'post':
          return 'Post';
        default:
          return 'Home';
      }
    }
  }
};
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.wrapper {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

header button:hover {
  background-color: white;
}

nav.navbar {
  background-color: #0f142e;
  color: white;
  width: 100%;
  padding: 0.5rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1rem;
}

nav ul li {
  display: inline;
}

nav ul li button {
  color: white;
  background: none;
  border: none;
  cursor: pointer;
}

h1 {
  margin-top: 4rem;
}
</style>
