<script>
import { BASE_URL } from '../globals'
import axios from 'axios'
import Dialog from 'primevue/dialog'

export default {
  name: 'StudentForm',
  components: {
    Dialog
  },
  data: function () {
    return {
      name: null,
      email: null,
      visible: false
    }
  },

  methods: {
    onChange(e) {
      this[e.target.name] = e.target.value
    },
    async handleSubmit(e) {
      e.preventDefault()
      try {
        await axios.post(`${BASE_URL}/students`, {
          name: this.name,
          email: this.email
        })
        this.name = null
        this.email = null
      } catch (error) {}
    },
    showDialog() {
      if (this.name !== null && this.email !== null) {
        this.visible = true
      }
    }
  }
}
</script>

<template>
  <div class="form-container">
    <h1 class="title">Add Student</h1>
    <form @submit="handleSubmit">
      <input
        placeholder="Name"
        :value="name"
        name="name"
        type="text"
        @input="onChange"
        required
      />
      <input
        placeholder="Email"
        :value="email"
        name="email"
        type="email"
        @input="onChange"
        required
      />
      <button class="form-button" @click="showDialog">Add Student</button>
      <Dialog
        v-model:visible="visible"
        modal
        header="Success."
        :style="{ width: '15rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <p class="m-0">Student has been Added</p>
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
