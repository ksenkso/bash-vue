<template>
  <div class="empty-list">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmptyList',
  props: {
    message: {
      type: String,
      default: 'Этот список цитат пуст',
    },
  },
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
