<template>
  <container-view>
    <header class="header">
      <menu-view/>
      <search-form/>
    </header>
  </container-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchForm from './search-form.vue';
import MenuView from './menu-view.vue';
import ContainerView from './container-view.vue';

export default defineComponent({
  name: 'header-view',
  components: { ContainerView, SearchForm, MenuView },
});
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 700px) {
  .header {
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 12px;
  }
}
</style>
