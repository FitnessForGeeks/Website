<template>
    <v-container>
        
    </v-container>
</template>

<script>
import { isLoggedIn } from "@assets/account";

export default {
    created(){
        if(isLoggedIn())
            this.isVerified = true
    },
    data(){
        isVerified: false;
    }
}
</script>

<style>

</style>
