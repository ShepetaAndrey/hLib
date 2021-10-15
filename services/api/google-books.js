import http from './http';

const BOOK = 'books/v1/volumes';

export async function getBook(boodId) {
  const response = await http.get(BOOK + '/' + boodId);
  return response.data;
}

export async function getBookList(text) {
  const response = await http.get(BOOK, { params: { q: text } });
  if (response.data.totalItems) {
    return response.data.items;
  } else {
    return [];
  }
}

