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
            <recipe
                v-if="!loadingRecipes"
                ref="recipe"
                :recipe="selectedRecipe"
            ></recipe>
        </div>
    </div>
</template>

<script>
import { getAll as getAllRecipes, getByQuery as getAllRecipesByQuery } from "@/assets/recipe";
import { mapGetters } from "vuex";
import axios from "axios";
import Recipe from "@/components/recipes/recipe.vue";
import SearchSidebar from "@/components/searchSidebar";

export default {
    components: {
        SearchSidebar,
        Recipe
    },
    computed: {
        ...mapGetters({
            account: "account/account"
        }),
        selectedRecipe() {
            return this.recipes[this.recipeIndex];
        }
    },
    mounted(){
        this.loadRecipes();
    },
    watch:{
        account: function(val){
            this.loadRecipes();
        }
    },
    data() {
        return {
            recipes: [],
            reviews: [],
            recipeIndex: 0,
            loadingRecipes: true
        };
    },
    methods: {
        loadRecipes(){
            getAllRecipes()
            .then(res => {
                this.loadingRecipes = false;
                this.recipes = res.data;
                this.$nextTick(() => {
                    if(this.$refs.recipe && this.account)
                        this.$refs.recipe.loadReviews(this.selectedRecipe.id);
                });
            })
            .catch(err => console.log(err));
        },
        newRecipeIndex(i) {
            this.recipeIndex = i;
            window.scrollTo(0, 0);
            this.$nextTick(() => {
                    this.$refs.recipe.loadReviews(this.recipes[this.recipeIndex].id);
            });
        },
        onSearchRequest(query) {
            this.loadingRecipes = true;
            getAllRecipesByQuery(query).then(res => {
                this.loadingRecipes = false;
                this.recipes = res.data;
            });
        },
    }
};
</script>

<style scoped>

.infoWrapper {
  padding: 10px;
  width: 100%;
  height: 100%;
}
.recipe-page {
  height: 100%;
  margin-left: 400px;
}
</style>
