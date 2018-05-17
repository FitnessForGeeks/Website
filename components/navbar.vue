<template>
    <v-toolbar dense tabs>
        <v-toolbar-title class="margin-right"> FitnessForGeeks </v-toolbar-title>
        <v-toolbar-items>
            <v-btn v-for="(route, i) in this.routes" :key="i" :to="route.path" nuxt flat>
                 {{ route.name }}
            </v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-if="this.loggedIn" class="align-right">
            <v-menu offset-y>
                <v-btn slot="activator" flat class="dropdown-btn margin-right"> Username <i class="material-icons">arrow_drop_down</i> </v-btn>
                <v-list>
                    <v-list-tile @click="onUserMenuClicked">
                        <v-list-tile-title id="logOut">
                            Log out
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-avatar>
                <img class="user-avatar" src="http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg">
            </v-avatar>
        </v-toolbar-items>
        <v-toolbar-items v-if="!this.loggedIn" class="align-right">
            <v-btn nuxt flat exact to="login"> login </v-btn>
            <v-btn nuxt flat exact to="register"> register </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import { isLoggedIn } from "@/assets/account.js";

export default {
    mounted(){
        this.$store.subscribe((mutation, state) => {
            switch(mutation.type){
                case "account/logIn":
                    this.loggedIn = true;
                    break;
                case "account/logOut":
                    this.loggedIn = false;
                    break;
            }
        })
        if(isLoggedIn()){
            this.$store.commit("account/logIn");
        }
    },
    methods:{
        onUserMenuClicked(event){
            switch(event.target.id){
                case "logOut":
                    this.logOut();
                    break;
            }
        },
        logOut(){
            AccountApi.logOut().
            then(() => this.$store.commit("account/logOut"));
        }
    },
    data(){
        return {
            loggedIn: false,
            routes: [
                {
                    path: "/",
                    name: "Home"
                },
                {
                    path: "/recipes",
                    name: "Recipes"
                },
                {
                    path: "/community",
                    name: "Community"
                }
            ]
        }
    }
}
</script>

<style scoped>
.margin-right {
    margin-right: 10px;
}
.align-right{
    margin-left: auto;
}
.user-avatar{
    width: 44px;
    height: 44px;
    cursor: pointer;
}
</style>
