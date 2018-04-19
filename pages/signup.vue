<template>
    <v-container>
        <v-card dense class="signup-form">
            <v-card-text>
                <v-form v-model="valid">
                    <v-text-field
                        label="Username"
                        v-model="username"
                        :rules="[rules.required('Username')]"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Password"
                        v-model="password"
                        type="password"
                        :rules="[rules.required('Password')]"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Confirm Password"
                        type="password"
                        :rules="[rules.required('Confirm Password'), rules.equals('password')]"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Email"
                        v-model="email"
                        type="email"
                        :rules="[rules.required('Email'), rules.email]"
                        required
                    ></v-text-field>
                    <v-btn :disabled="!valid" @click="onSubmitButtonClicked"> signup </v-btn>
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
            email: "",
            valid: true,
            rules: {
                required: name => val => {
                    if(val === "")
                        return name + " is required";
                    return true;
                },
                equals: name => val => {
                    if(val !== this[name])
                        return "Does not match " + name;
                    return true;
                },
                email: val => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if(!pattern.test(val))
                        return "Must be a valid email"
                    return true;
                }
            }
        }
    },
    methods:{
        onSubmitButtonClicked(){
            if(this.valid){
                AccountApi.signUp(
                    this.username,
                    this.password,
                    this.email
                );
            }
        }
    }
}
</script>

<style>
.signup-form{
    width: 400px;
    margin: 200px auto;
}
</style>
