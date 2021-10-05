import StoreRepository from '../services/db';

const db = new StoreRepository();

function Library(libraryId) {
  this.id = libraryId;
  this.collections = [];
}

const state = () => ({
  libraries: []
})

const getters = {
  getById: state => libId => {
    return state.libraries.find(lib => lib.id === libId);
  },
  getAll: (state) => {
    return state.libraries;
  },
  getFirstLibId: (state) => {
    if(state.libraries.length) {
      return state.libraries[0].id;
    } else {
      return null;
    }
  },
  getPreviewCollections: state => libId => {
    const lib = state.libraries.find(lib => lib.id === libId);
    return lib.collections.slice(0, 3);
  }
}

const actions = {
  fetchLibrariesFromCache({ commit, getters }) {
    if(getters.getAll.length === 0) {
      commit('SET_LIBRARIES', db.getLibraryList());
    }
  },
  updateLibraries({ commit }) {
    commit('SET_LIBRARIES', db.getLibraryList());
  },
  addLibrary({ commit }, libraryId) {
    db.addLibrary(new Library(libraryId));
    commit('SET_LIBRARIES', db.getLibraryList());
  },
  removeLibrary({ commit }, libraryId) {
    db.removeLibrary(libraryId);
    commit('SET_LIBRARIES', db.getLibraryList());
  },
  addCollection({ commit }, { collectionId, libraryId }) {
    db.addCollectionToLibrary(collectionId, libraryId);
    commit('SET_LIBRARIES', db.getLibraryList());
  },
  removeCollectionFromLibrary({ commit }, { collectionId, libraryId }) {
    db.removeCollectionToLibrary(collectionId, libraryId);
    commit('SET_LIBRARIES', db.getLibraryList());
  },
}

const mutations = {
  SET_LIBRARIES: (state, libraries) => {
    state.libraries = libraries;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

