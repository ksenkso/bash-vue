<template>
  <footer class="footer">
    <h3>Горячие клавиши</h3>
    <div class="shortcuts">
      <div class="shortcut">
        <kbd>ArrowRight</kbd> ➝ На страницу вперед
      </div>
      <div class="shortcut">
        <kbd>ArrowLeft</kbd> ➝ На страницу назад
      </div>
      <div class="shortcut">
        <kbd>L</kbd> ➝ На год вперед
      </div>
      <div class="shortcut">
        <kbd>J</kbd> ➝ На год назад
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'footer-view',
});
</script>

<style scoped>
.footer {
  padding: 24px;
  background-color: #404040;
  color: #ffffff;
  margin: auto -12px 0;
}

.shortcuts {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
</style>
