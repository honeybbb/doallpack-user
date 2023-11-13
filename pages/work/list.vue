<template>
  <v-container style="max-width: 460px;" fill-height>
    <v-layout row wrap>
      <v-flex class="pt-0">
        <div class="col-md-12 normal_board">
          <h2>작업내역</h2>
          <date-picker
            class="mb-5"
            v-model="time3"
            valueType="format"
            type="month"
            :lang="lang"
          />
          <v-btn
            color="black"
            depressed
            @click="getMyWorkList"
          >
            <span class="text-white">검색</span>
          </v-btn>

          <h3>이번달 수익 : {{ totalPrice }}원 ({{ totalQuantity }}건)</h3>
          <v-card
            outlined
            style="border-radius: 10px"
            class="mb-2"
            v-for="item in workList"
          >
            <v-card-text :data-eventNo="item.eventNo">
              <h2>{{ item.companyNm }}</h2>
              <div class="attendanceWrap">
                <div class="attendanceDate">
                  <p class="mb-0">예상 수입금액 {{ expectedPrice }}원</p>
                  <p>{{ item.regDt }}
                    <span v-if="item.authFl == 'n'">검수대기</span>
                    <span v-if="item.authFl == 'y'">검수완료</span>
                  </p>
                  <v-btn
                    small
                    depressed
                    color="#177ee3"
                    @click="dialog=true"
                  >수정하기</v-btn>
                </div>

              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-list class="work-list">
              <v-list-group :value="false" append-icon="mdi-chevron-down">
                <template v-slot:activator>
                  <v-list-item-title>상세내역보기</v-list-item-title>
                </template>


                <template
                  v-for="n in JSON.parse(item.unitList)">
                  <v-list-item v-if="n.useFl == 'y'">
                    <div>{{ n.unitNm }}</div>
                    <div>{{ n.unitCnt }}</div></v-list-item>
                </template>


              </v-list-group>
            </v-list>
        </v-card>
        </div>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog">

    </v-dialog>
  </v-container>
</template>

<script >
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';
import commonJS from '/assets/js/common';
import axios from "axios";

export default {
  components: {
    DatePicker
  },
  data() {
    return {
      time3: '',
      dialog: false,
      selectedDate: new Date().toISOString().substr(0, 10),
      lang: {
        months: [
          '1월','2월','3월','4월','5월','6월',
          '7월','8월','9월','10월','11월','12월',
        ]
      },
      workList: []
    }
  },
  computed: {
    totalPrice() {
      return 1540
    },
    totalQuantity() {
      return 10
    },
    expectedPrice () {
      return 0
    }
  },
  methods: {
    modifyWork(val) {
      const params = new URLSearchParams()
      params.append('eventNo', val)
      axios.post('http://localhost:3001/v1/work/modify', params)
        .then(res => {
          console.log(res.data.data)
        })
    },
    updateDate(value) {
      this.selectedDate = value;
    },
    updateMonth(month) {
      this.$refs.picker.tableDate = month;
    },
    getMyWorkList(){
      //const memNo = this.$store.state.memNo
      const memNo = localStorage.getItem('memNo')

      const params = new URLSearchParams()
      params.append('memNo', memNo)
      params.append('eventDt', this.time3)
      axios.post('http://localhost:3001/v1/work/list', params)
        .then(res => {
          console.log(res.data.data)
          let result = res.data.data

          this.workList = result


        })
    },
  },
  mounted() {
    this.time3 = commonJS.getMonthday()
    this.getMyWorkList()
  }
}
</script>

<style scoped>
.work-list .v-list-item {
  font-size: 14px;
}

.normal_board h2 {font-size:16px; margin-bottom:10px;}
.normal_board h3 {font-size:14px; margin-bottom:10px;}

</style>
