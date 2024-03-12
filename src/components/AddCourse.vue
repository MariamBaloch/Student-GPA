<script>
import { BASE_URL } from '../globals'
import axios from 'axios'

export default {
  name: 'AddCourse',
  components: {},
  data: () => ({
    name: ''
  }),
  methods: {
    handleFormChange(event) {
      this[event.target.name] = event.target.value
    },

    async handleSubmit(event) {
      event.preventDefault()
      const course = await axios.post(`${BASE_URL}/courses`, {
        name: this.name
      })
      this.name = ''
      alert('this course has been added')
    }
  }
}
</script>

<template>
  <div class="form-container">
    <form @submit="handleSubmit">
      <input
        placeholder="Add Course"
        :value="name"
        name="name"
        type="text"
        @input="handleFormChange"
      />
      <button class="form-button" type="submit">Add Course</button>
    </form>
  </div>
</template>

<style scoped>



</style>

