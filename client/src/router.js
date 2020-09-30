import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import About from './views/About.vue'
// import Friends from './views/Friends.vue'
import Recipes from './views/Recipes.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    /*
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/friends/:id',
      name: 'friends',
      component: Friends
    },
    */
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes
    }
  ]
})
