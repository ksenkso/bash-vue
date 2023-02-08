<template>
  <nav class="menu">
    <ul>
      <li>
        <router-link :to="{ name: 'INDEX' }">История</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'RATING' }">Топ</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'RANDOM' }">Рандом</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'YEAR', params: { year: 'first' } }">По годам</router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MenuView',
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 12px;
  display: flex;
  column-gap: 16px;
  margin: 0;
  justify-content: center;
}

a {
  padding: 4px 8px;
  background-color: #d4d4d4;
  color: black;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
}

a.router-link-active {
  background-color: #7a7a7a;
  color: white;
}
</style>
