<template>
    <div class="root">
        <recipe-form></recipe-form>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import RecipeForm from "@/components/recipeForm.vue";

export default {
    computed:{
        ...mapGetters({
            account: "account/account",
            authenticating: "account/authenticating",
        })
    },
    data(){
        return {

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
}
</script>

<style scoped>
.root{
    padding: 100px 400px;
}
</style>
