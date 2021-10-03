const COLLECTIONS = 'collections';

export default class LocalStorage {
  constructor() {}

  getCollectionList() {
    return deserialise(localStorage.getItem(COLLECTIONS));
  }

  setCollectionList(collectionList) {
    localStorage.setItem(COLLECTIONS, JSON.stringify(collectionList));
  }

  addCollection(collectionItem) {
    const collectionList = this.getCollectionList();
    collectionList.unshift(collectionItem);
    this.setCollectionList(collectionList);
  }

  removeCollection(collectionId) {
    const collectionList = this.getCollectionList();
    this.setCollectionList(collectionList.filter(c => c.id !== collectionId));
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
}

function deserialise(string) {
  if (typeof string === 'string') {
    return JSON.parse(string);
  } else {
    return []
  }
}
