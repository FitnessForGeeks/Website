<template>
    <div>
        <v-app light>
            <navbar></navbar>
            <nuxt></nuxt>
        </v-app>
    </div>
</template>
<script>
import navbar from "@/components/navbar.vue";

export default {
    components:{
        navbar
    }
}
</script>
<style>
</style>
