<template>
  <div>
    <nav class="navbar">
    </nav>
    <div id="app">
      <ActivityList/>
    </div>
  </div>
</template>

<script>
import ActivityList from './components/ActivityList.vue';

export default {
  components: {
    ActivityList
  }
};
</script>



<style>
body {
  margin: 0;
  padding: 0;
}

.navbar {
  background-color: #333;
  color: white;
  width: 100%;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.navbar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 2rem;
}

.navbar ul li {
  display: inline;
}

.navbar ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

#app {
  font-family: Arial, sans-serif;
  margin: 0 auto;
  padding: 20px;
  max-width: 600px;
  padding-top: 80px; /* Tambahkan padding atas untuk menghindari navbar tetap */
}
</style>
