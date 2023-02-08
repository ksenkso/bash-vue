<template>
  <header class="header">
    <menu-view />
    <search-form />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchForm from './search-form.vue';
import MenuView from './menu-view.vue';

export default defineComponent({
  name: 'header-view',
  components: { SearchForm, MenuView },
});
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 700px){
  .header {
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 12px;
  }
}
</style>
