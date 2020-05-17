import axios from 'axios';

const API_URL = 'https://www.googleapis.com/books/v1/volumes';

export async function getRange(requestString) {
  const reqParams = { q: requestString };
  const result = (await axios.get(API_URL, { params: reqParams })).data;
  return result.items;
}

export const getBook = async (requestString, options) => {
  const reqParams = Object.assign({ params : { q: requestString } }, options);
  const res = (await axios.get(API_URL, reqParams)).data;
  const book = res.items[0].volumeInfo;
  return book;
}

export function getAuthor(book) {
  if (book.volumeInfo.authors) return book.volumeInfo.authors[0];
  else return 'No author';
}

export function  getTitle(book) {
  return book.volumeInfo.title;
}

export function getCover(book) {
  if (book.volumeInfo.imageLinks)
    return book.volumeInfo.imageLinks.smallThumbnail;
  else return '/logo-big.png';
}

export function getId(book) {
  if (book.volumeInfo.industryIdentifiers) {
    return book.volumeInfo.industryIdentifiers[0].identifier;
  } else {
    return book.id;
  }
}
