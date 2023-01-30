<template>
  <div class="app">
    <header>
      <nav>
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
        </ul>
      </nav>
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

export default defineComponent({
  name: 'App',
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
