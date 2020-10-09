<template>
    <div>
      <b-button-close variant="danger"
          v-on:click="$emit('del-user', user._id)">&times;</b-button-close>
      <b-button variant="outline-primary" size="sm"
          router-link :to="'/users/' + user._id">{{user.username}}</b-button>
    </div>
</template>

<script>
export default {
  name: 'user-item',
  props: ['user'],
  methods: {
    // deleteUser() {
    //   this.$emit('del-user', this.user._id)
    //   console.log('del-user with id:' + this.user._id)
    // }
  }
}
</script>

<style scoped>
p {
    background-color: white;
}
</style>
