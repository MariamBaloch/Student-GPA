<script>
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import { BASE_URL } from '../globals'
import axios from 'axios'

export default {
  name: 'StudentForm',
  data: function () {
    return {
      name: null,
      email: null
    }
  },
  components: {
    InputText,
    FloatLabel
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
        this.name = ''
        this.email = ''
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <form @submit="handleSubmit">
    <FloatLabel>
      <InputText id="username" v-model="name" @input="onChange" />
      <label for="username">Username</label>
    </FloatLabel>
    <FloatLabel>
      <InputText id="email" v-model="email" @input="onChange" type="email" />
      <label for="email">Email</label>
    </FloatLabel>
    <button>submit</button>
  </form>
</template>
