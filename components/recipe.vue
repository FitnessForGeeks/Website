<template>
    <v-card class="recipe-view">
        <div class="recipe-content">
            <div class="recipe-header">
                <div class="recipe-content-header-left">
                    <span class="recipe-content-header-title">
                        {{ recipe.title }}
                    </span>
                    <div class="recipe-content-header-rating">
                    <star-rating 
                        :show-rating="false" 
                        read-only 
                        :increment="0.5"
                        v-model="recipe.avgRating"
                    />
                    </div>
                    <p>
                    <span class="recipe-owner-text">by {{recipe.owner}}</span> 
                    | 
                    <button class="button-navigator" @click="() => this.scrollToSelector('#reviews')">reviews {{recipe.reviewCount}}</button>
                    </p>
                    <p class="recipe-description">"{{recipe.description}}"</p>
                </div>
                <img class="recipe-header-right recipe-image" :src="recipe.image" width="560" height="315"/>
            </div>
            <div class="recipe-content-ingredients">
                <h1 class="recipe-content-ingredients-title">Ingredients</h1>
                <div class="recipe-content-ingredients-content">
                    <ul class="recipe-content-ingredients-list">
                        <li v-for="(ingredient, i) in recipe.ingredients" :key="i" class="recipe-content-ingredient">
                            <v-icon>remove</v-icon><span class="recipe-content-ingredient-text">{{ingredient}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <recipe-directions
                :directions="recipe.directions"
            ></recipe-directions>
            <div class="recipe-content-actions">
                <v-btn color="primary" class="recipe-eat-button" @click="onEatClicked">
                    EAT IT
                </v-btn>
            </div>
            <recipe-reviews 
                id="reviews"
                ref="reviews"
                :reviews="reviews"
            >
            </recipe-reviews>
        </div>
    </v-card>
</template>

<script>
import { getAllByAccountId as getAllReviewsByAccountId } from "@/assets/review";
import RecipeReviews from "@/components/recipeReviews.vue";
import RecipeDirections from "@/components/recipeDirections.vue";
import StarRating from "vue-star-rating";

export default {
    props: ["recipe"],
    components: {
        StarRating,
        RecipeReviews,
        RecipeDirections,
    },
    data(){
        return {
            reviews: []
        }
    },
    methods: {
        loadReviews(id){
            getAllReviewsByAccountId(id).then(
                res => {
                    this.reviews = res.data;
                }
            );
        },
        onEatClicked() {
            this.$store.dispatch("account/eatRecipe", this.recipe);
        },
        scrollToSelector(selector) {
            this.$el.querySelector(selector).scrollIntoView({
                block: "start",
                inline: "nearest",
                behavior: "smooth"
            });
        }
    }
}
</script>

<style>


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

.recipe-header {
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

.recipe-content-actions {
  display: flex;
  width: 100%;
  padding: 100px 200px;
}
.recipe-content-ingredients-content {
  width: 100%;
  height: 100%;
}

.recipe-content-ingredients-list {
  list-style-type: none;
  padding-left: 200px;
}

.recipe-content-ingredient-text {
  font-size: 17px;
}

.button-navigator {
  color: blue;
}
.recipe-content-ingredients {
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

.recipe-content-ingredients-title{
  text-align: center;
  margin-bottom: 20px;
}

</style>
