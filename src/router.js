import { createWebHistory, createRouter } from 'vue-router'

import StudentForm from './components/StudentForm.vue'

import AddCourse from './components/AddCourse.vue'

import Student from './components/Student.vue'

const routes = [
  { path: '/addstudent', component: StudentForm, name: 'StudentForm' },
  { path: '/addcourse', component: AddCourse, name: 'AddCourse' }
  ,
  { path: '/Student', component: Student, name: 'Student' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
