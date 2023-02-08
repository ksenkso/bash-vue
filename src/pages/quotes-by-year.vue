<template>
  <div class="page">
    <div class="year-input">
      <div class="year-label">
        Год: <input class="year" v-model="year" type="number" :min="minYear" :max="maxYear" @change="onYearChange">
      </div>
      <input class="year-slider" type="range" step="1" :min="minYear" :max="maxYear" v-model.number="year" @change="onYearChange">
    </div>
    <quotes-list
      :pagination="pagination"
      :quotes="list"
      :is-loading="isLoading"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { ListParams, ListProvider, Pagination, Quote, YearParam } from '../api';
import QuotesList from '../components/quotes-list.vue';
import SearchForm from '../components/search-form.vue';
import PaginationView from '../components/pagination-view.vue';

function resolveYear(year: YearParam | undefined, min: number, max: number) {
  if (!year) return min;
  if (year === 'last') return max;
  if (year === 'first') return min;

  const parsed = +year;

  if (isNaN(parsed)) {
    return max;
  }

  return parsed;
}

export default defineComponent({
  name: 'QuotesByYear',
  components: { PaginationView, SearchForm, QuotesList },
  props: {
    params: {
      type: Object as PropType<ListParams>,
      default: () => ({
        page: 1,
        order: { field: 'id', dir: 'ASC' },
      })
    },
    provider: {
      type: Function as PropType<ListProvider>,
      required: true,
    },
    minYear: {
      type: Number,
      required: true,
    },
    maxYear: {
      type: Number,
      required: true,
    },
  },
  data() {
    const year = resolveYear(this.params?.year, this.minYear, this.maxYear);
    console.log(year, typeof year);

    return {
      isLoading: true as boolean,
      list: null as Array<Quote> | null,
      pagination: null as Pagination | null,
      year,
    }
  },
  created() {
    this.$watch(() => this.$route.params, () => {
      this.getQuotes();
    }, { immediate: true, })
  },
  mounted() {
    document.addEventListener('keyup', this.hotkeysHandler);
  },
  beforeUnmount() {
    document.removeEventListener('keyup', this.hotkeysHandler);
  },
  methods: {
    hotkeysHandler(e: KeyboardEvent) {
      if (e.code === 'KeyL') {
        this.shiftYear(1);
      } else if (e.code === 'KeyJ') {
        this.shiftYear(-1);
      }
    },
    shiftYear(shift: -1 | 1) {
      const nextYear = this.year + shift;
      if (nextYear > this.maxYear || nextYear < this.minYear) {
        return;
      }
      this.year = nextYear;
      this.goToYear(nextYear);
    },
    goToYear(year: number) {
      console.log(year);
      this.$router.push({
        params: {
          year,
          page: 1,
        },
      });
    },
    onYearChange() {
      this.goToYear(this.year);
    },
    getQuotes() {
      const loading = setTimeout(() => {
        this.isLoading = true;
      }, 500);
      this.provider({ ...this.params, year: this.year })
          .then(({ list, pagination }) => {
            clearTimeout(loading);
            this.list = list;
            this.pagination = pagination;
          })
          .finally(() => {
            this.isLoading = false;
          })
    },
  },
});
</script>
<style scoped>
.page {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

.year-slider {
  width: 100%;
}

.year-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.year {
  padding: 4px;
  background-color: #d4d4d4;
  border-radius: 4px;
  font-family: bash-monospace, monospace;
  border: none;
  min-width: auto;
}

.year-label {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  column-gap: 8px;
}
</style>
