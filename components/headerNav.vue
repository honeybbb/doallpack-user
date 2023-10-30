<template>
  <div >
    <v-navigation-drawer
      v-model="drawer"
      fixed app temporary
      right
      class="px-4"
    >
      <div
        class="d-flex"
        style="padding: 15px 0 20px;">
        <v-img
          max-width="90"
          height="30"
          src="http://doall.comondev.com/data/skin/front/doall/img/common/logo.png"></v-img>
        <v-spacer></v-spacer>
        <v-icon
          class="ma-4"
          @click="drawer=false"
        >mdi-close</v-icon>
      </div>

      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="text--accent-4"
        >
          <hr>
          <v-list-item to="/service/faq">
            <v-list-item-title>자주묻는질문</v-list-item-title>
          </v-list-item>

          <v-list-item to="/service/notice">
            <v-list-item-title>공지사항</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logOutUser">
            <v-list-item-title>로그아웃</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      fixed
      app
      hide-on-scroll
      height="64"
      color="#FFFFFF"
      elevate-on-scroll
      style="border-bottom: 1px solid #c3c7cf;"
    >
      <div class="w-460 d-flex">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-img
          src="http://doall.comondev.com/data/skin/front/doall/img/common/logo.png?ver=0.1"
          max-height="45"
          max-width="135"
          class="mx-auto"
        ></v-img>
      </div>
    </v-app-bar>
  </div>
</template>

<script >
export default {
  data() {
    return {
      drawer: false,
      group: null,
    }
  },
  methods: {
    logOutUser() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
