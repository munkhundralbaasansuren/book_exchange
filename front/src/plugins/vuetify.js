import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import VuetifyToast, { VSnackbar, VBtn, VIcon }  from 'vuetify-toast-snackbar'
import 'vuetify/src/stylus/app.styl'

Vue.component('v-snackbar', VSnackbar)

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#9652ff',
    successs: '#3cd1c2',
    info: '#ffaa2c',
    error: '#f83e70', 
    yellow: '#D68910', 
    purple: '#FFA07A', 
  },
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
})

Vue.use(VuetifyToast, {
	x: 'right', // default
	y: 'bottom', // default
	color: 'info', // default
	icon: 'info',
	iconColor: '', // default
	classes: [
		'body-2'
	],
	timeout: 3000, // default
	dismissable: true, // default
	multiLine: false, // default
	vertical: false, // default
	queueable: false, // default
	showClose: false, // default
	closeText: '', // default
	closeIcon: 'close', // default
	closeColor: '', // default
	slot: [], //default
	shorts: {
		custom: {
			color: 'purple'
		}
	},
	property: '$toast' // default
})