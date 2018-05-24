<template>
    <v-container class="container">
        <v-form class="search-form">
            <v-text-field
                solo
                flat
                autofocus
                v-model="query"
                class="search-field"
                placeholder = "Search"
            >
            </v-text-field>
            <v-btn
                class="search-button"
                depressed
                color="primary"
            >Search</v-btn>
        </v-form>
        <v-list dense class="result-list">
            <v-list-tile avatar @click="">
                <v-list-tile-avatar>
                    <img src="/doc-images/avatars/avatar_user_devil.png" alt="" srcset="">
                </v-list-tile-avatar>
                <v-list-tile-content >
                    <v-list-tile-title>
                        Kuchen
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                        Calories: 2000
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            query: ""
        }
    }
}
</script>

<style>
.container{
    padding-top: 80px;
    padding-left: 100px;
    padding-right: 100px;
}
.result-list{
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    height: calc(100% - 80px);
}
.search-form{
    display: flex;
    margin: 0 auto;
    width: 50%;
}
.search-field{
    margin-bottom: 10px;
}
</style>
