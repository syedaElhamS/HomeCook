<template>
  <div>
<b-jumbotron header="Home Cook">
      <h1 class="home_title"><font face ="Arial black">Welcome!</font></h1>
      <b-button class="btn_message" variant="primary" @click="jump_to_recipes()" >Create a recipe</b-button>
      <b-button class="btn_message" variant="success" @click="jump_to_users()" >Create a user</b-button>
</b-jumbotron>
</div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {}
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
    jump_to_recipes() {
      this.$router.push({ path: '/recipes' })
    },
    jump_to_users() {
      this.$router.push({ path: '/users' })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
