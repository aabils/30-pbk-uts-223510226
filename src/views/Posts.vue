<template>
  <div class="post-container">
    <h1>Daftar Postingan</h1>
    <div class="user-selection">
      <label for="user">Pilih User:</label>
      <select v-model="selectedUser">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </div>
    <div v-if="posts.length" class="posts">
      <ul>
        <li v-for="post in posts" :key="post.id" class="post-item">
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
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`)
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

<style scoped>
.post-container {
  background-color: #f0f8ff;
  border: 2px solid #00aaff;
  border-radius: 10px;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 20px;
}

h1 {
  color: #0077cc;
  font-size: 32px;
  text-align: center;
  font-weight: bold;
}

.user-selection {
  margin-bottom: 20px;
}

label {
  color: #0077cc;
  margin-right: 10px;
}

select {
  padding: 10px;
  border: 1px solid #00aaff;
  border-radius: 5px;
}

.posts {
  margin-top: 20px;
}

.post-item {
  background-color: #e0f7ff;
  border: 1px solid #00aaff;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
}

.post-item h3 {
  color: #005f99;
}

.post-item p {
  color: #003f66;
}

p {
  color: #003f66;
}
</style>
