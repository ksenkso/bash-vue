<template>
  <div class="page">
    <search-form />
    <quotes-list
      :pagination="pagination"
      :quotes="list"
      :is-loading="isLoading"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import {api, Order, Pagination, Quote} from '../api';
import QuotesList from '../components/quotes-list.vue';
import SearchForm from '../components/search-form.vue';

export default defineComponent({
  name: 'HomePage',
  components: { SearchForm, QuotesList },
  props: {
    page: {
      type: Number,
      required: true,
    },
    order: {
      type: Object as PropType<Order>,
      default: () => ({ field: 'id', dir: 'ASC' }),
    }
  },
  data() {
    return {
      isLoading: true as boolean,
      list: null as Array<Quote> | null,
      pagination: null as Pagination | null,
    }
  },
  created() {
    this.$watch(() => this.$route.params, () => {
      this.getQuotes();
    }, { immediate: true, })
  },
  methods: {
    getQuotes() {
      const loading = setTimeout(() => {
        this.isLoading = true;
      }, 500);
      api.list({ page: this.page, order: this.order })
        .then(({ list, pagination }) => {
          clearTimeout(loading);
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
<style scoped>
.page {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}
</style>
