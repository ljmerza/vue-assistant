import Vue from 'vue'
import App from './App'

import Home from './components/Home.vue'
import Weather from './components/Weather.vue'

// import { parseInt, windDirection } from './filters'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'

Vue.use(VueMoment)
Vue.use(VueResource)
Vue.use(VueRouter)

Vue.filter('parseInt', function (val) {
	return parseInt(val)
})

const router = new VueRouter()

router.map({
  '/rss': {
    component: Home
  },
  '/weather': {
    component: Weather
  }
})

router.beforeEach(function () {
	window.scrollTo(0, 0)
})

router.redirect({
  '*': '/rss'
})

router.start(App, 'app')
