<template>
  <div class="app">
    <header-view />
    <main>
      <router-view />
    </main>
    <footer-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import FooterView from './components/footer-view.vue';
import HeaderView from './components/header-view.vue';

export default defineComponent({
  name: 'App',
  components: { HeaderView, FooterView },
});
</script>

<style scoped>
.app {
  padding: 0 12px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  padding: 28px 0;
}
</style>
