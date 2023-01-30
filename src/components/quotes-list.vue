<template>
  <pagination-view ref="pagination" v-if="pagination" :pagination="pagination"/>
  <ul v-if="quotes && quotes.length">
    <li
      v-for="quote in quotes"
      :key="quote.id"
    >
      <quote-card :quote="quote"/>
    </li>
  </ul>
  <pagination-view v-if="pagination" :pagination="pagination"/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PaginationView, { Pagination } from './pagination-view.vue';
import QuoteCard, { Quote } from './quote-card.vue';

export default defineComponent({
  name: 'quotes-list',
  components: { PaginationView, QuoteCard },
  props: {
    quotes: {
      type: Array as PropType<Quote[] | null>,
    },
    pagination: {
      type: Object as PropType<Pagination | null>,
    },
  },
  mounted() {
    document.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowRight') {
        this.shiftPage(1);
      } else if (e.key === 'ArrowLeft') {
        this.shiftPage(-1);
      }
    });
  },
  methods: {
    shiftPage(shift: -1 | 1) {
      if (!this.pagination) return;

      const check = shift === 1 ? 'hasNextPage' : 'hasPrevPage' as const;
      if (!(this.$refs.pagination as InstanceType<typeof PaginationView>)[check]) {
        return;
      }

      this.$router.push({
        name: 'INDEX',
        params: { page: this.pagination.page + shift },
      });
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    },
  },
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  max-width: 800px;
  margin: 0;
}
</style>
