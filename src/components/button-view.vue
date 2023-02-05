<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'button-view',
});
</script>

<style scoped>
.button {
  border: none;
  background-color: #d4d4d4;
  border-radius: 5px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-grow: 1;
  transition: background-color .1s ease-in-out;
}

.button:active {
  background-color: #7a7a7a;
}
</style>
