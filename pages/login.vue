<template>
    <v-container>
        <v-card dense class="login-form">
            <v-card-text>
                <v-form v-model="valid" ref="vForm" @keydown.enter.native="onFormEnter">
                    <v-text-field
                        autofocus
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
                    <loading-button :loading="loggingIn" color="primary" @click="onSubmitButtonClicked"> Login </loading-button>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { logIn } from "@/assets/account.js";
import loadingButton from "@/components/loadingButton";

export default {
    components:{
        "loading-button": loadingButton
    },
    data(){
        return {
            username: "",
            password: "",
            valid: true,
            loggingIn: false,
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
            this.onSubmitButtonClicked();
        },
        onSubmitButtonClicked(){
            if(this.valid){
                this.loggingIn = true;
                this.$store
                    .dispatch("authentication/logIn", {
                        username: this.username,
                        password: this.password,
                    })
                    .then(() => this.$router.push("/"))
                    .catch(err => {
                        this.loggingIn = false;
                        console.log(err.message);
                    });
            }
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
