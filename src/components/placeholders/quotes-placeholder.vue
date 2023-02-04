<template>
  <ul>
    <li
      v-for="index in 25"
      :key="index"
    >
      <quote-placeholder />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import QuotePlaceholder from './quote-placeholder.vue';

export default defineComponent({
  name: 'QuotesPlaceholder',
  components: {QuotePlaceholder},
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style>
