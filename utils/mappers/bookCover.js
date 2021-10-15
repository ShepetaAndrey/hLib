export function getCoverLink(bookId, zoom=1) {
  const path = 'http://books.google.com/books/content?';
  const q = {
    id: bookId,
    printsec: 'frontcover', // send not default cover;
    img: 1, // send picture or not
    zoom: zoom //less value - less picture
  }
  const params = Object.entries(q)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return path + params;
}
