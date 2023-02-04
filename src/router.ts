import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
  {
    path: '/:page?',
    name: 'INDEX',
    component: () => import('./pages/quotes-page.vue'),
    props: route => ({
      page: +route.params.page || 1,
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
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
