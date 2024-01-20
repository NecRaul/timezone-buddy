import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/password-reset',
      name: 'Reset',
      component: () => import('../views/PasswordResetView.vue')
    },
    {
      path: '/buddies',
      name: 'Buddies',
      component: () => import('../views/BuddiesView.vue')
    }
  ]
})

export default router
