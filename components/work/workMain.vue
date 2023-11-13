<template>
  <v-col cols="12">
    <v-card
      v-if="workArea.length>0"
      v-for="item in workArea"
      outlined
      style="border-radius: 10px"
      class="mb-2"
    >
      <v-card-text class="cardList">
      <h2>{{ item.groupNm }}</h2>
      <div class="attendanceWrap">

        <div class="attendanceDate">
          <p class="mb-0">{{ new Date().toISOString().substr(0, 10) }}</p>
          <p>작업 장소를 선택해주세요.</p>

        </div>

        <v-btn
          class="startWork"
          color="#c84726"
          height="42"
          block
          depressed
          @click="startWork(item)"
          :data-companySno="item.sno"
        >
          <span>작업시작</span>
        </v-btn>

        <v-btn
          class="endWork d-none"
          color="#39a759"
          height="42"
          block
          depressed
          @click="endWork"
        >
          <span>작업종료</span>
        </v-btn>

        <div class="attendanceInfo d-none">
          <ul style="list-style: none; display: flex; justify-content: space-between;">
            <li>출근</li>
            <li>03:59 PM</li>
          </ul>
        </div>

        <div
          class="
          d-none
          attendanceWrite
          cursor-pointer"
          @click="dialog=true"
        >
          <v-icon
            small
            color="#177ee3"
          >mdi-pencil-circle-outline</v-icon>
          작업일지작성
        </div>
      </div>

      </v-card-text>
    </v-card>
    <v-card
      v-else
      outlined
      style="border-radius: 10px"
      class="mb-2"
    >
      <v-card-text>
        <div class="attendanceWrap">
          <h2>근무지역이 확인되지 않습니다.</h2>
          <div class="attendanceDate">
            <p class="mb-0">{{ new Date().toISOString().substr(0, 10) }}</p>
            <p class="description">근무지 wifi접속 후 새로고침 해주세요!</p>
          </div>
          <v-btn
            depressed
            @click="location.reload();"
          >
            새로고침
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog width="460" v-model="dialog" fullscreen>
      <v-card color="#f6f6f6">
        <div class="col-md-12">
        <div class="popup_head">
          <v-card-title>작업일지작성</v-card-title>
          <v-icon @click="dialog=false">mdi-close</v-icon>
        </div>
        <div class="popup_container">
          <v-col cols="12" class="workStep">
            <v-list>
              <v-list-group
                :value="true"
                class="workStep"

              >
                <v-list-item></v-list-item>
              </v-list-group>
            </v-list>
            <v-btn
              depressed
              block
              height="42"
              id="workSubmit"
            >등록하기</v-btn>
          </v-col>

        </div>
      </div>
      </v-card>
    </v-dialog>
  </v-col>
</template>
<script>
import axios from "axios";

export default {
  props: {
    workArea: Array,
  },
  data() {
    return {
      dialog: false,
      doing: false,
      contracts: [],
    }
  },
  methods: {
    startWork () {
      const memNo = this.$store.state.memNo
      console.log(memNo,'memNo')
      // const params = new URLSearchParams();
      // params.append('memNo', memNo)
      // axios.post('http://localhost:3001/v1/member/work/start', params)
      //   .then(res => {
      //     console.log(res)
      //     return
      //   })


      alert('[출근]처리가 완료되었습니다.')
      const diary = document.getElementsByClassName('attendanceWrite')[0]
      diary.className = 'attendanceWrite cursor-pointer'
      console.log(diary, 'd')
    },
    endWork () {
      alert('[퇴근]처리가 완료되었습니다.')
    },
    getDoingWork() {
      const memNo = this.$store.state.memNo
      axios.get('http://localhost:3001/v1/work/today/'+memNo)
        .then(res => {
          if(res.data.data.length > 0) {
            this.doing = true
          }
        })
    },
    getScmGroupInfo() {
      // const sno = this.workArea.sno
      // axios.get('http://localhost:3001/v1/scm/manage/group/info/'+sno)
      //   .then(res => {
      //     console.log(res.data.data)
      //
      //   })
    },
    async getScmContract() {
      await axios.get('http://localhost:3001/v1/scm/contract')
        .then(res => {
          //console.log(res.data.data)
          const result = res.data.data

          result.map((item) => {
            item.unitList = JSON.parse(item.unitList)
            console.log(item.unitList)
          })

          this.contracts = result

        })
    }
  },
  mounted() {
    this.getScmContract()
    this.getScmGroupInfo()
  }

}
</script>
<style>
.attendanceWrap {
  display: block;
  position: relative;
  margin: 10px 0;
  //padding-left: 10px;

  .v-btn span{
    font-weight: 900;
    color: #FFFFFF;
  }
}

.attendanceDate {
  position: relative;
  margin: 10px 0;
  padding-left: 10px;
  border-left: 2px solid green;

  p {
    font-size: 0.85em;
    font-weight: 600;
  }
}

.attendanceInfo {
  margin-top: 15px;
  padding: 15px 0 10px;
  border-top: 1px solid #d6dae1;
}

.attendanceWrite {
  color: #177ee3;
  margin-bottom: 0;
}

.popup_head {
  display: flex;
  justify-content: space-between;
}

.startWork {
  border-radius: 10px;
}

.endWork {
  border-radius: 10px;
}

#workSubmit {
  margin: 0;
  margin-top: 30px;
  background: #c84726;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 42px;
  font-weight: 900;
  border: none;
}
</style>
