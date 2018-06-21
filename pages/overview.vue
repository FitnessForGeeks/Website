<template>
    <div class="root">
        <ul class="recipe-list">
            <li v-for="(item, i) in recipes" :key="i">
                <img :src="item.image" alt="" width="100">
                {{item.title}}
                {{item.calories}}
                {{item.date}}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getCurrentEatenRecipes } from "@/assets/account";

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
                    getCurrentEatenRecipes(this.account.id)
                    .then(res => {
                        this.recipes = res.data;
                    });
                }
            }
        }
    },
    mounted(){
    },
    methods:{
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
.root{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.recipe-list{

}
.recipe-list li{
    list-style-type: none;
}
</style>
