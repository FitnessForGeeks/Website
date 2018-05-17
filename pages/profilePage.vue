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
      <!--<v-avatar size="100" class="avatarInPic"> 
        <img src="doc-images/avatars/avatar_user_designer.png" alt="Avatar">
      </v-avatar> --> 
    </div>
    <v-card-title>
      <div id="centering">
        <div class="headline">Username 
          <v-avatar size="100"> 
            <img src="doc-images/avatars/avatar_user_grandfather.png" alt="Avatar">
          </v-avatar>
        </div> 
        <span class="grey--text"></span>
      </div> 
    </v-card-title>
    <input type="file" id="fileInput" ref="fileChooser" accept="image/*" style="display:none" multiple>
    <br>
    <div id="accountSettings">
      <p class="text-xs-center">Account Settings</p> 
      <!--<v-list class="text-xs-center" id="accountSettingsListItem">Height: 188 cm<br> Weight: 78 kg<br> Age: 17<!-- div or align to left --> 
      <div id="temp">
      <p>Height: 187 cm</p>
      <p>Weight: 76 kg</p>
      <p>Age: 17</p>
      </div>
      </v-list>
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
      { title: "Info" } // no functionality yet
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
#temp{
  text-align: center;
  display: block;
  color:black;
}
.portrait {
  background-position: center;
}
.avatarInPic {
  margin-top: -20px;
}
#accountSettingsListItem {
  text-align: center;
  font-size: 30px;
}
#centering {
  margin: 0 auto;
}
#accountSettings {
  font-size: 34px;
  color: #1565c0;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
</style>
