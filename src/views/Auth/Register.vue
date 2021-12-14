<template>
  <div>
       <Nav/>
    <main class="form-signin">
        <img src="../../assets/logos/icon-above-font.png" alt="Groupomania logo" width="300" height="300">
        <form @submit.prevent = signup()>
            <h1 class="h3 mb-3 fw-normal text-center">Inscrivez-vous !</h1>
            <input class="form-control" id="nom" ref="nom" type="text" placeholder="Nom"  title="Renseignez votre nom">
            <input class="form-control" id="prenom" ref="prenom" type="text" placeholder="Prénom" title="Renseignez votre prénom">
            <input class="form-control" id="email" ref="email" type="email" placeholder="E-mail" required title="Renseignez votre email">
            <input class="form-control" id="password" ref="password" type="password" placeholder="Mot de passe" title="Renseignez votre mot de passe" required>
            <div class="h3 mb-3 fw-normal text-center text-danger">{{ message }}</div>
            <div class="mx-auto mt-6 mb-15">
              <button id="signup" type="submit" class="w-100 btn btn-lg btn-danger">Inscription</button>
            </div>
        </form>
    </main>
  </div>
</template>

<script>
import Nav from "@/components/Auth/AuthNav.vue";
import {notConnectedClient} from "@/services/auth.js"
export default {
  name: 'Register',
  components: {Nav},
  data() {
      return {
          message: "",
      };
  },
  created(){
  this.connectedUser()
  },
  methods: {
    connectedUser(){                                    // fonction de vérification de la session utilisateur (Item dans le localStorage)
      if(localStorage.groupomaniaUser == undefined){
        this.approuvedConnexion = false;
        console.log('Utilisateur non connecté !');
      } else {
        this.approuvedConnexion = true;
        console.log('Utilisateur connecté !');
        location.href = '/';
      }
    },
    signup() {                                        // fonction qui gère la création d'un nouvel utilisateur (requête)
      const user_lastname = this.$refs.nom.value;
      const user_firstname = this.$refs.prenom.value;
      const user_email = this.$refs.email.value;
      const user_password = this.$refs.password.value;

        notConnectedClient.post("/api/auth/signup", {
          user_lastname,
          user_firstname,
          user_email,
          user_password
        })
        .then((res) => {
          if(res.status === 201) {                    // si l'inscription s'est bien déroulée, on créer l'item dans le localStorage pour créer la session utilisateur
              const groupomaniaUser = {               
                token: res.data.token
              }
              localStorage.setItem('groupomaniaUser', JSON.stringify(groupomaniaUser));
              this.$router.push({ name:'/Home' })
          }
        })
        .catch((error) => {
              this.message = error.response.data.error;
        })
      }
  }
}
</script>

