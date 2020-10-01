<template>
  <div>
<p>Sign up </p>
    <b-form>
      <b-form-group id="input-group-1" label="User name:" label-for="input-1">
        <b-form-input id="input-1" v-model="user.username" required placeholder="Pleae enter a user name"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Email address:" label-for="input-2">
        <b-form-input id="input-2" v-model="user.email" required placeholder="Please enter a user email address"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-textarea id="textarea" v-model="user.password" required placeholder="Please enter password"></b-form-textarea>
      </b-form-group>
      <b-button variant="primary" v-on:click="createUser">Create user</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>

</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'user-create',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    createUser() {
      // console.log(this.recipe.name)
      Api.post('/users', this.user)
        .then(response => {
          var user = response.data
          console.log(user)
        })
        .catch(error => {
          console.error(error)
        })
      //   Api.post(...)
    }
  }
}
</script>

<style scoped>
p {
  background-color: rgb(202, 226, 226);
}
</style>
