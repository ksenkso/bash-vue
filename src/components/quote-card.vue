<template>
  <div class="quote">
    <div class="header">
      <div class="link">
        <router-link
          class="id"
          :to="{ path: `/quote/${quote.id}` }"
        >
          #{{ quote.id }}
        </router-link>
        <button
          class="copy-link"
          @click="$emit('copy-link')"
        >
          {{ copyLinkIcon }}
        </button>
      </div>

      <div class="date">{{ quote.date }}</div>
    </div>
    <pre
      class="text"
      v-html="cleanText"
    />
    <div class="footer">
      <div class="rating">
        <button
          class="button down"
          @click="vote('down')"
        >
          -
        </button>
        <div class="value">{{ quote.rating }}</div>
        <button
          class="button up"
          @click="vote('up')"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import {api, Quote, Vote} from '../api';

export default defineComponent({
  name: 'QuoteCard',
  props: {
    quote: {
      type: Object as PropType<Quote>,
      required: true,
    },
    copied: Boolean,
  },
  emits: ['copy-link'],
  computed: {
    cleanText() {
      const index = this.quote.text.indexOf('<div class="quote__strips"');
      if (index === -1) {
        return this.quote.text;
      }

      return this.quote.text.substring(0, index).trim();
    },
    copyLinkIcon() {
      return this.copied ? '✨' : '🔗';
    },
  },
  methods: {
    vote(vote: Vote) {
      api.vote(this.quote.id, vote).then(({ rating }) => {
        // eslint-disable-next-line vue/no-mutating-props
        this.quote.rating = rating;
      });
    },

  },
});
</script>

<style scoped>
.quote {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  font-family: bash-monospace, monospace;
  font-weight: normal;
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
  font-family: bash-monospace, monospace;
  margin: 0;
}

.rating {
  display: flex;
  justify-content: space-between;
  max-width: 250px;
  margin: 0 auto;
}

.rating .value {
  flex-basis: 200px;
  flex-grow: 0;
  text-align: center;
}

@media screen and (max-width: 824px) {
  .rating {
    max-width: none;
  }
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
  flex-grow: 1;
  transition: background-color .1s ease-in-out;
}

.button:active {
  background-color: #7a7a7a;
}

.date {
  font-size: 12px;
  color: #333333;
}

.link {
  display: flex;
  column-gap: 8px;
}

.copy-link {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 24px;
  width: 24px;
  cursor: pointer;
  background-color: #ffffff;
}
</style>
