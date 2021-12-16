<template>
<!--- \\\\\\\Post-->
<div>
  <div v-if="!approuvedConnexion" to="/"></div>
   <div class="card gedf-card">
     <div v-if="approuvedConnexion" class="background d-flex flex-column">
      <div v-if="post == 0" class="mx-auto mt-6 mb-15" elevation="24" width="700">
        <div class="mt-15 mb-15 mx-auto text-h4 text-center">Aucune publication</div>
      </div>
     </div>
                
                  <div v-for="post in posts" :key="post.id">
                    <div class="card-header" >
                        <div class="d-flex justify-content-between align-items-center" >
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="ml-2">
                                    <div class="h5 m-0"></div>
                                    <div class="h7">Publié par : {{post.user_lastname}} {{post.user_firstname}}</div>
                                </div>
                            </div>
                            <div>
                                <div class="dropdown">
                                    <button class="btn btn-link dropdown-toggle text-danger" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                        <div class="h6 dropdown-header">Configuration</div>
                                        <router-link :to="'/EditPost/' + post.id" class="dropdown-item">Modifier
                                        </router-link>
                                        <div v-on:click="deleteOnePost(post.id)" class="dropdown-item">Supprimer
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card-body">
                        <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>{{dateFormat(post.date_post)}}</div>
                        <p class="card-text">
                            {{post.message}}
                        </p>
                        <img  alt="">
                    </div>
                    <div class="card-footer">
                        <router-link :to="'/Comments/' + post.id" class="card-link text-danger"><i class="fa fa-comment"></i> Voir la discussion</router-link>
                    </div>
                  </div>   
                
                
</div>
</div>
</template>

<script>
import {connectedClient} from "@/services/auth.js" 
import jwt from "jsonwebtoken"

export default {
    name: "Post",
         
    data(){
        return {
            posts: [],
            comments: [],
            images: []                                                                   
    }
    },
    created(){                          
    this.connectedUser()
    },
    mounted() {                                     
      this.getAllPosts();
      if(this.approuvedConnexion === true) {
      const token = JSON.parse(localStorage.groupomaniaUser).token                            
      let decodedToken = jwt.verify(token, process.env.VUE_APP_RANDOM_TOKEN_SECRET);        
      this.sessionUserId = decodedToken.userId 
      const userId = this.sessionUserId;
      connectedClient.get(`/api/user/${userId}`)
      .then(res => {
      this.userProfil = res.data[0];
      console.log( "User Profil", res.data)
    })                                              
    }                     
    },

    methods: {
        getAllPosts(){
            connectedClient.get("/api/post/")          
            .then(res => {
                this.posts = res.data; 
                console.log("Posts", res.data)                                                                      
            })
        },

        connectedUser(){                                     
      if(localStorage.groupomaniaUser == undefined){
        this.approuvedConnexion = false;
        console.log('Utilisateur non connecté !');
        this.$router.push({ name:'Home' })
      } else {
        this.approuvedConnexion = true;
        console.log('Utilisateur connecté !');
        }
      },
        
        dateFormat(date){                                                       
            const event = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return event.toLocaleDateString('fr-FR', options);
        },

        deleteOnePost(postId) {
          if ( this.userProfil.user_id === 1) {
          connectedClient.delete(`/api/post/${postId}`)
          .then((res) => {
            if(res.status === 200) {
              location.reload();
            }
          })}
        },
    } 
}
</script>
