<template>
  <div class="container">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'container-view',
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
</style>
