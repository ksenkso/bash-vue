<template>
  <div class="page">
    <div class="form">
      <input
        id="min-rating"
        v-model="minRating"
        type="number"
        name="min-rating"
      >
      <button
        class="reload"
        @click="getRandomQuote"
      >
        reload
      </button>
    </div>
    <quotes-list
      :is-loading="isLoading"
      :quotes="quote ? [quote] : null"
      :empty-list-message="noQuoteMessage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {api, Quote} from '../api';
import QuotesList from '../components/quotes-list.vue';

export default defineComponent({
  name: 'RandomQuotePage',
  components: {QuotesList},
  data() {
    return {
      isLoading: false,
      quote: null as Quote | null,
      minRating: null as number | null,
    };
  },
  computed: {
    noQuoteMessage() {
      return this.minRating === null
        ? 'Цитаты с таким рейтингом не нашлось'
        : 'Цитат нет совсем, кто-то уронил бд';
    }
  },
  created() {
    this.getRandomQuote();
  },
  methods: {
    getRandomQuote() {
      const loading = setTimeout(() => {
        this.isLoading = true;
      }, 500);
      api.random({ minRating: this.minRating })
          .then((quote: Quote) => {
            console.log('quote', quote)
            clearTimeout(loading);
            this.quote = quote;
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
  row-gap: 8px;
  align-items: center;
}

input {

}
</style>
