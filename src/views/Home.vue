<template>
<div>
    <AuthNav v-if="!approuvedConnexion"/>
    <Login v-if="!approuvedConnexion"/>
    <HomeNav v-if="approuvedConnexion"/>
    <NewPost v-if="approuvedConnexion"/>
    <Post v-if="approuvedConnexion"/>
</div>
</template>

<script>
import HomeNav from "@/components/Home/HomeNav.vue"
import AuthNav from "@/components/Auth/AuthNav.vue"
import Login from "@/components/Home/Login.vue"
import NewPost from "@/components/Home/NewPost.vue"
import Post from "@/components/Home/Post.vue"


export default {
    name: "Home",
    components: {
        HomeNav,
        AuthNav,
        Login,
        Post,
        NewPost
        },

    data() {
    return{
      approuvedConnexion: false     // on déclare une varibale de type boléen, false par défault (contiendra la validation comme quoi un utilisateur est authentifié)
    };
  },
  created(){                        // hook de cycle de vie qui intervient avant le hook mounted et vérifie la session utilisateur (Item dans le localStorage)
    this.connectedUser()
  },
  methods: {
    connectedUser(){                // fonction de vérification de la session utilisateur (Item dans le localStorage)
      if(localStorage.groupomaniaUser == undefined){
        this.approuvedConnexion = false;
        console.log('Utilisateur non connecté !');
      } else {
        this.approuvedConnexion = true;
        console.log('Utilisateur connecté !');
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed&display=swap');
.cover-container {
  max-width: 42em;
}
body {
    font-family: 'Fira Sans Extra Condensed', sans-serif;
}

a {
    text-decoration: none;
}

body {
            background-color: #eeeeee;
        }

        .h7 {
            font-size: 0.8rem;
        }

        .gedf-wrapper {
            margin-top: 0.97rem;
        }

        @media (min-width: 992px) {
            .gedf-main {
                padding-left: 4rem;
                padding-right: 4rem;
            }
            .gedf-card {
                margin-bottom: 2.77rem;
            }
        }

        /**Reset Bootstrap*/
        .dropdown-toggle::after {
            content: none;
            display: none;
        }
</style>