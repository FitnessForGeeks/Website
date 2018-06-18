<template>
    <div class="recipe-review">
        <div class="left">
            <v-avatar :size="70">
                <img :src="review.profilePicture"></img>
            </v-avatar>
            <span class="username">{{review.username}}</span>
        </div>
        <div class="right">
            <star-rating
                :show-rating="false" 
                read-only 
                :increment="0.5"
                :star-size="25"
                v-model="review.rating"
            ></star-rating>
            <span class="text">
                {{review.text}}
            </span>
        </div>
    </div>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
    components:{
        StarRating,
    },
    props:["review"]
}
</script>

<style scoped>
.username {
  text-align: center;
}

.text {
  font-size: 20px;
}

.recipe-review {
  display: flex;
  padding-top: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid grey;
  width: 100%;
}

.left {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.right {
  display: flex;
  flex-direction: column;
}
</style>
