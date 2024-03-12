<script>
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
    <input
      placeholder="Name"
      :value="name"
      name="name"
      type="text"
      @input="onChange"
    />

    <input
      placeholder="Email"
      :value="email"
      name="email"
      type="email"
      @input="onChange"
    />

    <button>submit</button>
  </form>
</template>
