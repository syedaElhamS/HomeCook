<template>
    <div>
        <div>
  <a href="#userAdd"> Change information </a>
            <h2> The user name: </h2>
            <div class= "detail"> {{user.username}}</div>
            <h2> The user email address: </h2>
            <div class= "detail">  {{ user.email}}</div>
            <h2> The user password:  </h2>
            <div class= "detail"> {{ user.password}}</div>
<b-button variant="outline-primary" size="sm" v-on:click="updateUser"
          router-link :to="'/users/'">Back</b-button>

<h3>Update info</h3>
<b-form-group id="input-group-1" label="User Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="user.username"
            placeholder="Enter a new user name"
          ></b-form-input>
        </b-form-group>
  <b-form-group id="input-group-2" label="Email:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="user.email"
            placeholder="Enter a new email"
          ></b-form-input>
        </b-form-group>
 <b-form-group id="input-group-3" label="Password:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="user.password"
            placeholder="Enter a new password"
          ></b-form-input>
        </b-form-group>
            <b-button variant="primary" size="sm" v-on:click="updateUser(id,user)">Save</b-button>
 <div id = "userAdd">
</div>
    </div>
</div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'user-card',
  props: ['id'],
  mounted() {
    console.log('PAGE is loaded')
    Api.get(`/users/${this.id}`)
      .then(response => {
        console.log(response.data)
        var user = response.data
        user.username = response.data.username
        user.email = response.data.email
        user.password = response.data.password
        this.user = response.data
        console.log(this.user)
      })
      .catch(error => {
        console.error(error)
      })
  },
  data() {
    return {
      users: [],
      user: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    updateUser(id, user) {
      console.log(user)
      this.$emit('update-user', this.user._id)
      Api.put(`/users/${this.id}`, this.user)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
        // this.user.username = null
        // this.user.email = null
        // this.user.password = null
        })
    }

  }
}
</script>

<style scoped>
p {
    background-color: white;
}
@media (max-width: 800px){
.detail{
color: blue ;
font-size: 16pt;
font-weight: bold
}
}
</style>
