<template>
    <div>
            <p>{{ingredient}}</P>
<p>{{recipe}}</p>
            <h2> The recipe name: {{recipe.name}} </h2>
            <h2> Duration: {{ recipe.duration}} min</h2>
            <h2> Directions: </h2>
            <p> {{ recipe.instruction}}</p>
<ingredient-item v-bind:ingredient="ingredient" />
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
        this.ingredient = response.data
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
