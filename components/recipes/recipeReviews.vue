<template>
    <div class="root">
        <v-menu offset-y>
            <v-btn 
                flat 
                small
                slot="activator"
                class="sort-btn"
            > 
                <v-icon class="sort-btn-icon">sort</v-icon>sort by
            </v-btn>
            <v-list dense>
                <v-list-tile v-for="(item, i) in sortMenuItems" :key="i" @click="item.onClick(i)">
                    {{item.text}} <v-icon small class="sort-menu-item-icon">{{item.icon}}</v-icon>
                </v-list-tile>
            </v-list>
        </v-menu>
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
            selectedSortIndex: 0,
            sortMenuItems: [
                {
                    text: "NEWEST",
                    icon: "arrow_upward",
                    onClick: i => {
                        this.selectedSortIndex = i;
                        this.onNextPage();
                    }
                },
                {
                    text: "NEWEST",
                    icon: "arrow_downward",
                    onClick: i => {
                        this.selectedSortIndex = i;
                        this.onNextPage();
                    }
                },
                {
                    text: "RATING",
                    icon: "arrow_upward",
                    onClick: i => {
                        this.selectedSortIndex = i;
                        this.onNextPage();
                    }
                },
                {
                    text: "RATING",
                    icon: "arrow_downward",
                    onClick: i => {
                        this.selectedSortIndex = i;
                        this.onNextPage();
                    }
                },
            ],
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
            }

            if(this.isNewRecipe)
                this.isNewRecipe = false;
        }
    },
    methods:{
        onNextPage(){
            const { text, icon } = this.sortMenuItems[this.selectedSortIndex];
            const isAscending = icon === "arrow_upward";
            this.$emit("load-page", this.currentPage, {
                text,
                isAscending 
            });
        },
        onNewRecipe(){
            this.isNewRecipe = true;
        }
    },
    props: ["reviews", "recipe"]
}
</script>

<style scoped>

.sort-menu-item-icon{
    margin-left: auto;
}

.sort-btn-icon{
    margin-right: 10px;
}

.root{
    padding: 0 100px;
    padding-bottom: 50px;
}

.recipe-reviews {
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
