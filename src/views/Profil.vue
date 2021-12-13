<template>
<div>
<HomeNav v-if="approuvedConnexion"/>

<div v-if="approuvedConnexion" class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">{{userProfil.user_firstname}}</div>
        </div>
        <form class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Mon profil</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Nom</label><input type="text" class="form-control" placeholder="Nom" id="user_lastname" ref="user_lastname" :value="userProfil.user_lastname"></div>
                    <div class="col-md-6"><label class="labels">Prénom</label><input type="text" class="form-control" placeholder="Prénom" id="user_firstname" ref="user_firstname" :value="userProfil.user_firstname"></div>
                </div>
                <div class="row mt-3">
                    
                    <div class="col-md-12"><label class="labels">Adresse mail</label><input type="text" class="form-control" placeholder="Adresse mail" id="user_email" ref="user_email" :value="userProfil.user_email"></div>
        
                </div>
                <div class="mt-5 text-center"><button v-on:click="saveUser()" class="btn btn-danger profile-button" type="submit">Sauvegarder les modifications</button></div>
            </div>
        </form>
    </div>
</div>
</div>
</template>

<script>
import {connectedClient} from "@/services/auth.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
import HomeNav from "../components/Home/HomeNav.vue"

export default {
    name: "Profil",
    components: {
        HomeNav
    },

    data() {
    return{
      approuvedConnexion: false, 
      sessionUserId: 0,
      sessionUserAcces:0,
      userProfil: [],
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
      this.sessionUserAcces = decodedToken.niveau_acces                                     
      this.getUserProfil();
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
    getUserProfil(){
      const userId = this.sessionUserId;
      connectedClient.get(`api/user/${userId}`)
        .then(res => {
          this.userProfil = res.data[0];
        })
    },
    saveUser(){
    const userId = this.sessionUserId;
      const user_lastname = this.$refs.user_lastname.value;
      const user_firstname = this.$refs.user_firstname.value;
      const user_email = this.$refs.user_email.value;
      connectedClient.put(`api/user/${userId}`, {
        user_lastname,
        user_firstname,
        user_email
      })
      .then((res) => {
        if(res.status === 200) {
            this.errorMessage = ""
            this.succesMessage = res.data.message;
            location.reload()
        }
      })
      .catch((error) => {
            this.errorMessage = error.response.data.error;
      })
    },
  }
}
</script>
