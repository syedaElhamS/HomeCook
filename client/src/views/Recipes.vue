<template>
  <b-container>
    <p class="red">{{message}}</p>
    <a href="#recipeAdd">add your own recipe</a>
    <h1>List of all Recipes:</h1>
    <b-row align-h="center">
      <b-col cols="12" sm="6" md="4" v-for="recipe in recipes" v-bind:key="recipe._id">
        <recipe-item v-bind:recipe="recipe" v-on:del-recipe="deleteRecipe"/>
      </b-col>
    </b-row>
    <b-button variant="danger"
        v-on:click="deleteAllRecipe">delete all recipes !!</b-button>
    <div id = "recipeAdd">
      <h3>Add your own Recipe</h3>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Recipe Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="recipe.name"
            required
            placeholder="Enter a recipe name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Duration:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="recipe.duration"
            type="number"
            required
            placeholder="Enter amount of time required"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Instruction:" label-for="input-3">
          <b-form-textarea
            id="input-3"
            v-model="recipe.instruction"
            required
            placeholder="Enter steps to follow"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        <b-button type = "submit" variant="primary">Add recipe</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>

      <b-form-group id="input-group-4" label="Ingredient:" label-for="input-4">
        <b-form inline>
          <label class="sr-only" for="inline-form-input-name">Name</label>
          <b-input
            id="inline-form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            v-model="ingredient.name"
            required
            placeholder="Name"
          ></b-input>

          <label class="sr-only" for="inline-form-input-quantity">Quantity</label>
          <b-input-group prepend="Quantity" class="mb-2 mr-sm-2 mb-sm-0">
            <b-input
            id="inline-form-input-quantity"
            v-model="ingredient.quantity"
            placeholder="ex.:gm/ml/cups..."></b-input>
          </b-input-group>

          <b-button
            class="mb-2 mr-sm-2 mb-sm-0"
            variant="primary"
            v-on:click="addIngredient">Add ingredient</b-button>

          <b-button
            class="mb-2 mr-sm-2 mb-sm-0"
            variant="primary"
            onclick= "window.location.reload();" >Done</b-button>
        </b-form>
      </b-form-group>
    </div>
  </b-container>
</template>

<script>
import { Api } from '@/Api'
import RecipeItem from '@/components/RecipeItem.vue'

export default {
  name: 'recipes',
  components: {
    RecipeItem
  },
  mounted() {
    console.log('PAGE is loaded')
    // Load the real recipes from the server
    Api.get('/recipes')
      .then(response => {
        console.log(response.data.recipes)
        this.recipes = response.data.recipes
      })
      .catch(error => {
        this.message = error.message
        console.error(error)
        this.recipes = []
        // TODO: display error message
      })
      .then(() => {
        //   This code is always executed at the end. After success or failure.
      })
  },
  data() {
    return {
      recipes: [],
      message: '',
      text: '',
      recipe: {
        name: '',
        duration: '',
        instruction: ''
      },
      ingredient: {
        name: '',
        quantity: ''
      },
      show: true
    }
  },
  methods: {
    deleteRecipe(id) {
      Api.delete(`/recipes/${id}`)
        .then(reponse => {
          const index = this.recipes.findIndex(recipe => recipe._id === id)
          this.recipes.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
        })
    },
    deleteAllRecipe() {
      Api.delete('/recipes')
        .then(response => {
          // console.log(response.data)
          // window.location.href = window.location.href
          window.location.reload()
        })
        .catch(error => {
          this.message = error.message
          console.error(error)
          this.recipes = []
          // TODO: display error message
        })
        .then(() => {
          //   This code is always executed at the end. After success or failure.
        })
    },
    onSubmit(evt) {
      evt.preventDefault()
      Api.post('/recipes', this.recipe)
        .then(response => {
          var recipe = response.data
          console.log(response.data)
          this.recipe.id = recipe._id
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          // make input boxes empty
          this.recipe.name = null
          this.recipe.duration = null
          this.recipe.instruction = null
        })
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.recipe.name = ''
      this.recipe.duration = ''
      this.recipe.instruction = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    addIngredient() {
      const id = this.recipe.id
      if (id != null) {
        console.log(id)
        Api.post(`/recipes/${id}/ingredients`, this.ingredient)
          .then(response => {
            console.log(response.data)
            // window.location.reload()
          })
          .catch(error => {
            console.error(error)
          })
          .then(() => {
            // make input boxes empty
            this.ingredient.name = null
            this.ingredient.quantity = null
          })
      }
    }
  }
}
</script>

<style scoped>
.red {
    color: red;
}
</style>
