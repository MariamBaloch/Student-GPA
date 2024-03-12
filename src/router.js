import { createWebHistory, createRouter } from 'vue-router'

import StudentForm from './components/StudentForm.vue'
const routes = [
  { path: '/addstudent', component: StudentForm, name: 'StudentForm' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
