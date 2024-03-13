<script>
export default {
  name: 'NavBar'
}
</script>

<template>
  <nav>
    <div class="topnav">
      <router-link class="active" to="/">Home</router-link>
      <router-link to="/addstudent">Add Student</router-link>
      <router-link to="/addcourse">Add Course</router-link>
    </div>
  </nav>
</template>

<style>
.topnav {
  background-color: #4a4179;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #ffffff;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  font-weight: bold;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: rgba(255, 255, 255, 0.154);
  color: #ffffff;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #ffffff;
  color: #4a4179;
}
</style>
