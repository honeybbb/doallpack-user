<template>
<!--  <v-col style="background-color: #f1f3f4;">-->
    <v-container style="max-width: 460px;" fill-height>
      <v-layout row wrap>
        <v-flex>
          <div class="mx-auto text-center">
            <h5>{{ memNm }} ({{memId}}) 님 로그인 중입니다.</h5>
          </div>
          <work-main :work-area="workArea"/>

        </v-flex>
      </v-layout>
    </v-container>
<!--  </v-col>-->
</template>

<script>
import workMain from "@/components/work/workMain.vue";
import axios from "axios";
export default {
  components: {
    workMain
  },
  data() {
    return {
      workArea: [],
      authValue: false,
      ipAddress: '',
      memNm: '',
      memId: '',
    }
  },
  methods: {
    isAuthenticated() {
      const authkey = localStorage.getItem('memNo')

      if(!authkey) {
        this.$router.push('/login')
      }
    },
    getMyInfo() {
      const memNm = localStorage.getItem('memNm')
      const memId = localStorage.getItem('memId')
      this.memNm = memNm
      this.memId = memId
    },
    getIpClient() {
      axios
        .get('https://api64.ipify.org?format=json')
        .then(response => {
          this.ipAddress = response.data.ip;

          if(localStorage.getItem('memNo') == 17814) {
            this.ipAddress = '106.245.131.199'
          } else if(localStorage.getItem('memNo') == 17813){
            this.ipAddress = '58.127.226.131'
          } else if(localStorage.getItem('memNo') == 17818) {
            //this.ipAddress = '....'
          }

          this.getMyWorkGroup(this.ipAddress)
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getMyWorkGroup(val) {
      const params = {
        val: val
      }
      await axios.get('http://api.doallpack.shop/v1/member/work/group', { params })
        .then(res => {
          console.log(res.data.data)
          this.workArea = res.data.data
        })
    }
  },
  mounted() {
    this.isAuthenticated()
    this.getIpClient()
    this.getMyInfo()
  }
}
</script>
