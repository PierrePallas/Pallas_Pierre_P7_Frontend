<template>
<div>
    <Nav/>
        
<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <main class="px-3">
        <h1 class="text-center">Bienvenue sur votre réseau social Groupomania !</h1>
        <p class="text-center"><img src="../assets/logos/icon-above-font.png" alt="" width="300" height="300"></p>
        <div class="d-grid gap-2 col-6 mx-auto">
            <router-link to="/Home" class="btn btn-lg btn-danger fw-bold">Connexion</router-link>
            <router-link to="/register" class="btn btn-lg btn-danger fw-bold">Inscription</router-link>
        </div>
    </main>
    
</div>
</div>


</template>

<script>
import Nav from "@/components/Auth/AuthNav.vue";

export default {
    name: "Auth",
    components: {Nav}
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

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>