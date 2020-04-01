import Vue from 'vue'

const state = {
  type: null,
  message: null
};

const actions = {
  success({commit}, message) {
    commit('success', message);
  },
  error({commit}, message) {
    commit('error', message);
  },
};

const mutations = {
  success(state, message) {
    state.message = message;
    Vue.notify({
        type: 'success',
        title: 'Success',
        text: state.message,
        duration: 4000,
    });
  },
  error(state, message) {
    state.message = message;
    Vue.notify({
      type: 'error',
      title: 'Something went wrong',
      text: state.message,
      duration: 4000
    });
  },
};

export const alert = {
  namespaced: true,
  state,
  actions,
  mutations
};
