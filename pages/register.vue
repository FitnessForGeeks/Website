<template>
    <v-container>
        <v-alert v-for="(alert, i) in alerts" :key="i" :color="alert.color" icon="info" dismissible :value="alert.value" @click="() => onCloseAlert(i)">
            {{alert.message}}
        </v-alert>
        <v-card dense class="signup-form" :style="vCardStyles">
            <v-card-text>
                <v-form v-model="valid" @keydown.enter.native="onFormEnter()">
                    <v-text-field
                        autofocus
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
                    <v-btn ref="submitButton" color="primary" :disabled="!valid" @click="submit"> register </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>  
</template>

<script>
import { register } from "@/assets/account.js";
import { mapGetters } from "vuex";

export default {
    beforeUpdate(){
        if(this.account){
            this.$router.push("/");
        }
    },
    data(){
        return {
            alerts:[],
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
        onFormEnter(){
            this.$refs.submitButton.$listeners.click()
        },
        onCloseAlert(i){
            this.alerts.splice(i, 1);
        },
        submit(){
            if(this.valid){
                register(
                    this.username,
                    this.password,
                    this.email
                )
                .then(response => {
                    this.alerts = [];
                    this.$router.push("/login");
                })
                .catch(error => {
                    const { status, data } = error.response;
                    if(status === 409){
                        if(data.field === "username"){
                            this.alerts.push({
                                color: "info",
                                value: true,
                                message: "Username is already taken"
                            });
                        }
                        else if(data.field === "email"){
                            this.alerts.push({
                                color: "info",
                                value: true,
                                message: "Email is already being used"
                            });
                        }
                    }
                })
            }
        }
    },
    computed:{
        ...mapGetters({
            account: "account/account"
        }),
        vCardStyles(){
            return { "margin-top": (200 - this.alerts.length * 64) + "px"}
        }
    }
}
</script>

<style scoped>
.alert{
    z-index: 30px;
}
.signup-form{
    width: 400px;
    margin-left: auto;
    margin-right: auto;
}
</style>
