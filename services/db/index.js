const COLLECTIONS = 'collections';
const LIBRARIES = 'libraries'

export default class LocalStorage {
  constructor() {}

  getCollectionList() {
    return deserialise(localStorage.getItem(COLLECTIONS));
  }

  setCollectionList(collectionList) {
    localStorage.setItem(COLLECTIONS, serialize(collectionList));
  }

  addCollection(collectionItem) {
    const collectionList = this.getCollectionList();
    collectionList.unshift(collectionItem);
    this.setCollectionList(collectionList);
  }

  removeCollection(collectionId) {
    const collectionList = this.getCollectionList();
    this.setCollectionList(collectionList.filter(c => c.id !== collectionId));
    let libraryList = this.getLibraryList();
    this.setLibraryList(
      libraryList.map(library => {
        return {
          id: library.id,
          collections: library.collections.filter(id => id !== collectionId)
        }
      })
    )
  }

  addBookToCollection(bookId, collectionId) {
    const collectionList = this.getCollectionList();
    const targetCollection = collectionList.find(c => c.id === collectionId);
    targetCollection.books.unshift(bookId);
    this.setCollectionList(collectionList);
  }

  removeBookFromCollection(bookId, collectionId) {
    let collectionList = this.getCollectionList();
    let targetIndex = collectionList.findIndex(c => c.id === collectionId);
    collectionList[targetIndex] = collectionList[targetIndex].books.filter(id => id !== bookId);
    this.setCollectionList(collectionList);
  }

  getLibraryList() {
    return deserialise(localStorage.getItem(LIBRARIES));
  }

  setLibraryList(libraryList) {
    localStorage.setItem(LIBRARIES, serialize(libraryList));
  }

  addLibrary(libraryItem) {
    const libraryList = this.getLibraryList();
    libraryList.unshift(libraryItem);
    this.setLibraryList(libraryList);
  }

  removeLibrary(libraryId) {
    const libraryList = this.getLibraryList();
    this.setLibraryList(libraryList.filter(l => l.id !== libraryId));
  }

  addCollectionToLibrary(collectionId, libraryId) {
    let libraryList = this.getLibraryList();
    let targetlibrary = libraryList.find(l => l.id === libraryId);
    targetlibrary.collections.unshift(collectionId);
    this.setLibraryList(libraryList);
  }

  removeCollectionFromLibrary(collectionId, libraryId) {
    let libraryList = this.getLibraryList();
    let targetIndex = libraryList.findIndex(l => l.id === libraryId);
    libraryList[targetIndex] = libraryList[targetIndex].collections.filter(id => id !== collectionId);
    this.setCollectionList(libraryList);
  }
}

function deserialise(string) {
  if (typeof string === 'string') {
    return JSON.parse(string);
  } else {
    return []
  }
}

function serialize(data) {
  return JSON.stringify(data);
}
