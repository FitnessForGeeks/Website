<template>
    <div class="root">
        <recipe-form
            :recipe="recipe"
            submit-value="Update"
            @submit="updateRecipe"
        ></recipe-form>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import RecipeForm from "@/components/recipeForm.vue";
import { create, uploadRecipePicture } from "@/assets/recipe";

export default {
    computed:{
        ...mapGetters({
            account: "account/account",
            authenticating: "account/authenticating",
        })
    },
    created(){
        if(!this.$route.params.recipe)
            this.$router.push("/myRecipes");
        else
            this.recipes = JSON.parse(this.$route.params.recipe);
        console.log(this.recipes);
    },
    data(){
        return {
            recipe: {}
        };
    },
    components:{
        RecipeForm
    },
    watch:{
        account(val){
            if(!val)
                this.redirectToLogin();
        },
        authenticating(val){
            if(!val && !this.account)
                this.redirectToLogin();
            else if(!this.account)
                this.redirecttologin();
            
        }
    },
    methods: {
        updateRecipe(recipe){
            recipe.accountId = this.account.id;
            console.log(recipe);
        }
    }
}
</script>

<style scoped>
.root{
    padding: 100px 400px;
}
</style>
