<template>
    <div>
        <p class="red">{{message}}</p>
        <a href="#recipeAdd">add your own recipe</a>
        <p>all recipes:</p>
        <div v-for="recipe in recipes" v-bind:key="recipe._id">
            <a href="#recipeCard"><recipe-item/></a>
            <recipe-item v-bind:recipe="recipe" v-on:del-recipe="deleteRecipe"/>
        </div>
        <div id=recipeCard>
          <p>all recipes:</p>
        </div>
        <div id="recipeAdd">
            <recipe-add/>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
import RecipeItem from '@/components/RecipeItem.vue'
import RecipeAdd from '@/components/RecipeAdd.vue'

export default {
  name: 'recipes',
  components: {
    RecipeItem,
    RecipeAdd
  },
  mounted() {
    console.log('PAGE is loaded')
    // Load the real recipes from the server
    Api.get('/recipes')
      .then(response => {
        // console.log(response.data)
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
      text: ''
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
    }
  }
}
</script>

<style scoped>
.red {
    color: red;
}
</style>
