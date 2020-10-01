<template>
    <div>
        <p>The {{recipe.name}} recipe takes {{recipe.duration}} min</p>
        <p>Directions</p>
        <p>{{recipe.instruction}} </p>
        <b-button variant="danger"
          v-on:click="$emit('del-recipe', recipe._id)">delete</b-button>
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
