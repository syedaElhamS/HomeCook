<template>
    <div>
      <b-button-close variant="danger"
          v-on:click="$emit('del-recipe', recipe._id)">&times;</b-button-close>
      <b-button variant="outline-primary" size="sm"
          router-link :to="'/recipes/' + recipe._id">{{recipe.name}}</b-button>
    </div>
</template>

<script>
export default {
  name: 'recipe-item',
  props: ['recipe'],
  methods: {
    // deleteRecipe() {
    //   this.$emit('del-recipe', this.recipe._id)
    //   console.log('del-recipe with id:' + this.recipe._id)
    // }
  }
}
</script>

<style scoped>
p {
    background-color: white;
}
</style>
