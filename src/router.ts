import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
  {
    path: '/:page?',
    name: 'INDEX',
    component: () => import('./pages/home-page.vue'),
    props: route => ({ page: +route.params.page || 1 }),
  },
  {
    path: '/quote/:id',
    component: () => import('./pages/quote-page.vue'),
    props: true,
  },
  {
    path: '/search',
    name: 'SEARCH',
    component: () => import('./pages/search-page.vue'),
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
