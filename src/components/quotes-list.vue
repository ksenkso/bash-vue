<template>
  <pagination-view ref="pagination" v-if="pagination" :pagination="pagination"/>
  <quotes-placeholder v-if="isLoading" />
  <ul v-else-if="quotes && quotes.length">
    <li
      v-for="quote in quotes"
      :key="quote.id"
    >
      <quote-card :quote="quote"/>
    </li>
  </ul>
  <empty-list v-else />
  <pagination-view v-if="pagination" :pagination="pagination"/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PaginationView, { Pagination } from './pagination-view.vue';
import QuoteCard, { Quote } from './quote-card.vue';
import QuotesPlaceholder from './quotes-placeholder.vue';
import EmptyList from './empty-list.vue';

export default defineComponent({
  name: 'quotes-list',
  components: { EmptyList, QuotesPlaceholder, PaginationView, QuoteCard },
  props: {
    quotes: {
      type: Array as PropType<Quote[] | null>,
    },
    pagination: {
      type: Object as PropType<Pagination | null>,
    },
    isLoading: {
      type: Boolean,
    },
  },
  mounted() {
    document.addEventListener('keyup', (e) => {
      console.count('keyup')
      if (e.key === 'ArrowRight') {
        this.shiftPage(1);
      } else if (e.key === 'ArrowLeft') {
        this.shiftPage(-1);
      }
    });
  },
  methods: {
    shiftPage(shift: -1 | 1) {
      console.count('shiftPage');
      if (!this.pagination) return;

      const check = shift === 1 ? 'hasNextPage' : 'hasPrevPage' as const;
      if (!(this.$refs.pagination as InstanceType<typeof PaginationView>)[check]) {
        return;
      }

      console.count('push');
      this.$router.push({
        params: { page: this.pagination.page + shift },
      });
    },
  },
  updated() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 24px 0 28px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
