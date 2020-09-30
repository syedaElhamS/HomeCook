<template>
    <div>
        <p class="red">{{message}}</p>
        <a href="#footer">add your own recipe</a>
        <p>Here are my recipes:</p>
        <div v-for="recipe in recipes" v-bind:key="recipe._id">
            <recipe-item v-bind:recipe="recipe" v-on:del-recipe="deleteRecipe"/>
        </div>
        <footer id="footer">
            <recipe-add/>
        </footer>
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
    },
    createRecipe() {
      console.log(this.text)
      Api.post('/recipes')
        .then(reponse => {
          this.recipes.name = this.text
          console.log(this.text)
          console.log(this.recipes.name)
          this.recipes.splice(this.recipes.length, 0, this.recipes)
        })
        .catch(error => {
          console.error(error)
        })
    //   Api.post(...)
    }
  }
}
</script>

<style scoped>
.red {
    color: red;
}
</style>
