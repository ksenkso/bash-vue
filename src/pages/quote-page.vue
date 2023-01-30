<template>
  <div v-if="isLoading" class="loader">
    Loading...
  </div>
  <quote-card v-if="quote" :quote="quote" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QuoteCard from '../components/quote-card.vue';

export default defineComponent({
  name: 'quote-page',
  components: { QuoteCard },
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
