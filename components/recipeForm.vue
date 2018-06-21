<template>
    <v-form class="form">
        <v-text-field 
            class="title"
            label="Title"
            :value="title"
        ></v-text-field>
        <img :src="image" alt="Image" height="200" width="680">
        <input type="file" class="image-button" @change="onImageSelected">
        <v-text-field 
            class="description"
            label="Description"
            textarea
            :value="description"
        ></v-text-field>
        <v-text-field 
            class="calories"
            label="Calories"
            type="number"
            :value="calories"
        ></v-text-field>
        <div class="list-title">
            <h2>Ingredients</h2>
            <v-btn 
                small 
                depressed
                color="primary"
                class="add-button"
                @click="addIngredient"
            >
                <v-icon style="margin-right: 5px">add_circle</v-icon>
                <h3>add</h3>
            </v-btn>
        </div>
        <v-list>
            <v-list-tile v-for="(ingredient, i) in ingredients" :key="i">
                <v-text-field
                    v-model="ingredients[i]"
                ></v-text-field>
            </v-list-tile>
        </v-list>
        <div class="list-title">
            <h2>Directions</h2>
            <v-btn 
                small 
                depressed
                color="primary"
                class="add-button"
                @click="addDirection"
            >
                <v-icon style="margin-right: 5px">add_circle</v-icon>
                <h3>add</h3>
            </v-btn>
        </div>
        <v-list>
            <v-list-tile v-for="(direction, i) in directions" :key="i">
                <v-text-field
                    v-model="directions[i]"
                ></v-text-field>
            </v-list-tile>
        </v-list>
    </v-form>
</template>

<script>
export default {
    data(){
        return {
            title: "",
            image: "",
            description: "",
            ingredients:[],
            directions:[],
            calories: 0
        };
    },
    methods:{
        onImageSelected(event){
            const file = event.target.files[0];
            const fr = new FileReader();
            fr.onload = event => this.image.src = fr.result;
            fr.readAsDataURL(file);
        },
        addIngredient(){
            this.ingredients.push("");
        },
        addDirection(){
            this.directions.push("");
        }
    }
}
</script>

<style scoped>
.list-title{
    display: flex;
    align-items: center;
}
.add-button{
    margin-left: auto;
}
.image-button{
    margin-right: auto;
}
.form{
    display: flex;
    flex-direction: column;
}
</style>
