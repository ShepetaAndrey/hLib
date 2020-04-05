import Vue from 'vue'
import Vuex from 'Vuex';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  state: {
    books: [{
        src: './war-and-peace.jpg',
        title: 'War and peace',
        description: 'People change. The characters in War and Peace endure extreme experiences, and emerge at the end as quite different people.'
      },
      {
        src: './children-bookcover.png',
        title: 'Children book',
        description: 'One day her mother, having made some cakes, said to her, "Go, my dear, and see how your grandmother is doing, for I hear she has been very ill. Take her a cake, and this little pot of butter."'
      },
      {
        src: './harry-potter-and-the-sorcerers-stone.jpg',
        title: 'Harry potter',
        description: 'Harry had a thin face, knobbly knees, black hair and bright-green eyes. He wore round glasses held together with a lot of Sellotape because of all the times Dudley had punched him on the nose.'
      }
    ],
    rating: 3
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    getBooks: function () {

    }
  }
})

export default store;
