<template>
    <div class="wrapper">
        <search-sidebar 
            :loading="loadingRecipes" 
            :items="recipes" 
            @search="" 
            @new-index="i => recipeIndex = i"
        ></search-sidebar>
        <v-card v-if="!loadingRecipes && recipes[recipeIndex] !== undefined" class="recipe-view">
            <v-card-title>
                <p class="recipe-title">
                    {{ recipes[recipeIndex].title }}
                </p>
            </v-card-title>
            <v-card-content class="recipe-content">
                <img :src="recipes[recipeIndex].image" width="600" height="300" class="recipe-image"></img>
            </v-card-content>
        </v-card>
    </div>
</template>

<script>
import { getAll } from "@/assets/recipe";
import axios from "axios";
import SearchSidebar from "@/components/searchSidebar";

export default {
    components:{
        "search-sidebar": SearchSidebar
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
            loadingRecipes: true
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
    width: 100%;
}
</style>
