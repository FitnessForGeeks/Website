<template>
    <v-container>
        <v-layout row>
    <v-flex xs16 sm16 offset-sm>
      <v-card>
        <v-card-media
          src="doc-images/cards/profilePageStandardPicture.jpg"
          height="300px"
        >
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <div class="headline">Username <!-- "Username" needs to be replaced with actual username -->
              <v-avatar> 
                <img src="doc-images/avatar.png" alt="Avatar">
              </v-avatar>
          </div> 
            <span class="grey--text"></span>
          </div> 
        </v-card-title>
        <v-card-actions>
          <v-btn
      color="info"
      :loading="loading4"
      @click.native="loader = 'loading4'"
      :disabled="loading4"
    >
      Change Picture <!-- shall be on the same level as username and icon and float: right -->
      <span slot="loader" class="custom-loader">
        <v-icon light>cached</v-icon>
      </span>
    </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show">
            This is the standard background picture. Change it by clicking the "Change"-Button
            <br>
            Change the avatar by hovering over the icon (next to your username) 
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
  <br>
  <div id="accountSettings">
    Account Settings
  </div>
    </v-container>
</template>


<script>
import navbar from "@/components/navbar.vue";
export default {
    data () {
      return {
        show:false,
        loader: null,
        loading: false,
        loading2: false,
        loading3: false,
        loading4: false
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    }
}
</script>

<style>
#accountSettings{
  margin: 0 auto;
  color: aqua;
}
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
