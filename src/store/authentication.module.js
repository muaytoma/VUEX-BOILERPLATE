import {router} from '@/helpers';

const user = JSON.parse(localStorage.getItem('clientName'));
const initialState = user ? {status: {loggedIn: true}, user} : {status: {}, user: null};

const state = {
  ...initialState
};

const users = [
  {   
    "clientId" : 1,
    "clientName":"Demo Test 01",
    "email":"test@example.com",
    "password":"demo123",
    "createdAt":"2020-01-01T17:03:53.728Z"
  }
];

const actions = {
  login: async ({dispatch, commit}, {email, password}) => {
    commit('loginRequest', {email});
    try {
      let _self = window;
      const user = users.filter((user) => {
        return user.email == email && user.password == password
      })

      if(Array.isArray(user) && user.length === 0 ) {
        commit('loginFailed');
        dispatch('alert/error', "Cannot login", {root: true});
        return false;
      }

      let clientName = user[0].clientName;
      let clientToken = Date.now();

      localStorage.setItem('clientName', JSON.stringify(clientName));
      _self.$cookies.config('1d');
      _self.$cookies.set('clientToken', clientToken, "30MIN");
      
      commit('loginSuccess', clientName);
      router.push(`/dashbard`);

    } catch (error) {
      dispatch('alert/error',  'Something wrong', {root: true});
      throw (error);
    }
  }
};

const mutations = {
    loginRequest(state, clientName) {
      state.status = {loggingIn: true};
      state.clientName = clientName;
    },
    loginFailed(state){
      state.status = {loggingIn: false};
      state.clientName = null;
    },
    loginSuccess(state, clientName) {
      state.status = {loggedIn: true};
      state.clientName = clientName;
    }
};

const getters = {

};

export const authentication = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
