<template>
    <div class="recipe-review">
        <div class="left">
            <v-avatar :size="70">
                <img :src="review.profilePicture"/>
            </v-avatar>
            <span class="username">{{review.username}}</span>
        </div>
        <div class="right">
            <div class="right-top">
                <star-rating
                    :show-rating="false" 
                    read-only 
                    :increment="0.5"
                    :star-size="20"
                    v-model="review.rating"
                ></star-rating>
                <span class="date">{{postedSince}}</span>
            </div>
            <span
                class="text"
            >
                {{review.text}}
            </span>
        </div>
    </div>
</template>

<script>
import StarRating from "vue-star-rating";
import moment from "moment";

export default {
    components:{
        StarRating,
    },
    computed:{
        postedSince(){
            console.log(this.review.createdAt)
            return moment().from(moment(this.review.createdAt))  ;
        }
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
  padding: 5px;
  word-wrap: break-word;
}

.recipe-review {
  display: flex;
  padding-top: 40px;
  padding-bottom: 20px;
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
  width: 100%;
}

.right-top{
    display: flex;
}

.date{
    margin-left: 10px;
}

</style>
