<template>
  <ul>
    <li
      v-for="index in 25"
      :key="index"
    >
      <div class="quote">
        <div class="header">
          <div class="id" />
          <div class="date" />
        </div>
        <div class="text" />
        <div class="footer" />
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QuotesPlaceholder',
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

.quote {
  width: 100%;
}

.header {
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.text {
  height: 96px;
  background-color: #d4d4d4;
  border-radius: 5px;
  white-space: pre-wrap;
  margin: 0;
}

.id {
  width: 40px;
  height: 12px;
  border-radius: 6px;
  background-color: rgba(0 28 233 / 70%);
}

.date {
  width: 180px;
  height: 8px;
  border-radius: 4px;
  background-color: rgb(213 213 213 / 70%);
}

.footer {
  height: 28px;
}
</style>
