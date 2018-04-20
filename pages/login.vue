<template>
    <v-container>
        <v-card dense class="login-form">
            <v-card-text>
                <v-form v-model="valid" ref="vForm">
                    <v-text-field
                        label="Username"
                        v-model="username"
                        :rules="[rules.required('Username')]"
                        id="username"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Password"
                        v-model="password"
                        type="password"
                        id="password"
                        :rules="[rules.required('Password')]"
                        required
                    ></v-text-field>
                    <v-checkbox
                        label="Stay logged in?"
                        v-model="stayLoggedIn"
                    ></v-checkbox>
                    <v-btn :disabled="!valid" @click="onSubmitButtonClicked"> Login </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import AccountApi from "@/assets/accountApi.js";

export default {
    mounted(){
        if(AccountApi.isLoggedIn)
            this.$router.push("/");
    },
    data(){
        return {
            username: "",
            password: "",
            stayLoggedIn: false,
            valid: true,
            rules: {
                required: name => val => {
                    if(val === "")
                        return name + " is required";
                    return true;
                }
            }
        }
    },
    methods:{
        onSubmitButtonClicked(){
            if(this.valid)
                AccountApi.signIn(this.username, this.password, this.stayLoggedIn, res => {
                    this.$store.commit("account/logIn");
                    this.$router.push("/");
                });
        }
    }
}
</script>

<style scoped>
.login-form{
    width: 400px;
    margin: 200px auto;
}
</style>
