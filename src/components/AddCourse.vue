<script>
import { BASE_URL } from '../globals'
import axios from 'axios'
import Dialog from 'primevue/dialog'
export default {
  name: 'AddCourse',
  components: {
    Dialog
  },
  data: () => ({
    name: null,
    visible: false
  }),
  methods: {
    handleFormChange(event) {
      this[event.target.name] = event.target.value
    },

    async handleSubmit(event) {
      event.preventDefault()
      await axios.post(`${BASE_URL}/courses`, {
        name: this.name
      })
      this.name = null
    },
    showDialog() {
      if (this.name !== null) {
        this.visible = true
      }
    }
  }
}
</script>

<template>
  <div class="form-container">
    <form @submit="handleSubmit">
      <h1 class="title">Add Course</h1>
      <input
        placeholder="Course Name"
        :value="name"
        name="name"
        type="text"
        @input="handleFormChange"
        required
      />
      <button class="form-button" type="submit" @click="showDialog">
        Add Course
      </button>
      <Dialog
        v-model:visible="visible"
        modal
        header="Success."
        :style="{ width: '15rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <p class="m-0">Course has been Added</p>
      </Dialog>
    </form>
  </div>
</template>

<style scoped>
input {
  background: inherit;
  border: 1px solid #4a4179;
}

input {
  width: 70%;
  margin: 0.5em auto;
  padding: 0.6em 1em;
  border-radius: 10px;

  color: #ffffff;
  font-size: 1.2rem;
  transition: all 0.2s ease;
}
input:focus,
input:active {
  outline: none;
  background: #dad4fa;
}
</style>