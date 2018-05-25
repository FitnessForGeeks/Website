<template>
    <div class="container">
        <v-navigation-drawer class="sidebar" width="400">
            <v-form class="search-form">
                <v-text-field
                    solo
                    flat
                    autofocus
                    v-model="query"
                    class="search-field"
                    placeholder = "Search"
                >
                </v-text-field>
                <v-btn
                    class="search-button"
                    depressed
                    color="primary"
                >Search</v-btn>
            </v-form>
            <v-divider></v-divider>
            <v-list dense class="result-list">
                <v-list-tile :color="i == recipeIndex? 'primary' : ''" v-for="(recipe, i) in recipes" :key="i" avatar @click="() => switchRecipe(i)">
                    <v-list-tile-avatar>
                        <img :src="recipe.image" alt="" srcset="">
                    </v-list-tile-avatar>
                    <v-list-tile-content >
                        <v-list-tile-title>
                            {{ recipe.title }}
                        </v-list-tile-title>
                        <v-list-tile-sub-title>
                            Calories: {{ recipe.calories }}
                        </v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-card class="recipe-view">
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
export default {
    data(){
        return{
            query: "",
            recipes:[
                {
                    image: "https://de.rc-cdn.community.thermomix.com/recipeimage/jtvuiwjs-cf76f-438951-cfcd2-2nm5kkqw/b1db0880-a300-4618-ad14-18be177dfbe8/main/0815-kuchen-gugelhupf-mit-gelinggarantie.jpg",
                    title: "Kuchen",
                    calories: 2000
                },
                {
                    image: "https://www.duden.de/_media_/full/K/Keks-201100285851.jpg",
                    title: "Keks",
                    calories: 739
                },
                {
                    image: "http://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg",
                    title: "Pizza",
                    calories: 495
                },
                {
                    image: "https://static.chefkoch-cdn.de/ck.de/rezepte/52/52527/792482-960x720-fisch-in-chilibutter-in-alufolie.jpg",
                    title: "Fisch",
                    calories: 1630
                },
                {
                    image: "https://www.fuersie.de/sites/fuersie/files/styles/590x443/public/images/pasta.jpg",
                    title: "Nudeln",
                    calories: 1
                },
            ],
            recipeIndex: 0
        }
    },
    methods:{
        switchRecipe(index){
            this.recipeIndex = index;
        }
    }
}
</script>

<style scoped>
.container{
    display: flex;
}
.result-list{
    height: calc(100% - 80px);
}
.search-form{
    display: flex;
    margin: 0 auto;
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
.sidebar{
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
</style>
