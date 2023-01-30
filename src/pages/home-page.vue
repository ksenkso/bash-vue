<template>
  <quotes-list :pagination="pagination" :quotes="list" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Quote } from '../components/quote-card.vue';
import { Pagination } from '../components/pagination-view.vue';
import QuotesList from '../components/quotes-list.vue';

export default defineComponent({
  name: 'home-page',
  components: { QuotesList },
  props: {
    page: {
      type: Number,
      required: true,
    },
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
      fetch(`${import.meta.env.VITE_API_URL}/quotes/page/${this.page}`)
        .then((res) => res.json())
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

