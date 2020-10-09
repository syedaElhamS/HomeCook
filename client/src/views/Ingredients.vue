<template>
  <div>
    <p>Here are all ingredients:</p>
    <b-form-input v-model="text" placeholder="Enter ingredient name"></b-form-input>
    <b-button variant="danger" v-on:click="createIngredient()">create new ingredient</b-button>
<div v-for="ingredient in ingredients" v-bind:key="ingredient._id">
<ingredient-item v-bind:ingredient="ingredient" v-on:del-ingredient="deleteIngredient" />
    </div>
</div>
</template>

<script>
import { Api } from '@/Api'
import IngredientItem from '@/components/IngredientItem.vue'

export default {
  name: 'ingredients',
  components: {
    IngredientItem
  },
  mounted() {
    console.log('Page is loaded')
    Api.get('/ingredients')
      .then(response => {
        console.log(response.data)
        this.ingredients = response.data.ingredients // display ingredient from the server
      })
      .catch(error => {
        console.error(error)
      })
      .then(() => {

      })
  },
  data() {
    return {
      ingredients: [],
      ingredient: {
        name: '',
        categroy: ''
      },
      text: ''
    }
  },
  methods: { // delete ingredient from server
    deleteIngredient(id) {
      Api.delete(`/ingredients/${id}`)
        .then(response => {
          const index = this.ingredients.findIndex(ingredient => ingredient._id === id)
          this.ingredients.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
        })
    },
    createIngredient() {
      console.log(this.text)
      // Api.post(     )
    }
  }
}

</script>

<style scoped>
</style>
