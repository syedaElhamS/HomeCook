<template>
    <div>
      <p>Create your own Recipe</p>
      <b-form>
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
            id="textarea"
            v-model="recipe.instruction"
            required
            placeholder="Enter steps to follow"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>

      <b-button variant="primary" v-on:click="createRecipe">Create recipe</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    </div>

</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'recipe-create',
  data() {
    return {
      recipe: {
        name: '',
        duration: '',
        instruction: ''
      }
    }
  },
  methods: {
    createRecipe() {
      // console.log(this.recipe.name)
      Api.post('/recipes', this.recipe)
        .then(response => {
          var recipe = response.data
          console.log(recipe)
          console.log(response.data)
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
p {
    background-color: rgb(202, 226, 226);
}
</style>
