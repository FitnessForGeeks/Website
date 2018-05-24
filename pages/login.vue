<template>
    <v-container>
        <v-card dense class="login-form">
            <v-card-text>
                <v-form v-model="valid" ref="vForm" @keydown.enter.native="onFormEnter">
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
                    <v-btn :disabled="!valid" @click="onSubmitButtonClicked" ref="submitButton"> Login </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import AccountApi from "@/assets/account.js";

export default {
    mounted(){
        if(this.$store.getters.loggedIn)
            this.$router.push("/");
    },
    data(){
        return {
            username: "",
            password: "",
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
        onFormEnter(){
            this.$refs.submitButton.$listeners.click()
        },
        onSubmitButtonClicked(){
            if(this.valid)
                AccountApi.logIn(this.username, this.password)
                .then(res => {
                    this.$router.push("/");
                    this.$store.commit("account/logIn");
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
