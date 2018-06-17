<template>
    <div class="recipe-page">
        <div class="recipe-wrapper">
            <div>
                <search-sidebar 
                    :loading="loadingRecipes" 
                    :items="recipes"
                    @search="onSearchRequest" 
                    @new-index="newRecipeIndex"
                >
                </search-sidebar>
            </div>
            <v-card v-if="!loadingRecipes && selectedRecipe !== undefined" class="recipe-view">
                <div class="recipe-content">
                    <div class="recipe-header">
                        <div class="recipe-content-header-left">
                            <span class="recipe-content-header-title">
                                {{ selectedRecipe.title }}
                            </span>
                            <div class="recipe-content-header-rating">
                            <star-rating 
                                :show-rating="false" 
                                read-only 
                                :increment="0.5"
                                v-model="selectedRecipe.avgRating"
                            />
                            </div>
                            <p>
                            <span class="recipe-owner-text">by {{selectedRecipe.owner}}</span> 
                            | 
                            <button class="button-navigator" @click="() => this.scrollToSelector('#reviews')">reviews {{selectedRecipe.reviewCount}}</button>
                            </p>
                            <p class="recipe-description">"{{selectedRecipe.description}}"</p>
                        </div>
                        <img class="recipe-header-right recipe-image" :src="selectedRecipe.image" width="560" height="315"/>
                    </div>
                    <div class="recipe-content-ingredients">
                        <h1 class="recipe-content-ingredients-title">Ingredients</h1>
                        <div class="recipe-content-ingredients-content">
                            <ul class="recipe-content-ingredients-list">
                                <li v-for="(ingredient, i) in selectedRecipe.ingredients" :key="i" class="recipe-content-ingredient">
                                    <v-icon>remove</v-icon><span class="recipe-content-ingredient-text">{{ingredient}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="recipe-content-directions">
                        <h1 class="recipe-content-directions-title">Directions</h1>
                        <v-list class="recipe-content-directions-content">
                            <div v-for="(direction, i) in selectedRecipe.directions" :key="i" class="recipe-content-direction">
                                <div class="recipe-content-direction-button">
                                    <v-btn 
                                        class="direction-index-button" 
                                        :ripple="false" 
                                        :color="completedDirections[i]? 'primary': 'grey'" 
                                        :depressed="completedDirections[i]? true : false" 
                                        :outline="completedDirections[i]? false : true" 
                                        small
                                        fab 
                                        @click="() => $set(completedDirections, i, !completedDirections[i])"
                                    >
                                        <v-icon v-if="completedDirections[i]" medium>done</v-icon>
                                        <span v-else class="direction-index-text">{{i + 1}}</span>
                                    </v-btn>
                                </div>
                                <span :class="'recipe-content-direction-text ' + (completedDirections[i]? 'completed' : '') ">
                                    {{direction}}
                                </span>
                            </div>
                        </v-list>
                    </div>
                    <div class="recipe-content-actions">
                        <v-btn color="primary" class="recipe-eat-button" @click="onEatClicked">
                            EAT IT
                        </v-btn>
                    </div>
                    <div id="reviews" ref="reviews" class="recipe-content-reviews">
                        <h1 class="recipe-content-reviews-title">Reviews</h1>
                        <v-list class="recipe-content-reviews-list">
                            <v-list-tile v-for="(review, i) in reviews" :key="i">
                                {{review.text}}
                                {{review.rating}}
                            </v-list-tile>
                        </v-list>
                    </div>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
import { getAll, getByQuery } from "@/assets/recipe";
import { getAllByAccountId as getAllReviewsByAccountId } from "@/assets/review";
import { mapGetters } from "vuex";
import axios from "axios";
import ErrorDisplay from "@/components/errorDisplay.vue";
import ScrollMonitor from "scrollmonitor";
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
        this.$nextTick(() => {
            const watcher = ScrollMonitor.create(this.$refs.reviews);
            watcher.enterViewport(() => {
                console.log("entered");
                getAllReviewsByAccountId(res.data[this.recipeIndex].id)
                .then(res => {
                    this.reviews = res.data;
                });
                watcher.destroy();
            })
        });
    })
    .catch(err => console.log(err));
    
   
  },
  data() {
    return {
      recipes: [],
      completedDirections: [],
      reviews: [],
      recipeIndex: 0,
      loadingRecipes: true
    };
  },
  methods: {
    newRecipeIndex(i){
        this.recipeIndex = i;
        window.scrollTo(0, 0);
        this.$nextTick(() => {
            const watcher = ScrollMonitor.create(this.$refs.reviews);
            watcher.enterViewport(() => {
                console.log("entered");
                getAllReviewsByAccountId(this.recipes[this.recipeIndex])
                .then(res => {
                    console.log(res);
                });
                watcher.destroy();
            })
        });
    },
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
        this.$el.querySelector(selector).scrollIntoView({
            block: "start",
            inline: "nearest",
            behavior: "smooth"
        });
    }
  }
};
</script>

<style scoped>
.recipe-content-reviews-title{
    font-size: 20px;
    text-align: center;
}

.recipe-content-reviews{

}

.recipe-content-actions{
    display: flex;
    width: 100%;
    padding: 100px 200px;
}
.recipe-content-ingredients-content{
    width: 100%;
    height: 100%;
}

.recipe-content-ingredients-list{
    list-style-type: none;
    padding-left: 200px;
}

.recipe-content-ingredient-text{
    font-size: 17px;
}

.button-navigator {
  color: blue;
}
.recipe-content-ingredients{
    padding-top: 100px;
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
  flex-grow: 1;
}

.recipe-content-directions {
    padding-top: 100px;
    padding-left: 200px;
    padding-right: 200px;
}
.recipe-content-direction {
    display: flex;
    width: 100%;
    padding: 5px 0;
}

.completed{
    color: rgb(172, 172, 172);
}

.recipe-content-direction-button{
    display: flex;
    justify-content: flex-start;
}

.recipe-content-direction-text {
  width: 100%;
  font-size: 17px;
}

.recipe-content-ingredients-title,
.recipe-content-directions-title {
    text-align: center;
    margin-bottom: 20px;
}

.direction-index-button{
    margin-top: -8px;
}

.direction-index-button i {
  margin-top: 10px;
}
.direction-index-text {
  font-size: 20px;
  margin-top: -3px;
  margin-left: 1px;
}
.infoWrapper {
  padding: 10px;
  width: 100%;
  height: 100%;
}
.recipe-page{
    height: 100%;
    margin-left: 400px;
}
.recipe-wrapper {
    display: flex;
    height: 100%;
}
.recipe-view {
  width: 100%;
  height: 100%;
  padding: 0 10px;
}
.recipe-image {
  margin-right: 20px;
}
.recipe-content-header-title {
  font-size: 40px;
}
.recipe-header{
    display: flex;
}
.recipe-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.recipe-eat-button {
    margin-left: auto;
}
</style>
