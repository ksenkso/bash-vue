<template>
  <div class="pagination">
    <router-link class="page first" v-if="firstPage" :to="firstPage">{{ '<<' }}</router-link>
    <router-link class="page" v-if="prevPage" :to="prevPage">{{ prevPage.params.page }}</router-link>
    <div class="page current">{{ pagination.page }}</div>
    <router-link class="page" v-if="nextPage" :to="nextPage">{{ nextPage.params.page }}</router-link>
    <router-link class="page last" v-if="lastPage" :to="lastPage">{{ '>>' }}</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export default defineComponent({
  name: 'pagination-view',
  props: {
    pagination: {
      type: Object as PropType<Pagination>,
      required: true,
    },
  },
  computed: {
    firstPage() {
      if (this.prevPage && this.prevPage.params.page !== 1) {
        return {
          params: { page: 1 }
        };
      }

      return null;
    },
    lastPage() {
      if (this.nextPage && this.nextPage.params.page !== this.pagination.totalPages) {
        return {
          params: { page: this.pagination.totalPages }
        };
      }

      return null;
    },
    prevPage() {
      if (!this.hasPrevPage) {
        return null;
      }

      return {
        name: 'INDEX',
        params: {
          page: this.pagination.page - 1,
        }
      }
    },
    nextPage() {
      if (!this.hasNextPage) {
        return null;
      }

      return {
        name: 'INDEX',
        params: {
          page: this.pagination.page + 1,
        }
      }
    },
    hasNextPage() {
      return this.pagination.page !== this.pagination.totalPages;
    },
    hasPrevPage() {
      return this.pagination.page !== 1;
    },
  }
});
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 6px;
  max-width: 300px;
  margin: 0 auto;
}

.page {
  padding: 6px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d4d4d4;
  border-radius: 5px;
  color: #000;
  text-decoration: none;
  font-family: monospace;
}

.current {
  background-color: #7a7a7a;
  color: white;
}

.first {
  margin-right: 10px;
}

.last {
  margin-left: 10px;
}
</style>
