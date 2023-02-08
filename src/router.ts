import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { api } from './api';


const routes: RouteRecordRaw[] = [
  {
    path: '/year/:year/:page?',
    name: 'YEAR',
    component: () => import('./pages/quotes-by-year.vue'),
    props: route => ({
      params: {
        page: +route.params.page || 1,
        year: route.params.year,
      },
      provider: api.listByYear.bind(api),
      minYear: 2004,
      maxYear: 2022,
    }),
  },
  {
    path: '/:page?',
    name: 'INDEX',
    component: () => import('./pages/quotes-page.vue'),
    props: route => ({
      params: {
        page: +route.params.page || 1,
      },
      provider: api.list.bind(api),
    }),
  },
  {
    path: '/quote/:id',
    name: 'QUOTE',
    component: () => import('./pages/quote-page.vue'),
    props: true,
  },
  {
    path: '/search',
    name: 'SEARCH',
    component: () => import('./pages/search-page.vue'),
  },
  {
    path: '/rating/:page?',
    name: 'RATING',
    component: () => import('./pages/quotes-page.vue'),
    props: route => ({
      page: +route.params.page || 1,
      order: {
        field: 'rating',
        dir: 'DESC',
      },
    })
  },
  {
    path: '/random',
    name: 'RANDOM',
    component: () => import('./pages/random-quote-page.vue')
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
