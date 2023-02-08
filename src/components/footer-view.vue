<template>
  <footer class="footer">
    <h3 class="title">Горячие клавиши</h3>
    <div class="shortcuts">
      <div
        v-if="isRandom"
        class="shortcut"
      >
        <kbd>R</kbd> ➝ Новая случайная цитата
      </div>
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
  computed: {
    isRandom() {
      return this.$route.name === 'RANDOM';
    },
  },
});
</script>

<style scoped>
.title {
  margin-top: 0;
}

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

kbd {
  padding: 4px;
  border: 1px solid #313131;
  border-radius: 4px;
  background-color: #282828
}
</style>
