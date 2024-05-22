<template>
    <div>
      <h1>Daftar Postingan</h1>
      <div>
        <label for="user">Pilih User:</label>
        <select v-model="selectedUser">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div v-if="posts.length">
        <h2>Postingan User</h2>
        <ul>
          <li v-for="post in posts" :key="post.id">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Pilih user untuk melihat postingan</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [],
        selectedUser: null,
        posts: []
      };
    },
    created() {
      this.fetchUsers();
    },
    watch: {
      selectedUser(newUserId) {
        this.fetchPosts();
      }
    },
    methods: {
      fetchUsers() {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(data => {
            this.users = data;
          });
      },
      fetchPosts() {
        if (this.selectedUser) {
          fetch('https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}')
            .then(response => response.json())
            .then(data => {
              this.posts = data;
            });
        } else {
          this.posts = [];
        }
      }
    }
  };
  </script>