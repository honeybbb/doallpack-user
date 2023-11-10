<template>
  <v-app>
    <headerNav v-if="$route.path!=='/login'?'d-none':''"/>
    <v-main style="background-color: #f1f3f4;">
<!--      {{$route.path}}-->
      <nuxt />
    </v-main>
    <bottomNav v-if="$route.path!=='/login'?'d-none':''"/>
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
