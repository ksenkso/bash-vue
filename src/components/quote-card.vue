<template>
  <div class="quote">
    <div class="header">
      <router-link class="id" :to="{ path: `/quote/${quote.id}` }">#{{quote.id}}</router-link>
      <div class="date">{{quote.date}}</div>
    </div>
    <pre class="text" v-html="quote.text" />
    <div class="footer">
      <div class="rating">
        <button
          class="button down"
          @click="vote('down')"
        >-</button>
        <div class="value">{{quote.rating}}</div>
        <button
          class="button up"
          @click="vote('up')"
        >+</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { api, Vote } from '../api';

export interface Quote {
  id: number;
  text: string;
  rating: number;
  date: string;
}

export default defineComponent({
  name: 'quote-card',
  props: {
    quote: {
      type: Object as PropType<Quote>,
      required: true,
    },
  },
  methods: {
    vote(vote: Vote) {
      api.vote(this.quote.id, vote)
        .then(({ rating }) => {
          this.quote.rating = rating;
        })
    }
  }
});
</script>

<style scoped>
.quote {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text {
  padding: 8px 12px;
  background-color: #d4d4d4;
  border-radius: 5px;
  white-space: pre-wrap;
  margin: 0;
}

.rating {
  display: flex;
  justify-content: space-between;
  max-width: 250px;
  margin: 0 auto;
}

.button {
  border: none;
  background-color: #d4d4d4;
  border-radius: 5px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
