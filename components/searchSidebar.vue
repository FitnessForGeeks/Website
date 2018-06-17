<template>
    <v-navigation-drawer permanent :fixed="true" class="sidebar">
        <div class="search-form">
            <v-text-field
                solo
                flat
                autofocus
                @keydown.native.enter="() => onSearch()"
                v-model="query"
                class="search-field"
                placeholder = "Search"
            >
            </v-text-field>
            <v-btn
                class="search-button"
                depressed
                color="primary"
                @click="onSearch"
            ><v-icon>search</v-icon></v-btn>
        </div>
        <v-divider></v-divider>
        <v-list v-if="!loading" dense class="result-list">
            <v-list-tile v-for="(item, i) in items" :key="i" :color="selectedIndex === i? 'primary' : ''" @click="() => changeIndex(i)">
                <v-list-tile-avatar>
                    <img :src="item.image" alt="" srcset="">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                        {{ item.title }}
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                        {{ item.subTitle}}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <v-progress-circular v-else indeterminate class="loading-circle"></v-progress-circular>
    </v-navigation-drawer>
</template>

<script>
export default {
    props: ["loading", "items"],
    data(){
        return {
            query: "",
            selectedIndex: 0
        }
    },
    methods:{
        onSearch(){
            this.$emit("search", this.query);
        },
        changeIndex(i){
            this.$emit("new-index", i);
            this.selectedIndex = i;
        }
    }
}
</script>

<style scoped>
.result-list{
    height: calc(100% - 80px);
}
.search-form{
    display: flex;
    margin: 0 auto;
}
.sidebar{
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    min-width: 400px;
    margin-top: 68px !important;
}
.loading-circle{
    display: block;
    padding-top: 100px;
    margin: 0 auto;
}

</style>
