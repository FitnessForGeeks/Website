<template>
   <div class="recipe-reviews">
        <h1 class="title">Reviews</h1>
        <ul class="list">
            <li v-for="(review, i) in reviews" :key="i">
                <recipe-review
                    :review="review"
                >
                </recipe-review>
            </li>
        </ul>
   </div> 
</template>

<script>
import RecipeReview from "./recipeReview.vue";

export default {
    components:{
        RecipeReview
    },
    props: ["reviews"]
}
</script>

<style lang="scss" scoped>

.recipe-reviews {
    padding: 0 100px;
    margin-bottom: 50px;

    .list li{
        list-style-type: none;
    }

    .title {
        font-size: 30px !important;
        text-align: center;
    }
}



</style>
