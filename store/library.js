const LibraryModule = {
  state: () => ({
    libraries: []
  }),
  getters: {
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
  },
  mutations: {
    initState: (state, payload) => {
      const readyData = payload.libraries === 'undefined' ? '[]' : JSON.parse(payload.libraries || '[]');
      state.libraries = readyData || [];
    },
    addCollection: (state, { collectionId, libraryId }) => {
      state.libraries
        .find(lib => lib.id === libraryId)
        .collections
        .push(collectionId);
    },
    removeCollection: (state, { collectionId, libraryId }) => {
      let lib = state.libraries.find(lib => lib.id === libraryId);
      lib.collections = lib.collections.filter(col => col !== collectionId);
    },
    addLibrary: (state, { libId }) => {
      state.libraries.push({ id: libId, collections: [] });
    },
    deleteLibrary: (state, { libId }) => {
      state.libraries = state.libraries.filter(lib => lib.id !== libId);
    }
  }
}

export default LibraryModule;

