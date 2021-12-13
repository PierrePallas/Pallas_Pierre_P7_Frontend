<template>
  <!--- \\\\\\\Post-->
  <div>
                <div class="card gedf-card">
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Publications</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-danger" id="images-tab" data-toggle="tab" role="tab" aria-controls="image" aria-selected="false" href="#image">Insérer une image</a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div class="form-group">
                                    <label class="sr-only" for="message">Postez !</label>
                                    <textarea class="form-control" id="message" ref="message" rows="3" placeholder="Que voulez-vous poster ?" required></textarea>
                                </div>

                            </div>
                            <div class="tab-pane fade" id="image" role="tabpanel" aria-labelledby="images-tab">
                                <div class="form-group">
                                    <div class="custom-file">
                                        <input type="file" accept="image/jpg, image/png, image/jpeg" class="custom-file-input" id="image" ref="image">
                                        <label class="custom-file-label" for="customFile">Uploader une image</label>
                                    </div>
                                </div>
                                <div class="py-4"></div>
                            </div>
                        </div>
                        <div class="btn-toolbar justify-content-between">
                            <div class="btn-group">
                                <button type="submit" v-on:click="newPost" class="btn btn-danger">Publier</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="h3 text-danger">Fil d'actualité
                        </div>
  </div>  
</template>

<script>
import {connectedClient} from "@/services/auth.js"
import jwt from "jsonwebtoken"
export default {
    name: "NewPost",

    data() {
    return{
      approuvedConnexion: false,      
      sessionUserId: 0,               
      sessionUserAcces: 0,            
      message: ""                     
    };
  },
  created(){                          
    this.connectedUser()
  },
  mounted(){
    if(this.approuvedConnexion === true) {
      const token = JSON.parse(localStorage.groupomaniaUser).token                            
      let decodedToken = jwt.verify(token, process.env.VUE_APP_RANDOM_TOKEN_SECRET);        
      this.sessionUserId = decodedToken.userId                                               
    }
  },
  
  methods: {
    connectedUser(){                                        // vérification de la session utilisateur
      if(localStorage.groupomaniaUser == undefined){
        this.approuvedConnexion = false;
        console.log('Utilisateur non connecté !');
        this.$router.push({ name:'Home' })
      } else {
        this.approuvedConnexion = true;
        console.log('Utilisateur connecté !');
      }
    },
    newPost(){                                     // création d'une nouvelle publication 
      const user_id = this.sessionUserId;
      const message = this.$refs.message.value;
      let formData = new FormData();
      
      if (this.$refs.post_image){
        const post_image = this.$refs.post_image.files[0];
        // const fileName = this.$refs.post_image.value;
        // const lastDot = fileName.lastIndexOf(".") + 1;
        // const extensionFile = fileName.substr(lastDot, fileName.length).toLowerCase();
        formData.append("image", post_image);
      }
          
        formData.append("user_id", user_id);
        formData.append("message", message);
        // formData.append("date_post", this.dateFormat(new Date()))
          
          connectedClient.post('/api/post/', formData)
          .then(() => {
              location.reload()}
          )    
    },
    dateFormat(date){                                                       
            const event = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return event.toLocaleDateString('fr-FR', options);
        }
  }
}
</script>