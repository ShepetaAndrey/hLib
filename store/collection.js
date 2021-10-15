import StoreRepository from '../services/db';

const db = new StoreRepository();

function Collection(id, books=[]) {
  this.id = id;
  this.books = books;
}

const state = () => ({
  collections: []
});

const actions = {
  fetchCollectionsFromCache({ commit, getters }) {
    if(getters.getAll.length === 0) {
      commit('SET_COLLECTIONS', db.getCollectionList());
    }
  },
  addCollection({ commit }, collectionId) {
    db.addCollection(new Collection(collectionId));
    commit('SET_COLLECTIONS', db.getCollectionList());
  },
  removeCollection({ commit, dispatch }, collectionId) {
    db.removeCollection(collectionId);
    dispatch('library/updateLibraries', null, { root: true });
    commit('SET_COLLECTIONS', db.getCollectionList());
  },
  addBook({ commit }, { bookId, collectionId }) {
    db.addBookToCollection(bookId, collectionId);
    commit('SET_COLLECTIONS', db.getCollectionList());
  },
  removeBook({ commit }, { bookId, collectionId }) {
    db.removeBookFromCollection(bookId, collectionId);
    commit('SET_COLLECTIONS', db.getCollectionList());
  }
}

const mutations = {
  SET_COLLECTIONS: (state, collections) => {
    state.collections = collections;
  },
}

const getters = {
  getById: (state) => collectionId => {
    return state.collections.find(col => col.id === collectionId);
  },
  getAll: (state) => {
    return state.collections;
  },
  getAllBookIdList: (state) => {
    return state.collections.reduce((acc, col) => [...acc, ...col.books], [])
  },
  getCollectionListWithout: state => bookId => {
    const collections = state.collections.filter(col => !col.books.includes(bookId));
    return collections.map(col => col.id);
  },
  getPreviewBooks: (state) => collectionId => {
    const collection = state.collections.find(col => col.id === collectionId);
    return collection.books.slice(0, 6);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
