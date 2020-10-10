<template>
    <div>
      <h2> The {{recipe.name}} </h2>
      <h5> Duration: {{ recipe.duration}} min</h5>
      <h5> Directions: </h5>
      <p> {{ recipe.instruction}}</p>
      <h2> Ingredients: </h2>
      <div v-for="ingredient in ingredients" v-bind:key="ingredient._id">
       <ingredient-item v-bind:ingredient="ingredient" />
      </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
import IngredientItem from '@/components/IngredientItem.vue'
export default {
  name: 'recipe-card',
  components: {
    IngredientItem
  },
  props: ['id'],
  mounted() {
    console.log('PAGE is loaded')
    Api.get(`/recipes/${this.id}`)
      .then(response => {
        console.log(response.data)
        this.recipe = response.data
        console.log(this.recipe)
      })
      .catch(error => {
        console.error(error)
      })
    Api.get(`/recipes/${this.id}/ingredients`)
      .then(response => {
        console.log(response.data)
        this.ingredients = response.data.ingredients
        console.log(this.ingredient)
      })
      .catch(error => {
        console.log(error)
      })
  },
  data() {
    return {
      recipes: [],
      recipe: {
        name: '',
        duration: '',
        instruction: ''
      },
      ingredients: [],
      ingredient: {
        name: '',
        quantity: '',
        category: ''
      },
      message: '',
      text: ''
    }
  }

}

</script>

<style scoped>
p {
    background-color: white;
}
</style>
