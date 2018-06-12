<template>
    <div class="wrapper">
        <div v-if="account === null" class="infoWrapper">
            You have to log in before accessing the recipes page.
        </div>
        <div v-else-if="isForbidden" class="infoWrapper">
            Before you can access the recipes page you have to setup your profile.
            <v-btn to="/profilePage" color="primary"> go to profile </v-btn>
        </div>
        <div v-else style="width: 100%">
            <div class="wrapper">
                <div>
                    <search-sidebar 
                        :loading="loadingRecipes" 
                        :items="recipes" 
                        @search="onSearchRequest" 
                        @new-index="i => recipeIndex = i"
                    >
                        <p>{{account.remainingCalories}}</p>
                    </search-sidebar>
                </div>
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
            </div>
        </div>
    </div>
</template>

<script>
import { getAll, getByQuery } from "@/assets/recipe";
import { mapGetters } from "vuex";
import axios from "axios";
import SearchSidebar from "@/components/searchSidebar";

export default {
    components:{
        "search-sidebar": SearchSidebar
    },
    computed: {
        ...mapGetters({
            account: "account/account"
        }),
        selectedRecipe(){
            return this.recipes[this.recipeIndex];
        },
        isForbidden(){
            return this.account.birthdate === null;
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
            loadingRecipes: true
        }
    },
    methods:{
        onSearchRequest(query){
            this.loadingRecipes = true;
            getByQuery(query)
            .then(res => {
                this.loadingRecipes = false;
                this.recipes = res.data;
            })
        },
        onEatClicked(){
            this.$store.dispatch("account/eatRecipe", this.selectedRecipe);
        }
    }
}
</script>

<style scoped>
.infoWrapper{
    padding: 10px;
}
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
