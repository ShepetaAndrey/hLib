<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      color="brown"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="font-weight-medium display-1">hLib</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- NAVIGATOR-DRAWER -->
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="brown lighten-5"
      class="brown--text text--darken-4"
    >
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
          nuxt
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content
      light
      class="white"
    >
      <v-container
        align="start"
        justify="center"
        class="justify-center"
      >
        <!-- Heading of the content -->
        <v-row>
          <v-col>
            <p class="display-4 font-weight-black text-center">
              hLib<v-icon
                color="brown--darken-1"
                size="100%"
                brown
              >mdi-bookshelf</v-icon>
            </p>
            <p class="display-2 text-center">your home library <span class="font-italic font-weight-light">everywhere</span></p>
          </v-col>
        </v-row>
        <v-row>
          <v-carousel
            hide-delimiter-background
            light
            cycle
          >
            <v-carousel-item>
              <v-row
                justify="space-between"
                align="center"
              >
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
                    >
                    </v-img>
                    <div class="ma-6">

                      <v-text-field
                        placeholder="War and peace"
                        rounded
                        solo
                        disabled
                      >

                      </v-text-field>
                    </div>
                  </v-col>
                  <v-col>
                    Use search for exploring new books
                  </v-col>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-row>
        <!-- some text content -->
        <v-row justify="center">
          <v-col lg6>
            {{dataBoilerpalte}}
          </v-col>
          <v-col lg6>
            {{dataBoilerpalte}}
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      width: 100,
      dataBoilerpalte:
        'Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Fusce convallis metus id felis luctus adipiscing. Aenean massa. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nulla consequat massa quis enim. Praesent venenatis metus at tortor pulvinar varius. Donec venenatis vulputate lorem. Phasellus accumsan cursus velit. Pellentesque ut neque.',
      items: [
        {
          title: 'Home',
          icon: 'mdi-home',
          to: '/'
        },
        {
          title: 'item #2',
          icon: 'mdi-flower',
          to: '/books'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1100px;
}
</style>