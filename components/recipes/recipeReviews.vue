<template>
    <div class="root">
        <ul class="recipe-reviews">
            <li v-for="(review, i) in reviews" :key="i">
                <recipe-review
                    :review="review"
                >
                </recipe-review>
            </li>
        </ul>
        <div class="paginator-container">
            <v-pagination
                :length="paginationLength"
                v-model="currentPage"
                ref="paginator"
                class="paginator"
                @input="onNextPage"
            ></v-pagination>
        </div>
    </div>
</template>

<script>
import RecipeReview from "./recipeReview.vue";

export default {
    components: {
        RecipeReview
    },
    data(){
        return {
            currentPage: 1,
            isNewRecipe: false
        }
    },
    computed: {
        paginationLength(){
            const length = this.recipe.reviewCount / 5;
            const decimals = length % 1;
            const output = Math.round(decimals === 0? length : length + 1 - decimals);
            return output;
        }
    },
    watch: {
        reviews(newVal, oldVal){
            if(oldVal.length !== 0 && !this.isNewRecipe){
                this.$nextTick(() => window.scrollTo(0, document.body.scrollHeight));
                this.isNewRecipe = false;
            }
        }
    },
    methods:{
        onNextPage(newPageIndex){
            this.$emit("next-page", newPageIndex);
        },
        onNewRecipe(){
            this.isNewRecipe = true;
        }
    },
    props: ["reviews", "recipe"]
}
</script>

<style scoped>

.recipe-reviews {
    padding: 0 100px;
    margin-bottom: 50px;
}

.recipe-reviews li{
    list-style-type: none;
}

.paginator-container{
    display: flex;
}

.paginator{
    margin: 0 auto;
}

</style>
