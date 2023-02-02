<template>
  <div class="app">
    <header>
      <menu-view />
      <search-form />
    </header>
    <main>
      <router-view/>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import MenuView from './components/menu-view.vue';
import SearchForm from './components/search-form.vue';

export default defineComponent({
  name: 'App',
  components: { SearchForm, MenuView },
});
</script>

<style scoped>
.app {
  padding: 0 12px;
}

main {
  padding: 28px 0;
}
</style>
