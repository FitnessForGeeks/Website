<template>
  <v-container>
    <div class="cardDiv">
      <v-menu offset-y v-model="showMenu" absolute full-width>
      <img class="portrait" id="fileDisplayArea" src="doc-images/cards/profilePageStandardPicture.jpg" width="100%"  height="300px" slot="activator"></img> <!-- id="profilePagePictureId" -->
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" @click="onMenuClick">
          <v-list-tile-title :id="item.id">{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
      </v-menu>
    </div>
    <v-card-title>
      <div id="avatar-container">
        <v-avatar size="250" class="avatar"> 
          <img src="doc-images/avatars/avatar_user_grandfather.png" alt="Avatar">
        </v-avatar>
      </div> 
      Username
    </v-card-title>
    <input type="file" id="fileInput" ref="fileChooser" accept="image/*" style="display:none" multiple>
    <br>
    <div id="account-data">
      <p v-for="(data, i) in accountData" :key="i">{{data.name}}: <span class="account-data-content"> {{data.content}} </span></p>
    </div>
  </v-container>
</template>


<script>
import navbar from "@/components/navbar.vue";
export default {
  data: () => ({
    showMenu: false,
    accountData:[
      {
        name: "Height",
        content: "187 cm"
      },
      {
        name: "Weight",
        content: "187 kg"
      },
      {
        name: "age",
        content: "187"
      }
    ],
    items: [
      { title: "Change Picture", id: "changePictureId" },
      { title: "Info" } // no functionality yet
    ]
  }),
  methods: {
    onMenuClick(event) {
      if (event.target.id == "changePictureId"){
        this.$refs.fileChooser.click();
        var fileInput = document.getElementById('fileInput');
        var fileDisplayArea = document.getElementById('fileDisplayArea');
        fileInput.addEventListener('change', function(e) {
          var file = fileInput.files[0];
          var imageType = /image.*/;

          if (file.type.match(imageType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
              fileDisplayArea.innerHTML = "";

              var img = new Image();
              img.src = reader.result;

              fileDisplayArea.appendChild(img);
            }

            reader.readAsDataURL(file);	
          } else {
            fileDisplayArea.innerHTML = "File not supported!";
          }
        });
      }
    }
  }
};
</script>

<style>
.avatar{
  margin-top: -150px;
  margin-left: 30px;
}
#temp{
  text-align: center;
  display: block;
  color:black;
}
.portrait {
  background-position: center;
}
#accountSettingsListItem {
  text-align: center;
  font-size: 30px;
}
#avatar-container{
  width: 100%;
}
#account-data {
  font-size: 34px;
  color: #1565c0;
}
.account-data-content{
  color: #333;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
</style>
