<template>
    <div>
<p>The user's name is {{user.username}}.</p>
<p>The user's email address is {{user.email}}.</p>
<p>The user's password is {{user.password}}.</p>
        <b-button variant="danger" v-on:click="$emit('del-user', user._id)">delete</b-button>
    </div>
</template>

<script>
export default {
  name: 'user-item',
  props: ['user'],
  methods: {
    deleteUser() {
      this.$emit('del-user', this.user._id)
      console.log('del-user')
    }
  }
}
</script>

<style scoped>
p {
  background-color: aqua;
}
</style>
