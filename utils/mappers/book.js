export default class BookMapper {
  constructor(book) {
    this.book = book;
  }

  get id() {
    return this.book.id;
  }

  get author() {
    return this.book.volumeInfo?.authors?.[0] ?? 'No author';
  }

  get title() {
    return this.book.volumeInfo?.title ?? 'No title';
  }

  get data() {
    return this.book.volumeInfo;
  }
}
