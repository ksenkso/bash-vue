<template>
  <quotes-list
    :pagination="pagination"
    :quotes="list"
    :is-loading="isLoading"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { api } from '../api';
import { Pagination } from '../components/pagination-view.vue';
import { Quote } from '../components/quote-card.vue';
import QuotesList from '../components/quotes-list.vue';
import { Order } from '../types';

export default defineComponent({
  name: 'HomePage',
  components: { QuotesList },
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
        .then((res) => res.json())
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

