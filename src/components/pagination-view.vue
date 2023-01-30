<template>
  <div class="pagination">
    <router-link class="page" v-if="prevPage" :to="prevPage">{{ prevPage.params.page }}</router-link>
    <div class="page">{{ pagination.page }}</div>
    <router-link class="page" v-if="nextPage" :to="nextPage">{{ nextPage.params.page }}</router-link>
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
  column-gap: 2px;
  max-width: 300px;
  margin: 0 auto;
}

.page {
  padding: 4px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
