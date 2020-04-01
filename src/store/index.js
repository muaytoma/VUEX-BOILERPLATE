import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

import {authentication} from './authentication.module';
import {alert} from './alert.module';

Vue.use(Vuex);

// Initial store with modules as an object
export const initialStoreModules = {
  authentication,
  alert
};

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: initialStoreModules
});
