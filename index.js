import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./src/views/Login.vue') },
  {
    path: '/gallery',
    component: () => import('./src/views/Gallery.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Garde de navigation
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('userToken');
    if (token) {
      next();
    } else {
      next('/');
    }
  } else {
    next()
  }
})


export default router
