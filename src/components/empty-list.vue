<template>
  <div class="empty-list">
    Этот список цитат пуст
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'empty-list',
});
</script>

<style scoped>
.empty-list {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}
</style>
