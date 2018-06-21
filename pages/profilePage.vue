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
      <div id="centering">
        <div class="headline"> 
          <v-menu absolute>
            <v-avatar slot="activator" size="200"> 
              <img id="avatarId" src="doc-images/avatars/avatar_user_malestudent_blondehair.png" alt="Avatar">
            </v-avatar>
            <v-list> 
              <v-list-tile v-for="item in itemAvatar" :key="item.title" @click="onAvatarClick">
                <v-list-tile-title :id="item.id">{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
         
          <div id="followersFollowingId">
            Followers | Following | Recipes | Activities
          </div>
        </div> 
        <span class="grey--text"></span>
      </div> 
    </v-card-title>
    <input type="file" id="fileInput" ref="fileChooser" accept="image/*" style="display:none" multiple>
    <p id="username">Username</p>
    <div id="wrapper">
      <div id="descriptionId">
        <p style="color:#1565c0; font-size:30px">Description</p>
        <p>Firstname Surname</p><br>
        <p>A regular dude working a 9/5 while trying to live a healthy lifestyle. Be welcome to join me on my journey.</p>
        <p>Have a nice day :)</p>
        <br><br>
        <p id="makeSmallerDescriptionId">Joined at 20.6.2018</p>
      </div>
      <div id="personalDataOnRight">
        <p style="color:#1565c0; font-size:34px">Personal Data</p>
        <p>Height: 187 cm</p>
        <p>Weight: 76 kg</p>
        <p>Age: 17</p>
        <p>Gender: Male</p>
        <p>Birthdate: 1.1.1974</p>
      </div>
    </div>
  </v-container>
</template>

<script>
import navbar from "@/components/navbar.vue";
export default {
  data: () => ({
    showMenu: false,
    items: [
      { title: "Change Picture", id: "changePictureId" },
      { title: "Info", id: "infoId" } 
    ],
    itemAvatar: [
      { title: "Change Avatar", id: "changeAvatarId" }
    ]
  }),
  methods: {
    /*handleFileSelect(event) { //not correct 
    var files = event.target.files; // FileList object

    files is a FileList of File objects. List some properties.
    var output = [];
    console.log("before for loop");
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    console.log("after for loop");
    var temp = document.getElementById('profilePagePictureId').value;
    console.log("ProfilePagePictureId: " + temp);
    document.getElementById('profilePagePictureId').innerHTML = '<ul>' + output.join('') + '</ul>';
  }
  */
    onAvatarClick(event){
      /*TODO: choose between the preselected avatars from doc-images/avatars*/
      this.$refs.fileChooser.click();

      
      var fileInput = document.getElementById('fileInput').value;
      alert(fileInput);
      //var newPath = "doc-images/avatars/avatar_user_??.png";
      //document.getElementById("avatarId").src = newPath;
    },

    /*above stuff to try out*/
    onMenuClick(event) {
      /*var fullPath = document.getElementById('fileInput').value;
      console.log("fullPath: " + fullPath); //undefined
      console.log("event.target.id: " + event.target.id);
      if (event.target.id == "changePictureId") {
        this.$refs.fileChooser.click();
        var newSourceId = "doc-images/cards/newProfilePagePicture.jpg"; //get url from file chooser
        document.getElementById("fileInput").src=newSourceId;
        if (fullPath) { //get filename from filechooser
          var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
          var filename = fullPath.substring(startIndex);
          if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
          }
          console.log("filename: " + filename); 
        }
      }
      else{
        console.log("event.target.id: " + event.target.id + " is not changePictureId");
      }*/

    /* tryout stuff */
  
  if (event.target.id == "changePictureId"){ //changepicture button clicked
    this.$refs.fileChooser.click();
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
      var imageType = /image.*/;
      
			if (file.type.match(imageType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					fileDisplayArea.innerHTML = "doc-images/cards/newProfilePagePicture";

					var img = new Image();
					img.src = reader.result;

					fileDisplayArea.appendChild(img);
				}
        console.log(fileInput +"; " + fileDisplayArea); // not the wanted value
				reader.readAsDataURL(file);	
			} else {
				fileDisplayArea.innerHTML = "File not supported!";
			}
		});
  }
  if (event.target.id == "infoId"){ // info button clicked
      alert("The Height of the picture is 300px. The Width varies on what device you are on.");
  }
    }
  }
};
</script>

<style>
#makeSmallerDescriptionId{
  font-size: 15px;
  vertical-align: bottom;
  display: table-cell;
}
#followersFollowingId{
  color: white;
  padding: 40px;
  background-color: gray;
  display: inline;
  margin-left: 100px;
}
#wrapper{
  width: 100%;
  height: auto;
  display: flex;
}
#personalDataOnRight{
  border: 2px solid #1565c0;
  border-radius: 5px;
  padding: 25px;
  font-size: 22px;
  float: right;
  font-size: 30px;
  margin: 10px;
  width: 70%;
  display: block;
  margin-left: 200px;
}
#username{
  font-size: 30px;
  margin-left: 80px;
}
.headline{
  margin-top: -80px;
  margin-left: 0px;
}
#descriptionId{
  border: 2px solid #1565c0;
  border-radius: 5px;
  padding: 25px;
  font-size: 22px;
  margin-left: 30px;
  float: left;
  margin: 10px;
  width: 40%;
  display: block;
  color:black;
}
.portrait {
  background-position: center;
}
.avatarInPic {
  margin-top: -20px;
}
#centering {
  /*margin: 0 auto;*/
  margin-left: 30px;
}

</style>
