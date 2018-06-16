<template>
    <div class="wrapper">
        <div v-if="account === null" class="infoWrapper">
            <error-display>
              You have to login before you can see the recipes
            </error-display>
        </div>
        <div v-else-if="isForbidden" class="infoWrapper">
            <error-display>
              Before you can access the recipes page you have to setup your profile.
              <v-btn to="/profilePage" color="primary"> go to profile </v-btn>
            </error-display>
        </div>
        <div v-else style="width: 100%">
            <div class="wrapper">
                <div>
                    <search-sidebar 
                        :loading="loadingRecipes" 
                        :items="recipes" 
                        @search="onSearchRequest" 
                        @new-index="i => recipeIndex = i"
                    >
                        <p>{{account.remainingCalories}}</p>
                    </search-sidebar>
                </div>
                <v-card v-if="!loadingRecipes && selectedRecipe !== undefined" class="recipe-view">
                    <div class="recipe-content">
                        <div class="recipe-content-header-left">
                            <span class="recipe-content-header-title">
                                {{ selectedRecipe.title }}
                            </span>
                            <div class="recipe-content-header-rating">
                              <star-rating 
                                :show-rating="false" 
                                read-only 
                                v-model="selectedRecipe.rating"
                              />
                            </div>
                            <p>
                              <span class="recipe-owner-text">by {{selectedRecipe.owner}}</span> 
                              | 
                              <button class="button-navigator" @click="() => this.scrollToSelector('#reviews')">reviews 80</button>
                            </p>
                            <p class="recipe-description">"{{selectedRecipe.description}}"</p>
                        </div>
                        <img class="recipe-header-right recipe-image" :src="selectedRecipe.image" width="800" height="350"></img>
                        <div class="recipe-content-directions">
                            <h1 class="recipe-content-directions-title">Directions</h1>
                            <v-list class="recipe-content-directions-content">
                                <v-list-tile v-for="(direction, i) in selectedRecipe.directions" :key="i">
                                    <v-btn 
                                        class="direction-index-button" 
                                        :ripple="false" 
                                        color="primary" 
                                        :depressed="completedDirections[i]? true : false" 
                                        :outline="completedDirections[i]? false : true" 
                                        small 
                                        fab 
                                        @click="() => $set(completedDirections, i, !completedDirections[i])"
                                    >
                                        <v-icon v-if="completedDirections[i]" medium>done</v-icon>
                                        <span v-else class="direction-index-text">{{i + 1}}</span>
                                    </v-btn>
                                    {{direction}}
                                </v-list-tile>
                            </v-list>
                        </div>
                        <v-btn color="primary" class="recipe-eat-button recipe-content-actions" @click="onEatClicked">
                            EAT IT
                        </v-btn>
                        <div id="reviews" class="recipe-content-reviews"></div>
                    </div>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import { getAll, getByQuery } from "@/assets/recipe";
import { mapGetters } from "vuex";
import axios from "axios";
import ErrorDisplay from "@/components/errorDisplay.vue";
import StarRating from "vue-star-rating";
import SearchSidebar from "@/components/searchSidebar";

export default {
  components: {
    SearchSidebar,
    StarRating,
    ErrorDisplay
  },
  computed: {
    ...mapGetters({
      account: "account/account"
    }),
    selectedRecipe() {
      return this.recipes[this.recipeIndex];
    },
    isForbidden() {
      return this.account.birthdate === null;
    }
  },
  mounted() {
    getAll()
      .then(res => {
        this.loadingRecipes = false;
        this.recipes = res.data;
      })
      .catch(err => console.log(err));
  },
  data() {
    return {
      recipes: [],
      completedDirections: [],
      recipeIndex: 0,
      loadingRecipes: true
    };
  },
  methods: {
    onSearchRequest(query) {
      this.loadingRecipes = true;
      getByQuery(query).then(res => {
        this.loadingRecipes = false;
        this.recipes = res.data;
      });
    },
    onEatClicked() {
      this.$store.dispatch("account/eatRecipe", this.selectedRecipe);
    },
    scrollToSelector(selector) {
      document.querySelector(selector).scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "smooth"
      });
    }
  }
};
</script>

<style scoped>
.button-navigator {
  color: blue;
}

.recipe-owner-text {
  font-style: italic;
  color: grey;
}
.recipe-description {
  width: 400px;
  margin: 0 auto;
  overflow-wrap: break-word;
}
.recipe-content-header-rating {
  width: 250px;
  margin: 0 auto;
}
.recipe-content-header-left {
  text-align: center;
  grid-area: headerLeft;
}
.recipe-content-header-right {
  grid-area: headerRight;
}
.recipe-content-directions {
  grid-area: directions;
  padding-top: 40px;
}

.recipe-content-directions-title {
  text-align: center;
}

.recipe-content-directions-content {
  padding-left: 100px;
}

.recipe-content-actions {
  grid-area: actions;
}
.recipe-content-reviews {
  grid-area: reviews;
}
.direction-index-button i {
  margin-top: 10px;
}
.direction-index-text {
  font-size: 20px;
}
.infoWrapper {
  padding: 10px;
  width: 100%;
  height: 100%;
}
.wrapper {
  display: flex;
  height: 100%;
}
.recipe-view {
  width: 100%;
  padding: 0 10px;
}
.recipe-image {
  margin-right: 20px;
}
.recipe-content-header-title {
  font-size: 40px;
}
.recipe-content {
  display: grid;
  grid-template-areas:
    "headerLeft headerRight"
    "directions directions"
    "actions actions"
    "reviews reviews";
  grid-template-rows: 40% 30% 20% 20%;
  grid-template-columns: 1fr 1fr;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
}
.recipe-eat-button {
  margin-left: auto;
}
</style>
