<template>
  <quotes-list :pagination="pagination" :quotes="list" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QuotesList from '../components/quotes-list.vue';
import { Quote } from '../components/quote-card.vue';
import { Pagination } from '../components/pagination-view.vue';
import { api } from '../api';

export default defineComponent({
  name: 'search-page',
  components: { QuotesList },
  data() {
    return {
      isLoading: true as boolean,
      list: null as Array<Quote> | null,
      pagination: null as Pagination | null,
    }
  },
  created() {
    this.$watch(() => this.$route.query, () => {
      this.getQuotes();
    }, { immediate: true, })
  },
  methods: {
    getQuotes() {
      this.isLoading = true;
      api.search(this.$route.query.query as string)
        .then(({ list, pagination }) => {
          this.list = list;
          this.pagination = pagination;
        })
        .finally(() => {
          this.isLoading = false;
        })
    }
  }
});
</script>
