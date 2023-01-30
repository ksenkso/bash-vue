<template>
  <pagination-view ref="pagination" v-if="pagination" :pagination="pagination"/>
  <ul v-if="list && list.length">
    <li
      v-for="quote in list"
      :key="quote.id"
    >
      <quote-card :quote="quote" />
    </li>
  </ul>
  <pagination-view v-if="pagination" :pagination="pagination"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QuoteCard, { Quote } from '../components/quote-card.vue';
import PaginationView, { Pagination } from '../components/pagination-view.vue';

export default defineComponent({
  name: 'quotes-list',
  components: { PaginationView, QuoteCard },
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
      const check = shift === 1 ? 'hasNextPage' : 'hasPrevPage' as const;
      if (!(this.$refs.pagination as InstanceType<typeof PaginationView>)[check]) {
        return;
      }

      this.$router.push({
        name: 'INDEX',
        params: { page: this.page + shift },
      });
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    },
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
