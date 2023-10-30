<template>
  <v-app>
    <headerNav />
    <v-main style="background-color: #f1f3f4;">
      <nuxt />
    </v-main>
    <bottomNav />
  </v-app>
</template>

<script >
import headerNav from "@/components/headerNav.vue";
import bottomNav from "@/components/bottomNav.vue";
export default {
  components: {
    headerNav,
    bottomNav
  }
}

</script>

<style scoped>

</style>
