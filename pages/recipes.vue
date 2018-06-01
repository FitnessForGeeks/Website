<template>
    <div class="wrapper">
        <search-sidebar 
            :loading="loadingRecipes" 
            :items="recipes" 
            @search="onSearchRequest" 
            @new-index="i => recipeIndex = i"
        ></search-sidebar>
        <v-card v-if="!loadingRecipes && recipes[recipeIndex] !== undefined" class="recipe-view">
            <v-card-title>
                <p class="recipe-title">
                    {{ recipes[recipeIndex].title }}
                </p>
            </v-card-title>
            <div class="recipe-content">
                <img :src="recipes[recipeIndex].image" width="600" height="300" class="recipe-image"></img>
                <v-btn color="primary" class="recipe-eat-button" @click="onEatClicked">
                    EAT IT
                </v-btn>
            </div>
        </v-card>
        <v-snackbar v-if="selectedRecipe" left v-model="snackbarOpen" color="blue">
            You have {{selectedRecipe.calories}} remaining calories for the day
        </v-snackbar>
    </div>
</template>

<script>
import { getAll, getByQuery } from "@/assets/recipe";
import axios from "axios";
import SearchSidebar from "@/components/searchSidebar";

export default {
    components:{
        "search-sidebar": SearchSidebar
    },
    computed: {
        selectedRecipe(){
            return this.recipes[this.recipeIndex];
        }
    },
    mounted(){
        getAll()
        .then(res => {
            this.loadingRecipes = false;
            this.recipes = res.data;
        })
        .catch(err => console.log(err));
    },
    data(){
        return{
            recipes:[],
            recipeIndex: 0,
            snackbarOpen: false,
            loadingRecipes: true
        }
    },
    methods:{
        onSearchRequest(query){
            console.log("searching...");
            this.loadingRecipes = true;
            getByQuery(query)
            .then(res => {
                this.loadingRecipes = false;
                this.recipes = res.data;
            })
        },
        onEatClicked(){
            console.log(this.selectedRecipe.calories);
            this.snackbarOpen = true;
        }
    }
}
</script>

<style scoped>
.wrapper{
    display: flex;
    height: 100%;
}
.recipe-view{
    width: 100%;
    padding: 0 10px;
}
.recipe-image{
    margin: 0 auto;
}
.recipe-title{
    margin: 0 auto;
    font-size: 40px;
}
.recipe-content{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
.recipe-eat-button{
    margin-left: auto;
}
</style>
