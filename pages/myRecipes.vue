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
                >
                    <v-icon style="margin-right: 5px">add_circle</v-icon>
                    add
                </v-btn>
            </v-card-title>
            <v-card-media>
                <v-list class="recipe-list">
                    <v-list-tile v-for="(recipe, i) in recipes" :key="i" class="recipe" >
                        <v-list-tile-content class="recipe-content">
                            <h2>{{recipe.title}}</h2>
                        </v-list-tile-content>
                        <span class="review-count">{{recipe.reviewCount}} Reviews</span>
                        <star-rating
                            read-only
                            class="rating"
                            star-size="20"
                            :show-rating="false"
                            v-model="recipe.avgRating"
                        ></star-rating>
                        <v-list-tile-avatar>
                            <img :src="recipe.image" >
                        </v-list-tile-avatar>
                        <v-list-tile-actions>
                            <v-btn small fab icon color="primary"><v-icon style="margin-top: 20px">edit</v-icon></v-btn>
                            <v-btn small fab icon color="red"><v-icon style="margin-top: 20px;color: white">remove_circle</v-icon></v-btn>
                        </v-list-tile-actions>
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
            recipes: []
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
                    this.redirecttologin();
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
            getMyRecipes(this.account.id)
            .then(res => {
                this.recipes = res.data;
                console.log(this.recipes);
            });
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
