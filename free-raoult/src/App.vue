<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <Message severity="info">🔥 Une petition pour liberer Sebastien est en cours, allez <a href="https://www.change.org/p/justice-pour-sebastien">signer ici</a></Message>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
