<template>
    <div class="page">
        <div v-show="authenticating" class="loading-screen">
            <div class="wrapper">
                <span>Fitness For Geeks</span>
                <p>Authenticating</p>
                <spinner fadeIn="quarter" class="spinner" name="cube-grid" color="#adacef"/>
            </div>
        </div>
        <transition appear>
            <div v-show="!authenticating">
                <v-app class="app">
                    <navbar></navbar>
                    <nuxt class="page"></nuxt>
                </v-app>
            </div>
        </transition>
    </div>
</template>
<script>
import navbar from "@/components/navbar.vue";
import Spinner from "vue-spinkit";
import { mapGetters } from "vuex";

export default {
    data(){
        return {
            authenticating: true
        }
    },
    computed:{
        ...mapGetters({
            account: "account/account"
        })
    },
    mounted(){
        const acc = JSON.parse(sessionStorage.getItem("account"));
        console.log(acc);
        if(acc){
            this.$store.commit("account/logIn", acc);
            this.authenticating = false;
        }
        else{
            this.$store.dispatch("account/authenticate")
            .catch(err => {
                if(err.request.status === 0){
                    console.log(err.message)
                }
            })
            .then(res => {
                if(res)
                    sessionStorage.setItem("account", JSON.stringify(res.data));
            })
            .finally(() => {
                setTimeout(() => this.authenticating = false, 1000);
            });
        }
    },
    components:{
        navbar,
        Spinner
    }
}
</script>
<style scoped>
.page {
    margin-top: 34px;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
}
.page{
    height: 100vh;
}
.loading-screen{
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.spinner{
    margin: 20px auto;
}
.wrapper span{
    font-size: 60px;
    margin-bottom: 10px;
}
.wrapper p{
    text-align: center;
    font-size: 20px;
    color: #9E9E9E;
}
</style>
