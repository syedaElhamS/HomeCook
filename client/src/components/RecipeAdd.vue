<template>
    <div>
      <p>Create your own Recipe</p>
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

    <recipe-item v-bind:recipe="recipe" v-on:add-Anothet="addAnother"/>

    <b-form-group id="input-group-4" label="Ingredient:" label-for="input-4">
      <b-form inline>
        <label class="sr-only" for="inline-form-input-name">Name</label>
        <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          v-model="ingredient.name"
          placeholder="Name"
        ></b-input>

        <label class="sr-only" for="inline-form-input-username">Quantity</label>
        <b-input-group prepend="Quantity" class="mb-2 mr-sm-2 mb-sm-0">
          <b-input id="inline-form-input-username" placeholder="Username"></b-input>
        </b-input-group>

        <b-button
          class="mb-2 mr-sm-2 mb-sm-0"
          variant="primary"
          v-on:click="addAnother">Add another</b-button>
        <b-button class="mb-2 mr-sm-2 mb-sm-0" variant="primary">Done</b-button>
      </b-form>
    </b-form-group>
    </div>

</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'recipe-add',
  data() {
    return {
      recipe: {
        name: '',
        duration: '',
        instruction: ''
      },
      ingredient: {
        name: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      // console.log(this.recipe.name)
      Api.post('/recipes', this.recipe)
        .then(response => {
          var recipe = response.data
          console.log(response.data)
          console.log(recipe)
          const id = recipe._id
          this.recipe.id = recipe._id

          console.log(id)
          // this.emit('add-ingredient', recipe._id)
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          // make input boxes empty
          // console.log(id)
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
    addAnother() {
      // console.log(recipe._id)
      const id = this.recipe.id // undefined!!
      if (id != null) {
        console.log(id)
        Api.post(`/recipes/${id}/ingredients`, this.ingredient)
          .then(response => {
            var ingredient = response.data
            console.log(ingredient)
            console.log(response.data)
          })
          .catch(error => {
            console.error(error)
          })
          .then(() => {
            // make input boxes empty
            this.ingredient.name = null
          })
      }
    }
  }
}
</script>

<style scoped>
p {
    background-color: rgb(202, 226, 226);
}
</style>
