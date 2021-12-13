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
      approuvedConnexion: false,      // on déclare une varibale de type boléen, false par défault (contiendra la validation comme quoi un utilisateur est authentifié)
      sessionUserId: 0,               // on déclare une varibale de type nombre, 0 par défault (contiendra le userId du token de la session utilisateur)
      sessionUserAcces: 0,            // on déclare une varibale de type nombre, 0 par défault (contiendra le niveau d'acces du token de la session utilisateur)
      message: ""                     // on déclare une varibale de type string, vide par défault (contiendra les messages d'erreur envoyé par le back)
    };
  },
  created(){                          // hook de cycle de vie qui intervient avant le hook mounted et vérifie la session utilisateur (Item dans le localStorage)
    this.connectedUser()
  },
  mounted(){
    if(this.approuvedConnexion === true) {
      const token = JSON.parse(localStorage.groupomaniaUser).token                            // on récupère le token dans le localstorage
      let decodedToken = jwt.verify(token, process.env.VUE_APP_RANDOM_TOKEN_SECRET);        // on décode le token avec la fonction verify qui prend le token et la clé secrète
      this.sessionUserId = decodedToken.userId                                                // on récupère le UserId                                       // on récupère le niveau d'acces
    }
  },
  
  methods: {
    connectedUser(){                                        // fonction de vérification de la session utilisateur (Item dans le localStorage)
      if(localStorage.groupomaniaUser == undefined){
        this.approuvedConnexion = false;
        console.log('Utilisateur non connecté !');
        this.$router.push({ name:'Home' })
      } else {
        this.approuvedConnexion = true;
        console.log('Utilisateur connecté !');
      }
    },
    newPost(){                                     // fonction qui gère la création d'une nouvelle publication (requête)
      const user_id = this.sessionUserId;
      const message = this.$refs.message.value;
      const post_image = this.$refs.post_image.files[0];

      const fileName = this.$refs.uploadImage.value;
      const lastDot = fileName.lastIndexOf(".") + 1;
      const extensionFile = fileName.substr(lastDot, fileName.length).toLowerCase();
    
      if (extensionFile=="jpg" || extensionFile=="jpeg" || extensionFile=="png" || post_image === undefined){
          let formData = new FormData();
          formData.append("user_id", user_id);
          formData.append("message", message);
          formData.append("image", post_image);
          connectedClient.post('/api/post/', formData)
          .then((res) => {
            if (res.status === 201){
              setTimeout(function(){location.reload()}, 2000)
            }
            }
          ) 
      }    
    }
  }
}
</script>