import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggingIn: false,
    loginError: null,
    loginSuccessful: false
  },
  mutations: {
    loginStart: state => state.loggingIn = true,
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
      state.loginSuccessful = !errorMessage;
    }
  },
  actions: {
    doLogin({ commit }, loginData) {
      commit('loginStart');
      axios.post('http://localhost:3000/userlogin', {
        ...loginData  
      })
      .then(res => {
        if(res.status == 200) {
          localStorage.setItem('user', res.data.id);
          router.push('/dashboard');
          location.reload();
        }
        commit('loginStop', null);
      })
      .catch(error => {
        commit('loginStop', error);
      });
    }    
  }
})