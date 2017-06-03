import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Search from '../views/Search'
import Manga from '../views/Manga'
import Reader from '../views/Reader'
import Genre from '../views/Genre'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home'
    },
    {
      path: '/search',
      components: {
        wide: Search
      },
      props: (route) => ({ query: route.query.q }),
      name: 'search'
    },
    {
      path: '/genre/:genreName',
      components: {
        wide: Genre
      },
      name: 'genre'
    },
    {
      path: '/manga/:mangaId',
      component: Manga,
      name: 'manga',
    },
    {
  		path: '/manga/:mangaId/read/:chapterId/:page',
  		component: Reader,
      props: true,
  		name: 'reader'
  	}
  ]
})
