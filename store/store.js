import Vue from 'vue'
import Vuex from 'vuex';
import CollectionsModule from './collection';
import LibraryModule from './library';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    cols: CollectionsModule,
    lib: LibraryModule
  }
})

export default store;
