<template>
<div>
    <HomeNav/>
<div class="card gedf-card">
                    <div class="card-header" >
                        <div class="d-flex justify-content-between align-items-center" >
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="ml-2">
                                    <div class="h5 m-0"></div>
                                    <div class="h7">Publié par : {{userProfil.user_lastname}} {{userProfil.user_firstname}}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {{post.message}}  
                        </p>
                        <img class="mb-4" :src="image.image_url" alt="" width="500" height="300">
                    </div>
                    
                    <div class="card-footer">
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div class="form-group">
                                    <label class="sr-only" for="message">Postez !</label>
                                    <textarea class="form-control" id="message" ref="message" rows="3" placeholder="Que voulez-vous commenter ?" required></textarea>
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
                                <button type="submit" v-on:click="newComment()" class="btn btn-danger">Commenter</button>
                            </div>
                        </div>
                    </div>
                    <div v-for="comment in comments" :key="comment.id">
                    <div class="card-header" >
                        <div class="d-flex justify-content-between align-items-center" >
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="ml-2">
                                    <div class="h5 m-0"></div>
                                    <div class="h7">Commenté par : {{comment.author_lastname}} {{comment.author_firstname}}</div>
                                </div>
                            </div>
                            <div>
                                <div class="dropdown">
                                    <button class="btn btn-link dropdown-toggle text-danger" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                        <div class="dropdown-item" v-on:click="deleteComment(comment.id)">Supprimer
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {{comment.message}}
                        </p>
                    </div>
                    </div>
</div>
</div>
                           
</template>

<script>
import {connectedClient} from "@/services/auth.js"
import HomeNav from "@/components/Home/HomeNav.vue"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config(); 
export default ({
    name: "EditProfil",
    components: {HomeNav},

    data(){
        return {
            approuvedConnexion: false, 
            sessionUserId: 0,
            sessionUserAcces:0,
            post: [],
            userProfil: [],
            comments: [],
            image: [],                                                                  
    }
    },
    created(){
    this.connectedUser()
    },
    mounted(){
    if(this.approuvedConnexion === true) {
      const token = JSON.parse(localStorage.groupomaniaUser).token                            
      let decodedToken = jwt.verify(token, process.env.VUE_APP_RANDOM_TOKEN_SECRET);        
      this.sessionUserId = decodedToken.userId                                                
      this.sessionUserAcces = decodedToken.niveau_acces                                      
      this.getOnePost();
      this.getAllComments();
      this.getImage();
      const userId = this.sessionUserId;
    connectedClient.get(`/api/user/${userId}`)
    .then(res => {
    this.userProfil = res.data[0];
    console.log("User Profil", res.data)
    })
    }
        
  },

    methods: {
    
        connectedUser(){
      if(localStorage.groupomaniaUser == undefined){
        this.approuvedConnexion = false;
        console.log('Utilisateur non connecté !');
        this.$router.push({ name:'/' })
      } else {
        this.approuvedConnexion = true;
        console.log('Utilisateur connecté !');
        }
        },
        
        getOnePost() {
          const postId = this.$route.params.id;  
          connectedClient.get(`/api/post/${postId}`)
          .then(res => {
          this.post = res.data[0];
          console.log("Post", res.data)
        })
        },

        getImage(){
          const postId = this.$route.params.id;   
          connectedClient.get(`/api/post/image/${postId}`)
          .then(res => {
            this.image = res.data[0];
            console.log("Images", res.data)
          })
        },

        getAllComments(){
            const postId = this.$route.params.id;
            console.log(postId) 
            connectedClient.get(`/api/comment/${postId}/comments`)          
            .then(res => {
                this.comments = res.data; 
                console.log("Commentaires",res.data)                                                                      
            })
        },

        newComment(){                           // création d'un nouveau commentaire 
        const author_id = this.sessionUserId;
        const message = this.$refs.message.value;
        const author_firstname = this.userProfil.user_firstname;
        const author_lastname = this.userProfil.user_lastname;
        const post_id = this.$route.params.id;
        
            connectedClient.post(`/api/comment/${post_id}/`, {
                author_id,
                message,
                author_firstname,
                author_lastname,
                post_id
            })
            .then(() => {
              location.reload()}
          )    
        },

        dateFormat(date){                                                       
            const event = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return event.toLocaleDateString('fr-FR', options);
        }, 

    

    deleteComment(commentId) {
          if (this.userProfil.user_id === commentId || this.userProfil.user_id === 1) {
          connectedClient.delete(`/api/comment/${commentId}`)
          .then((res) => {
            if(res.status === 200) {
              location.reload();
            }
          })}
        },
    }
})
</script>

<style>
.card{
    margin-left: 10px;
    padding: 5px;
}
</style>