<template>
  <nav>
    <v-toolbar flat app top color="yellow">
      <v-toolbar-side-icon @click="drawer = !drawer" class="white--text"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase white--text">
        <span class="font-weight-light">Book</span>
        <span>Exchange</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn v-if="authenticated" to="/login" v-on:click.native="logout()" replace flat color="white">
        <span>log out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="purple">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img class="text-lg-center" src="/avatar2.jpeg">
          </v-avatar>
          <p class="white--text subheading mt-1">undraaaaaaaaaa</p>
        </v-flex>
        <v-flex class="mt-4 mb-3">
          <Popup @bookAdded="snackbar = true" />
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from './Popup'
// import login from './login'

export default {
  components: { Popup },
  data() {
    return {
      authenticated: true,
      drawer: false,
      links: [
        { icon: 'dashboard', text: 'Dashboard', route: '/dashboard' },
        { icon: 'folder', text: 'My Books', route: '/books' },
        { icon: 'person', text: 'Team', route: '/team' },
      ],
      snackbar: false
    }
  }, 
  mounted() {
      if(!this.authenticated) {
          this.$router.replace({ name: "login" });
      }
  },
  methods: {
    logout() {
          this.authenticated = false;
    }
  }
}
</script>

