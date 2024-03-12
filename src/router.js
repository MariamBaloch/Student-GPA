import { createWebHistory, createRouter } from 'vue-router'

import StudentForm from './components/StudentForm.vue'
import AddCourse from './components/AddCourse.vue'
import HomePage from './components/HomePage.vue'
const routes = [
  { path: '/', component: HomePage, name: 'HomePage' },
  { path: '/addstudent', component: StudentForm, name: 'StudentForm' },
  { path: '/addcourse', component: AddCourse, name: 'AddCourse' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
