<template>
  <container-view>
    <pagination-view
      v-if="pagination"
      ref="pagination"
      :pagination="pagination"
    />
    <quotes-placeholder v-if="isLoading" />
    <ul v-else-if="quotes && quotes.length">
      <li
        v-for="quote in quotes"
        :key="quote.id"
      >
        <quote-card
          :quote="quote"
          :copied="copiedQuoteLinkId === quote.id"
          @copy-link="copyLink(quote.id)"
        />
      </li>
    </ul>
    <empty-list
      v-else
      :message="emptyListMessage"
    />
    <pagination-view
      v-if="pagination"
      :pagination="pagination"
    />
  </container-view>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import {Pagination, Quote} from '../api';
import EmptyList from './empty-list.vue';
import PaginationView from './pagination-view.vue';
import QuotesPlaceholder from './placeholders/quotes-placeholder.vue';
import QuoteCard from './quote-card.vue';
import ContainerView from './container-view.vue';

type Data = {
  copiedQuoteLinkId: number | null;
}
export default defineComponent({
  name: 'QuotesList',
  components: { ContainerView, EmptyList, QuotesPlaceholder, PaginationView, QuoteCard },
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
    emptyListMessage: {
      type: String,
    },
  },
  data() {
    return {
      copiedQuoteLinkId: null,
    } as Data
  },
  mounted() {
    document.addEventListener('keyup', this.hotkeysHandler);
  },
  beforeUnmount() {
    document.removeEventListener('keyup', this.hotkeysHandler);
  },
  updated() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  },
  methods: {
    hotkeysHandler(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') {
        this.shiftPage(1);
      } else if (e.key === 'ArrowLeft') {
        this.shiftPage(-1);
      }
    },
    shiftPage(shift: -1 | 1) {
      if (!this.pagination) return;

      const check = shift === 1 ? 'hasNextPage' : 'hasPrevPage' as const;
      if (!(this.$refs.pagination as InstanceType<typeof PaginationView>)[check]) {
        return;
      }

      this.$router.push({
        params: { page: this.pagination.page + shift },
      });
    },
    copyLink(id: number) {
      const link = this.$router.resolve({ name: 'QUOTE', params: { id } }).href;
      navigator.clipboard.writeText(new URL(link, window.location.origin).toString());
      this.copiedQuoteLinkId = id;
    },
  }
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}
</style>
