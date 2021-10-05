<template>
  <v-main light class="white">
    <v-container align="start" justify="center" class="justify-center">
      <v-row>
        <v-col>
          <p class="display-4 font-weight-black text-center">
            hLib
            <v-icon color="brown--darken-1" size="100%" brown
              >mdi-bookshelf</v-icon
            >
          </p>
          <p class="display-2 text-center">
            your home library
            <span class="font-italic font-weight-light">everywhere</span>
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-carousel hide-delimiter-background light cycle>
          <v-carousel-item>
            <v-row justify="space-between" align="center">
              <v-col>
                <v-img
                  max-height="300px"
                  max-width="200px"
                  class="mx-auto"
                  src="./hemlock-and-after.jpg"
                ></v-img>
              </v-col>
              <v-col class="d-none d-lg-flex d-md-flex d-sm-flex">
                <v-img
                  max-height="300px"
                  max-width="200px"
                  class="mx-auto"
                  src="./the-great-gatsby.png"
                ></v-img>
              </v-col>
              <v-col class="d-none d-lg-flex d-md-flex">
                <v-img
                  class="mx-auto"
                  max-height="300px"
                  max-width="200px"
                  src="./children-bookcover.png"
                ></v-img>
              </v-col>
              <v-col class="d-none d-md-flex">
                <v-img
                  class="mx-auto"
                  max-height="300px"
                  max-width="200px"
                  src="./harry-potter-and-the-sorcerers-stone.jpg"
                ></v-img>
              </v-col>
            </v-row>
            <v-row class="display-3 text-center">
              <v-col xs6>
                <p>Collect your lovely books into collections</p>
              </v-col>
            </v-row>
          </v-carousel-item>

          <v-carousel-item>
            <v-sheet height="100%">
              <v-row
                justify="center"
                align="center"
                class="fill-height display-2"
              >
                <v-col>
                  <v-img
                    max-height="300px"
                    max-width="200px"
                    class="mx-auto"
                    src="./war-and-peace.jpg"
                  ></v-img>
                  <div class="ma-6">
                    <v-text-field
                      placeholder="War and peace"
                      rounded
                      solo
                      disabled
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col>Use search for exploring new books</v-col>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-row>
    </v-container>
  </v-main>
</template>
