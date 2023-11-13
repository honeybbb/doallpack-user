import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);
const store = () => new Vuex.Store({
  state: {
    accessToken: null,
    memNo: null
  },
  getters: {
    isLogin(state) {
      //console.log('getters', state.memNo)
      return state.memNo == null? false:true;
    }
  },
  mutations: {// commit 으로 부를 수 있다.
    SET_USER(state, payload) {
      //console.log(payload, '1')
      state.accessToken = payload.accessToken
      state.memNo = payload.memNo
    },
    LOGOUT_USER(state) {
      state.accessToken = null
      state.memNo = null
    }
  },
  actions: {
    loginUser({commit}, data) {// dispatch 로 부를 수 있다.
      //console.log(data, '로그인정보')
      axios.post('http://localhost:3001/v1/member/auth', data)
        .then(res => {
          //console.log(res.data.data)
          commit('SET_USER', res.data.data[0])
          localStorage.setItem('memNo', res.data.data[0].memNo)
        }).catch(err => {
          console.log(err, 'err')
          alert('아이디 또는 패스워드를 확인해주세요.')
        return
      })

    }
  }
})

export default store;
