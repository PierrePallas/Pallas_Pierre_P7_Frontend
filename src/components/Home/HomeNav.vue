<template>

 <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
  <div class="container-fluid">
    <router-link to="/Home" class="navbar-brand">Accueil</router-link>
    <div>
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/Profil" class="nav-link active">Profil</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" v-on:click="deconnexion()" class="nav-link active">Deconnexion</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<script>
export default{
    name: "HomeNav",

    methods: {
        deconnexion(){                                      // fonction qui supprime la session utilisateur (item du localStorage)
            localStorage.removeItem('groupomaniaUser')
        }
    }
}
</script>