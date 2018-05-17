<template>
    <v-container>
        <div v-if="this.loading"> loading </div>
        <div v-else-if="this.isVerified"> verified </div>
        <div v-else> not verified </div>
    </v-container>
</template>

<script>
import axios from "axios";
import { getAccount } from "@/assets/account";

export default {
    async asyncData(){
        let account = getAccount();
        return { isVerified: account.isVerified, loading: false };
    },
    data(){
        return {
            isVerified: false,
            loading: true
        }
    }
}
</script>

<style>

</style>

