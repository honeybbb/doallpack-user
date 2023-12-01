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
          <v-list-item to="/work/account">
            <v-list-item-title>나의 정산서</v-list-item-title>
          </v-list-item>
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
      <div class="w-460 d-flex align-items-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-img
          src="http://doall.comondev.com/data/skin/front/doall/img/common/logo.png?ver=0.1"
          max-height="45"
          max-width="135"

          class="mx-auto"
        ></v-img>
<!--        style="left: -20px;"-->

        <v-menu
          offset-y
          bottom
          right
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              x-large
            >
              <v-icon color="rgb(200, 71, 38)" >mdi-account-circle</v-icon>
              <!--v-avatar
                color="brown"
                size="32"
              >
                <span class="text--white text-h5">{{ memNm }}</span>
              </v-avatar-->
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                {{ memNm }} ({{memId}}) 님 로그인 중입니다.
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
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
      memNm: '',
      memId: '',
    }
  },
  methods: {
    logOutUser() {
      localStorage.removeItem('memNo')
      this.$router.push('/login')
    },
    getMyInfo() {
      const memNm = localStorage.getItem('memNm')
      const memId = localStorage.getItem('memId')
      this.memNm = memNm
      this.memId = memId
    }
  },
  mounted() {
    this.getMyInfo()
  }
}
</script>

<style scoped>
::v-deep .v-toolbar__content {
  justify-content: center;
}
</style>
