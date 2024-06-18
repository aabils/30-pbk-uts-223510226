<template>
  <div class="activity-container">
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
</template>

<script>
export default {
  data() {
    return {
      newActivity: {
        name: '',
        dateTime: ''
      },
      activities: []
    };
  },
  methods: {
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

<style scoped>
.activity-container {
  background-color: #f0f8ff;
  border: 2px solid #00aaff;
  border-radius: 10px;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 50px;
}

h1 {
  color: #0077cc;
  font-size: 32px;
  text-align: center;
  font-weight: bold;
}

input[type="text"], input[type="datetime-local"] {
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #00aaff;
  border-radius: 5px;
}

button {
  background-color: #00aaff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 5px;
}

button:hover {
  background-color: #0077cc;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #00aaff;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #0077cc;
  color: white;
}

td input{
  text-align:center;
}

.completed {
  text-decoration: line-through;
  color: #ff4500;
}

.datetime-container {
  margin-top: 10px;
}

.datetime-container label {
  display: block;
  margin-bottom: 5px;
  color: #0077cc;
}
</style>
