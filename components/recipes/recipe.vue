<template>
    <v-card>
        <div class="content">
            <div class="header">
                <div class="header-left">
                    <span class="header-title">
                        {{ recipe.title }}
                    </span>
                    <div class="header-rating">
                    <star-rating 
                        :show-rating="false" 
                        read-only 
                        :increment="0.5"
                        v-model="recipe.avgRating"
                    />
                    </div>
                    <p>
                    <span class="owner">by {{recipe.owner}}</span> 
                    | 
                    <button class="button-navigator" @click="() => this.scrollToSelector('#reviews')">reviews {{recipe.reviewCount}}</button>
                    </p>
                    <p class="description">"{{recipe.description}}"</p>
                </div>
                <img class="header-right image" :src="recipe.image" width="560" height="315"/>
            </div>
            <recipe-ingredients
                :ingredients="recipe.ingredients"
            ></recipe-ingredients>
            <recipe-directions
                :directions="recipe.directions"
            ></recipe-directions>
            <div class="actions">
                <v-btn color="primary" class="eat-button" @click="onEatClicked">
                    EAT IT
                </v-btn>
            </div>
            <h1 class="reviews-title">Reviews</h1>
            <recipe-review-form
                @post-request="onPostReviewRequest"
            ></recipe-review-form>
            <recipe-reviews 
                id="reviews"
                ref="reviews"
                :reviews="reviews"
                :recipe="recipe"
                @next-page="onNextReviewPage"
            >
            </recipe-reviews>
            
        </div>
    </v-card>
</template>

<script>
import { 
    getAllByAccountIdWithPage as getAllReviewsByAccountIdWithPage,
    post as postReview
} from "@/assets/review";
import { mapGetters } from "vuex";
import RecipeReviews from "./recipeReviews.vue";
import RecipeDirections from "./recipeDirections.vue";
import RecipeIngredients from "./recipeIngredients.vue";
import RecipeReviewForm from "./recipeReviewForm.vue";
import StarRating from "vue-star-rating";

export default {
    props: ["recipe"],
    components: {
        StarRating,
        RecipeReviews,
        RecipeDirections,
        RecipeIngredients,
        RecipeReviewForm
    },
    watch: {
        recipe(newVal, oldVal){
            this.$refs.reviews.onNewRecipe();
        }
    },
    data(){
        return {
            reviews: []
        }
    },
    computed: {
        ...mapGetters({
            account: "account/account"
        })
    },
    methods: {
        loadReviews(id, pageNumber = 1){
            getAllReviewsByAccountIdWithPage(id, pageNumber).then(
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
                behavior: "smooth"
            });
        },
        onPostReviewRequest(payload){
            postReview(this.account.id, this.recipe.id, payload.rating, payload.text)
            .then(res => {
                this.loadReviews(this.recipe.id);
                this.recipe.avgRating = ((this.recipe.avgRating * this.recipe.reviewCount) + payload.rating)/(this.recipe.reviewCount + 1);
                this.recipe.reviewCount++;
            });
        },
        onNextReviewPage(i){
            this.loadReviews(this.account.id, i);
        }
    }
}
</script>

<style scoped>
.image {
  margin-right: 20px;
}

.reviews-title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 50px;
}

.header-title {
  font-size: 40px;
}

.header {
  display: flex;
}

.content {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.eat-button {
  margin-left: auto;
}

.actions {
  display: flex;
  width: 100%;
  padding: 100px 200px;
}

.button-navigator {
  color: blue;
}

.owner {
  font-style: italic;
  color: grey;
}

.description {
  width: 400px;
  margin: 0 auto;
  overflow-wrap: break-word;
}

.header-rating {
  width: 250px;
  margin: 0 auto;
}

.header-left {
  text-align: center;
  flex-grow: 1;
}



</style>
