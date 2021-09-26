import Vue from 'vue'
import { getAuthor, getBook, getCover, getId, getTitle, getRange } from './booksApi';

Vue.prototype.$books = {
  getRange,
  getBook,
  getAuthor,
  getTitle,
  getCover,
  getId
}
