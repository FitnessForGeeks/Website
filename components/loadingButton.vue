<template>
    <v-btn v-bind="btnProps" v-on="this.$listeners"> 
        <v-progress-circular v-if="loading" size="25" indeterminate></v-progress-circular>
        <span v-else>
            <slot></slot>
        </span>
    </v-btn>   
</template>

<script>
export default {
    mounted(){
    },
    props: [ "loading", "color" ],
    computed:{
        btnProps(){
            return Object
                	.keys(this.$props)
                    .filter( key => !/^loading$/.test(key) )
                    .map(key => ({ [key]: this.$props[key] }));
        }
    }
}
</script>

<style scoped>

</style>
