const state = () => ({
  collections: []
})

const getters = {
  getById: (state) => collectionId => {
    return state.collections.find(col => col.id === collectionId);
  },
  getAll: (state) => {
    return state.collections;
  },
  isBookInCollection: state => bookId => {
    const collections = state.collections.filter(col => !col.books.includes(bookId));
    return collections.map(col => col.id);
  },
  getPreviewBooks: (state) => collectionId => {
    const collection = state.collections.find(col => col.id === collectionId);
    return collection.books.slice(0, 6);
  }
}

const mutations = {
  initState: (state, payload) => {
    const readyData = payload.collections === 'undefined' ? '[]' : JSON.parse(payload.collections || '[]');
    state.collections = readyData || [];
  },
  addCollection: (state, { collectionId }) => {
    state.collections.unshift({ id: collectionId, books: [] });
  },
  deleteCollection: (state, { collectionId }) => {
    state.collections = state.collections.filter(c => c.id !== collectionId);
  },
  addBook: (state, { bookId, collectionId }) => {
    state.collections.find(col => col.id === collectionId).books.unshift(bookId);
  },
  deleteBook: (state, { bookId, collectionId }) => {
    let collection = state.collections.find(col => col.id === collectionId);
    collection.books = collection.books.filter(id => id !== bookId);
  }
}

export default {
  state,
  getters,
  mutations,
}
