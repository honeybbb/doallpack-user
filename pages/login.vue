<template>
  <v-app>
    <v-main style="background-color: #f1f3f4;">
      <!-- Login Component -->
      <v-container style="max-width: 460px" fill-height>
        <v-layout row wrap>
          <v-flex xs12 style="padding: 30px;">
              <div class="member">
                  <v-img
                    class="mb-5"
                    src="http://doall.comondev.com/data/skin/front/doall/img/common/logo.png"
                    width="200"
                  ></v-img>
                <div class="login-box">
                  <input
                    type="text"
                    placeholder="아이디"
                    id="loginId"
                    name="loginId"
                    v-model="memId"
                    @keypress.enter="login"
                  >
                  <input
                    type="password"
                    placeholder="비밀번호"
                    id="loginPwd"
                    name="loginPwd"
                    v-model="memPw"
                    @keypress.enter="login"
                  />
                </div>

                <div class="float-left" style="display: flex;">
                    <input
                      type="checkbox"
                      name="saveAutoLogin"
                      value="y"
                      id="saveAutoLogin"
                      class="ml-1"
                    />
                    <v-card-subtitle class="px-4">로그인 상태 유지</v-card-subtitle>
                </div>


                  <v-btn
                    class="login-btn"
                    type="submit"
                    depressed
                    large
                    block
                    color="#c84726"
                    @click="login"
                  >
                    <span>로그인</span>
                  </v-btn>
                <v-divider class="my-5"></v-divider>
                  <v-btn
                    class="login-btn-kko"
                    type="submit"
                    depressed
                    large
                    block
                  >
                    <span>카카오톡 로그인</span>
                  </v-btn>
              </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      memId: '',
      memPw: '',
      authValue: false,
    };
  },
  components: {

  },
  computed: {

  },
  methods: {
    async login() {
      let saveData = {};
      // const authValue = this.authValue  // 로그인 인증
      saveData.memId = this.memId
      saveData.memPw = this.memPw

      if(saveData.memId === undefined) {
        alert('아이디를 입력해주세요.')
        return
      }

      if(saveData.memPw === undefined) {
        alert('패스워드를 입력해주세요.')
        return
      }

      await this.$store.dispatch('loginUser', saveData)
        .then(res => {
          if(this.$store.state.memNo) {
            // 로그인 성공시 수행할 로직 작성
            this.$router.push('/')
          } else {
            console.log(err, 'err')
            alert('아이디 또는 패스워드를 확인해주세요.')
            return
          }

        }).catch(err => {
          console.log(err, 'err')
          alert('아이디 또는 패스워드를 확인해주세요.')
          return
        })
    }
  },
};
</script>

<style lang="scss">
#loginId {
  width: 100%;
  height: 48px;
  text-indent: 0;
  border: 1px solid #d6dae1;
  line-height: 20px;
  box-sizing: border-box;
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  border-radius: 10px;
  color: #1b1e26;
  font-size: 14px;
  padding: 14px 12px;
}

#loginPwd {
  width: 100%;
  height: 48px;
  text-indent: 0;
  border: 1px solid #d6dae1;
  line-height: 20px;
  box-sizing: border-box;
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  border-radius: 10px;
  color: #1b1e26;
  font-size: 14px;
  padding: 14px 12px;
}

.login-btn {
  text-align: center;
  border-radius: 10px;
  height: 56px !important;
  font-size: 16px;
  font-weight: 900;
  color: #FFFFFF !important;

  .span {
    font-size: 16px;
    font-weight: 900;
    color: #FFFFFF;
  }
}

.login-btn-kko {
  border: 1px solid #d6dae1;
  height: 56px !important;
  border-radius: 10px;
}

.login-box input{
  margin-bottom: 5px;
}

.member {
  text-align: -webkit-center;
}

input[type=checkbox] {
  -ms-transform: scale(1.5); /* IE */
  -moz-transform: scale(1.5); /* FF */
  -webkit-transform: scale(1.5); /* Safari and Chrome */
  -o-transform: scale(1.5); /* Opera */
  padding: 10px;
}
</style>
