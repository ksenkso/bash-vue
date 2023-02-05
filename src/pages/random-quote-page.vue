<template>
  <div class="page">
    <container-view>
      <div class="form">
        <rating-form v-model="minRating" />
        <button-view
          class="button"
          @click="getRandomQuote"
        >
          ↻
        </button-view>
      </div>
    </container-view>
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
import RatingForm from '../components/rating-form.vue';
import ContainerView from '../components/container-view.vue';
import ButtonView from '../components/button-view.vue';

export default defineComponent({
  name: 'RandomQuotePage',
  components: { ButtonView, ContainerView, RatingForm, QuotesList},
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

.form {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 8px;
}

.form .button {
  flex-grow: 0;
  width: 40px;
  height: 28px;
}
</style>
