<script>
import { BASE_URL } from '../globals'
import axios from 'axios'

export default {
  name: 'Student',
  components: {},
  data: () => ({
    
  }),
  methods: {
    
    },

    
  }

</script>


<template>
  <div class="student-container">
    <form @submit="handleSubmit">
      <input
        placeholder="Add Course"
        :value="name"
        name="name"
        type="text"
        @input="handleFormChange"
      />
      <button type="submit">Add Course</button>
    </form>
  </div>
</template>