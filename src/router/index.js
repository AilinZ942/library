import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
      path: '/logout',
      name: 'Logout',
      beforeEnter: (to, from, next) => {
        const isAuthed = localStorage.getItem('isAuthed') === 'true'
        if (!isAuthed) {
          window.dispatchEvent(new CustomEvent('logout:denied'))
          return next(false)
        }
        localStorage.removeItem('isAuthed')
        localStorage.removeItem('authedUser')
        next({ name: 'Login' })
      }
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthed = localStorage.getItem('isAuthed') === 'true'
  if (to.meta?.requiresAuth && !isAuthed) {
    window.dispatchEvent(new CustomEvent('auth:denied', { detail: { to: to.fullPath } }))
    return next(false)   
  }
  next()
})


export default router