<script>
export default {
  name: 'NavBar'
}
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/addstudent">Add Student</router-link>
    <router-link to="/addcourse">Add Course</router-link>
    <router-link to="/Student">Student</router-link>
  </nav>
</template>
