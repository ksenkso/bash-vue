<template>
  <div class="search">
    <div class="title">Поиск: </div>
    <div class="container">
      <input
        v-model="query"
        type="search"
        @keydown.enter="search"
      >
      <button
        title="Поиск"
        @click="search"
      >
        🔍
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchForm',
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

<style>
.search {
  display: flex;
  align-items: center;
  column-gap: 8px;
  justify-content: center;
}

.container {
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  overflow: hidden;
}

input {
  height: 28px;
  border: none;
  outline-color: #a3a3a3;
  outline-offset: -1px;
  padding: 0 8px;
}

button {
  border: none;
  height: 28px;
}
</style>
