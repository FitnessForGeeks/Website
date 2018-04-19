import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _4ad6a0a2 = () => import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */).then(m => m.default || m)
const _783371a2 = () => import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */).then(m => m.default || m)
const _ac4d0cbc = () => import('..\\pages\\community.vue' /* webpackChunkName: "pages_community" */).then(m => m.default || m)
const _bc3346c4 = () => import('..\\pages\\recipes.vue' /* webpackChunkName: "pages_recipes" */).then(m => m.default || m)
const _a2e862ea = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/signup",
			component: _4ad6a0a2,
			name: "signup"
		},
		{
			path: "/login",
			component: _783371a2,
			name: "login"
		},
		{
			path: "/community",
			component: _ac4d0cbc,
			name: "community"
		},
		{
			path: "/recipes",
			component: _bc3346c4,
			name: "recipes"
		},
		{
			path: "/",
			component: _a2e862ea,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
