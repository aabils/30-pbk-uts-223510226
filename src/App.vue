<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="header">
      <q-toolbar>
        <q-btn-group flat class="rout-nav">
          <router-link to="/todos">
            <q-btn flat :outline="!isActive('/todos')" label="Todos" />
          </router-link>
          <router-link to="/posts">
            <q-btn flat :outline="!isActive('/posts')" label="Posts" />
          </router-link>
          <router-link to="/albums">
            <q-btn flat :outline="!isActive('/albums')" label="Albums" />
          </router-link>
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const isActive = (path) => route.path === path;
    return {
      isActive
    };
  }
};
</script>

<style scoped>
* {
  font-family: 'Times New Roman', Times, serif
}
body {
  background-color: #e0f7fa;
}

.header {
  background-color: #01579b !important;
  color: #e3f2fd !important;
  padding: 10px;
  box-shadow: 5px 5px 5px #004d6b4b;
}

.rout-nav button {
  color: #e3f2fd;
  font-size: 16px;
}

.rout-nav a q-btn {
  color: #01579b;
  font-size: 16px;
}

.rout-nav q-btn[flat][outline] {
  border-color: #01579b;
  color: #01579b;
}
</style>
