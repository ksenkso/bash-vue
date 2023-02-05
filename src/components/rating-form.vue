<template>
  <div class="search">
    <div class="title">Рейтинг >= </div>
    <div class="container">
      <input
        v-model="value"
        type="number"
        @keydown.enter="submit"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'RatingForm',
  props: {
    modelValue: {
      type: Number as PropType<number | null>,
      default: null,
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: number) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    submit() {
      this.$emit('submit');
    },
  },
});
</script>

<style scoped>
.search {
  display: flex;
  align-items: center;
  column-gap: 8px;
  justify-content: center;
}

.container {
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  overflow: hidden;
}

input {
  height: 28px;
  border: none;
  outline-color: #a3a3a3;
  outline-offset: -1px;
  padding: 0 8px;
}

button {
  border: none;
  height: 28px;
}
</style>
