<template>
    <v-container>
        <v-card dense class="login-form">
            <v-card-text>
                <v-form v-model="valid" ref="vForm">
                    <v-text-field
                        label="Username"
                        v-model="username"
                        :class="{ 'input-group--dirty': dirtyUsername}"
                        :rules="[rules.required('Username')]"
                        id="username"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Password"
                        v-model="password"
                        type="password"
                        id="password"
                        :class="{ 'input-group--dirty': dirtyPassword}"
                        :rules="[rules.required('Password')]"
                        required
                    ></v-text-field>
                    <v-btn :disabled="!valid"> Login </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import AccountApi from "@/assets/accountApi.js";

export default {
    data(){
        return {
            username: "",
            password: "",
            dirtyUsername: null,
            dirtyPassword: null,
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
                AccountApi.signIn(this.username, this.password);
        }
    },
    mounted(){
        let times = 0;
        const interval = setInterval(() => {
            times += 1;
            if ((this.dirtyEmail && this.dirtyPwd) || times === 20) {
                clearInterval(interval);
            }
            this.dirtyEmail = document.querySelector('input[type="email"]:-webkit-autofill');
            this.dirtyPwd = document.querySelector('input[type="password"]:-webkit-autofill');
        }, 100); 
    }
}
</script>

<style>
.login-form{
    width: 400px;
    margin: 200px auto;
}
</style>
