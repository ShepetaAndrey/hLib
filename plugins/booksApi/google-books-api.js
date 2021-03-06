import axios from 'axios';

const API_URL = 'https://www.googleapis.com/books/v1/volumes';

export async function getRange(requestString) {
  const reqParams = { q: requestString };
  const result = (await axios.get(API_URL, { params: reqParams })).data;
  if(result.totalItems) {
    return result.items;
  } else {
    return [];
  }
}

export const getBook = async (volumeID) => {
  const res = (await axios.get(`${API_URL}/${volumeID}`)).data;
  const book = res.volumeInfo;
  return book;
}

export function getAuthor(book) {
  if (book.volumeInfo.authors) return book.volumeInfo.authors[0];
  else return 'No author';
}

export function  getTitle(book) {
  return book.volumeInfo.title;
}

export function getCover(book, zoom=1) {
  const path = 'http://books.google.com/books/content?';
  const q = {
    id: book.id,
    printsec: 'frontcover', // send not default cover;
    img: 1, // send picture or not
    zoom: zoom //less value - less picture
  }
  const params = Object.entries(q)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return path + params;
}

export function getId(book) {
  return book.id;
}
