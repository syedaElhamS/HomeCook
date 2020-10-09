<template>
  <div>
    <p>{{ingredient}}</p>
    <h5>The ingredient id is: {{ingredient._id}}</h5>
    <h5>Ingredient name is:  {{ingredient.name}}</h5>
    <h5>Quantity is:  {{ingredient.quantity}}</h5>
    <h5>Category: {{ingredient.category}}</h5>
    <h5>Recipe ID is:  {{ingredient.recipes}}</h5>
    <b-button variant="danger" v-on:click="deleteIngredient()">delete X</b-button>
  </div>
</template>

<script>
export default {
  name: 'ingredient-item',
  props: ['ingredient'],
  methods: {
    deleteIngredient() {
      this.$emit('del-ingredient', this.ingredient._id)
      console.log('del-ingredient')
    }
  }
}
</script>

<style scoped>
p {
  background-color: white
}
</style>
