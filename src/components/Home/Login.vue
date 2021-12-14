<template>
<div>
<main class="form-signin">  
    <form @submit.prevent = login()>
        <img class="mb-4" src="../../assets/logos/icon-above-font.png" alt="" width="300" height="300">
        <h1 class="h3 mb-3 fw-normal text-center">Connectez-vous !</h1>
        <input type="email" class="form-control" id="email" ref="email" placeholder="Email" required>
        <input type="password" class="form-control" id="password" ref="password"  placeholder="Mot de passe" required>
        <h1 class="h3 mb-3 fw-normal text-center">{{ message }}</h1>
        <button class="w-100 btn btn-lg btn-danger" type="submit">Connexion</button>
    </form>
</main>
</div>
</template>

<script>
import {notConnectedClient} from "@/services/auth.js"
export default {
    name: "Login",
    data() {
        return {
            message:"",
        }
    },

    methods: {
        login() {                                               // fonction de connexion
            const user_email = this.$refs.email.value;
            const user_password = this.$refs.password.value;
            notConnectedClient.post("api/auth/login", {           // envoi de la requête non authentifié avec notConnectedClient
                user_email,
                user_password
            })
            .then((res) => {
            if(res.status === 200) {                            // si la requête est validée
                const groupomaniaUser = {
                    token: res.data.token
                }
                localStorage.setItem('groupomaniaUser', JSON.stringify(groupomaniaUser));   //on stockant dans le localStorage un item avec le token
                location.reload();                                                          // rechargement de la page pour re-analyser le localStorage
            }
            })
            .catch((error) => {
                this.message = error.response.data.error;       // si la requête a échouée, on affiche le message d'erreur envoyé par le back
            })
        }
    }
}
</script>