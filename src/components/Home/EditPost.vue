<template>
<div>
    <HomeNav/>
<div class="card gedf-card">Modifier votre publication !
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active text-danger" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Publication</a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div class="form-group">
                                    <textarea class="form-control" id="message" ref="message" rows="3" :value="post.message" required></textarea>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div class="btn-toolbar justify-content-between">
                            <div class="btn-group">
                                <button v-on:click="updatePost()" type="submit" class="btn btn-danger">Modifier</button>
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
      const userId = this.sessionUserId;
    connectedClient.get(`/api/user/${userId}`)
    .then(res => {
    this.userProfil = res.data[0];
    console.log( "User Profil", res.data)
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
          console.log(res.data)
        })
        },

        

        
        updatePost() {
            const postId = this.$route.params.id;
            if (this.userProfil.user_id === this.post.user_id) {
            
            const message = this.$refs.message.value;
            console.log("message", message) 
            connectedClient.put(`api/post/${postId}`, {
            message
            })
            .then((res) => {
            if(res.status === 200) {
            location.reload()
            }
            })
            .catch((error) => {
            this.errorMessage = error.response.data.error;
            })}
    }
    }
})
</script>

<style>
.card{
    margin-left: 10px;
    padding: 5px;
}
</style>


