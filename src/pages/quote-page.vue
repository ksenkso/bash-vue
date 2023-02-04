<template>
  <quotes-list
    :is-loading="isLoading"
    :quotes="quote ? [quote] : null"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue';

import QuotesList from '../components/quotes-list.vue';

export default defineComponent({
  name: 'QuotePage',
  components: {QuotesList },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      quote: null,
    };
  },
  mounted() {
    this.isLoading = true;

    fetch(`${import.meta.env.VITE_API_URL}/quotes/${this.id}`)
      .then(res => res.json())
      .then(quote => {
        this.quote = quote;
      })
      .finally(() => {
        this.isLoading = false;
      })
  }
});
</script>
