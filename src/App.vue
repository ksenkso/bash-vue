<template>
  <div class="app">
    <header>
      <menu-view />
      <div class="search">
        <input type="search" v-model="query" @keydown.enter="search">
        <button @click="search">search</button>
      </div>
    </header>
    <main>
      <router-view/>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import MenuView from './components/menu-view.vue';

export default defineComponent({
  name: 'App',
  components: { MenuView },
  data() {
    return {
      query: ''
    };
  },
  methods: {
    search() {
      this.$router.push({
        name: 'SEARCH',
        query: {
          query: this.query,
        },
      });
    }
  }
});
</script>

