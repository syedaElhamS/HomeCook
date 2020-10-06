<template>
    <div>
        <div>
            <h1> The {{ recipe.name }}</h1>
            <p> Duration : {{ recipe.duration}} min</p>
            <h4> Directions: </h4>
            <p> {{ recipe.instruction}}</p>
        </div>
    </div>

</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'recipe-card',
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
  },
  data() {
    return {
      recipes: [],
      recipe: {
        name: '',
        duration: '',
        instruction: ''
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
