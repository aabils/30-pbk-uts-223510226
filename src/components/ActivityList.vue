<template>
  <div class="wrapper">
    <nav class="navbar">
      <ul>
        <li><button @click="selectMenu = 'post'">POST</button></li>
        <li><button @click="selectMenu = 'todos'">TODOS</button></li>
      </ul>
    </nav>
    <div v-if="selectMenu === 'todos'">
      <h1>Daftar Aktivitas</h1>
      <input type="text" v-model="newActivity.name" placeholder="Tambahkan kegiatan baru">
      <div class="datetime-container">
        <label for="datetime">Tanggal & Jam:</label>
        <input id="datetime" type="datetime-local" v-model="newActivity.dateTime">
      </div>
      <button @click="addActivity">Tambah</button>
      <table>
        <thead>
          <tr>
            <th>Aktivitas</th>
            <th>Tanggal & Jam</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(activity, index) in activities" :key="index">
            <td>{{ activity.name }}</td>
            <td>{{ formatDate(activity.dateTime) }}</td>
            <td>
              <input type="checkbox" v-model="activity.completed">
              <span :class="{ 'completed': activity.completed }">{{ activity.completed ? 'Selesai' : 'Belum Selesai' }}</span>
            </td>
            <td>
              <button @click="toggleEditMode(activity)">{{ activity.editMode ? 'Batal' : 'Edit' }}</button>
              <button v-if="activity.editMode" @click="updateActivity(activity)">Simpan</button>
              <button @click="removeActivity(index)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="selectMenu === 'post'">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectMenu: 'todos',
      newActivity: {
        name: '',
        dateTime: ''
      },
      activities: [],
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
    },
    selectMenu(newMenu) {
      if (newMenu === 'post' && this.selectedUser) {
        this.fetchPosts();
      }
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
    },
    addActivity() {
      if (this.newActivity.name.trim() !== '' && this.newActivity.dateTime.trim() !== '') {
        this.activities.push({
          name: this.newActivity.name,
          dateTime: this.newActivity.dateTime,
          completed: false,
          editMode: false
        });
        this.newActivity.name = '';
        this.newActivity.dateTime = '';
      }
    },
    removeActivity(index) {
      this.activities.splice(index, 1);
    },
    toggleEditMode(activity) {
      activity.editMode = !activity.editMode;
    },
    updateActivity(activity) {
      activity.editMode = false;
    },
    formatDate(dateTime) {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(dateTime).toLocaleDateString('en-US', options);
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

.completed {
  text-decoration: line-through;
}

.datetime-container {
  margin-top: 10px;
}

.datetime-container label {
  display: block;
  margin-bottom: 5px;
}
</style>
