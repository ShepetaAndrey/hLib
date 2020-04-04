<template>
  <v-content light class="white">
    <v-row
      justify="center"
      align="center"
      class="mx-auto pa-6"
      style="max-width: 600px"
    >
      <v-icon size="4em">mdi-magnify</v-icon>
      <span class="display-3">Search for a book</span>
    </v-row>
    <v-row justify="center">
      <v-col style="max-width: 650px">
        <v-text-field placeholder="Search for ..." rounded solo> </v-text-field>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
      class="mx-auto d-flex flex-column"
      style="max-width: 600px"
    >
      <v-card
        v-for="book in books"
        :key="book.title"
        width="100%"
        class="mb-1 d-flex flex-row"
        outlined
      >
        <v-col class="col-md-3" lg3>
          <v-img
            :src="book.src"
            width="100"
            height="150"
            class="mx-auto"
          ></v-img>
          <v-rating v-model="rating" size="25" dense></v-rating>
        </v-col>
        <v-col class="col-md-9" lg9>
          <p>{{ book.title }}</p>
          <p style="overflow: hide">
            <i>{{ book.description }}</i>
          </p>
        </v-col>
      </v-card>
    </v-row>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      books: [
        {
          src: './war-and-peace.jpg',
          title: 'War and peace',
          description:
            'People change. The characters in War and Peace endure extreme experiences, and emerge at the end as quite different people.'
        },
        {
          src: './children-bookcover.png',
          title: 'Children book',
          description:
            'One day her mother, having made some cakes, said to her, "Go, my dear, and see how your grandmother is doing, for I hear she has been very ill. Take her a cake, and this little pot of butter."'
        },
        {
          src: './harry-potter-and-the-sorcerers-stone.jpg',
          title: 'Harry potter',
          description:
            'Harry had a thin face, knobbly knees, black hair and bright-green eyes. He wore round glasses held together with a lot of Sellotape because of all the times Dudley had punched him on the nose.'
        }
      ],
      rating: 3
    };
  }
};
</script>
