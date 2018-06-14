<template>
    <v-toolbar dense tabs dark class="navbar">
        <v-toolbar-title class="margin-right"> FitnessForGeeks </v-toolbar-title>
        <v-toolbar-items>
            <v-btn v-for="(route, i) in this.routes" :key="i" :to="route.path" nuxt flat>
                 {{ route.name }}
            </v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-if="this.loggedIn" class="align-right">
            <v-menu offset-y min-width="300">
                <div slot="activator">
                    <v-btn flat class="dropdown-btn margin-right"> {{account.username}} <i class="material-icons">arrow_drop_down</i> </v-btn>
                    <v-avatar>
                        <img class="user-avatar" src="http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg">
                    </v-avatar>
                </div>
                <v-list >
                    <v-list-tile>
                        <div class="calories-progress">
                            <span class="dropdown-text">Remaining calories<span style="margin-left: auto">{{account.remainingCalories}}</span> </span>
                            <v-progress-linear :value="caloriesProgress"></v-progress-linear>
                        </div>
                    </v-list-tile>
                    <v-list-tile></v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile @click="() => this.$router.push('profilePage')" id="logOut" >
                        <span class="dropdown-text">
                            Go to profile <v-icon class="log-out-icon">person</v-icon>
                        </span>
                    </v-list-tile>
                    <v-list-tile @click="onUserMenuClicked" id="logOut" >
                        <span class="dropdown-text">
                            Log out <v-icon class="log-out-icon">arrow_forward</v-icon>
                        </span>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar-items>
        <v-toolbar-items v-if="!this.loggedIn" class="align-right">
            <v-btn nuxt flat exact to="login"> login </v-btn>
            <v-btn nuxt flat exact to="register"> register </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters({
            account: "account/account"
        }),
        loggedIn(){
            return this.account != null;
        },
        caloriesProgress(){
            const prog = this.account.remainingCalories / this.account.tdee * 100;
            console.log(prog);
            return prog;
        }
    },
    created(){
        this.$store.dispatch("account/authenticate").catch(err => {
            console.log(err);
            if(err.request.status === 0){
                console.log(err.message)
            }
        });
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
            this.$store.dispatch("account/logOut");
        }
    },
    data(){
        return {
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
.calories-progress{
    padding-top: 50px;
    display: flex;
    width: 100%;
    flex-direction: column;
}
.log-out-icon{
    margin-left: auto;
}
.dropdown-text{
    display: flex;
    width: 100%;
    font-size: 18px;
}
.navbar{
    padding: 10px 0;
}
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
