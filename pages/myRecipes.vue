<template>
    <div class="root">
        <v-card height="100%">
            <v-card-title>
                <h1>
                    Recipes
                </h1>
                
                <v-btn
                    color="primary"
                    class="add-button"
                    depressed
                    @click="onAddRecipe"
                >
                    <v-icon style="margin-right: 5px" >add_circle</v-icon>
                    add
                </v-btn>
            </v-card-title>
            <v-card-media>
                <div class="loading-circle-container" v-if="loading">
                    <v-progress-circular indeterminate class="loading-circle"></v-progress-circular>
                </div>
                <v-list v-else class="recipe-list">
                    <v-list-tile v-for="(recipe, i) in recipes" :key="i" class="recipe" >
                        <v-list-tile-content class="recipe-content">
                            <h2>{{recipe.title}}</h2>
                        </v-list-tile-content>
                        <span class="review-count">{{recipe.reviewCount}} Reviews</span>
                        <star-rating
                            read-only
                            class="rating"
                            :star-size="20"
                            :show-rating="false"
                            v-model="recipe.avgRating"
                        ></star-rating>
                        <v-list-tile-avatar>
                            <img :src="recipe.image" >
                        </v-list-tile-avatar>
                        <v-list-tile-action>
                            <v-btn small fab icon color="primary" @click="onEditRecipe(i)"><v-icon style="margin-top: 20px">edit</v-icon></v-btn>
                        </v-list-tile-action>
                        <v-list-tile-action>
                            <v-btn small fab icon color="red" @click="onDeleteRecipe(i)"><v-icon style="margin-top: 20px;color: white">remove_circle</v-icon></v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card-media>
        </v-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getMyRecipes } from "@/assets/account";
import StarRating from "vue-star-rating";

export default {
    computed:{
        ...mapGetters({
            account: "account/account",
            authenticating: "account/authenticating"
        })
    },
    data(){
        return {
            recipes: [],
            loading: false
        };
    },
    components: {
        StarRating
    },
    watch:{
        account(val){
            if(!val)
                this.redirectToLogin();
        },
        authenticating(val){
            if(!val && !this.account)
                this.redirectToLogin();
            else {
                if(!this.account)
                    this.redirectToLogin();
                else {
                    this.loadRecipes();
                }
            }
        }
    },
    mounted(){
        if(this.account)
            this.loadRecipes();
    },
    methods:{
        loadRecipes(){
            this.loading = true;
            getMyRecipes(this.account.id)
            .then(res => {
                this.loading = false;
                this.recipes = res.data;
                console.log(this.recipes);
            });
        },
        onAddRecipe(){
            this.$router.push("/createRecipe");
        },
        onEditRecipe(i){
            this.$router.push({
                name: "editRecipe",
                params: {
                    recipe: JSON.stringify(this.recipes[i])
                }
            })
        },
        onDeleteRecipe(){

        },
        redirectToLogin(){
            this.$router.push({
                path: "/login",
                query: {
                    redirectPath: "/overview"
                }
            })
        }
    }
}
</script>

<style scoped>
.loading-circle-container{
    width: 100%;
    display: flex;
}
.loading-circle{
    margin: 0 auto;
}
.add-button{
    margin-left: auto;
}
.review-count{
    margin-right: 10px;
}
.root{
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 100px 200px;
}
.card{
    height: 100vh;
    padding: 20px;
}
.recipe-list{
    width: 50%;
    margin: 0 auto;
    height: 100%;
}
.recipe-list li{
    list-style-type: none;
}
</style>
