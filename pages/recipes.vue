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
import { getAll, getByQuery } from "@/assets/recipe";
import { mapGetters } from "vuex";
import axios from "axios";
import Recipe from "@/components/recipe.vue";
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
    },
    isForbidden() {
      return this.account.birthdate === null;
    }
  },
  created() {
    if (this.account === null) {
        this.$router.push("/login");
    }
  },
  mounted() {
    getAll()
      .then(res => {
        this.loadingRecipes = false;
        this.recipes = res.data;
        this.$nextTick(() => {
            this.$refs.recipe.loadReviews(this.recipes[this.recipeIndex].id);
        });
      })
      .catch(err => console.log(err));
  },
  watch:{
      account: function(val){
          if(val === null){
              this.$router.push("/");
          }
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
    newRecipeIndex(i) {
        this.recipeIndex = i;
        window.scrollTo(0, 0);
        this.$nextTick(() => {
            this.$refs.recipe.loadReviews(this.recipes[this.recipeIndex].id);
        });
    },
    onSearchRequest(query) {
        this.loadingRecipes = true;
        getByQuery(query).then(res => {
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
