import * as googleAPI from './google-books-api';

export async function getBook(bookId) {
  return googleAPI.getBook(bookId);
}

export async function getRange(requestString) {
  return googleAPI.getRange(requestString);
}

export function getAuthor(book) {
  return googleAPI.getAuthor(book);
}

export function getTitle(book) {
  return googleAPI.getTitle(book);
}

export function getCover(book) {
  return googleAPI.getCover(book);
}

export function getId(book) {
  return googleAPI.getId(book);
}
