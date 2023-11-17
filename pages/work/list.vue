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
            <span class="text--white">검색</span>
          </v-btn>

          <h3>이번달 수익 : {{ totalPrice }}원 ({{ totalQuantity }}건)</h3>
          <v-card
            outlined
            style="border-radius: 10px"
            class="mb-2"
            v-for="item in workList"
          >
            <v-card-text :data-eventNo="item.eventNo">
              <h2>{{ item.groupNm }}] {{ item.companyNm }}</h2>
              <div class="attendanceWrap">
                <div class="attendanceDate">
                  <p class="mb-0">
                    예상 수입금액 {{ ExpectedPrice(JSON.parse(item.unitList)) }}원
                    {{ item.price }}
                  </p>
                  <p>{{ item.regDt }}
                    <span v-if="item.authFl == 'n'">검수대기</span>
                    <span v-if="item.authFl == 'y'">검수완료</span>
                  </p>
                  <v-btn
                    small
                    depressed
                    color="#177ee3"
                    :disabled="item.authFl == 'y'"
                    @click="getMyWorkDetail(item.eventNo)"
                  >
                    수정하기
                  </v-btn>
                </div>

              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-list class="work-list">
              <v-list-group :value="false" append-icon="mdi-chevron-down">
                <template v-slot:activator>
                  <v-list-item-subtitle>상세내역보기</v-list-item-subtitle>
                </template>

                <template
                  class="detail-toggle"
                  v-for="n in JSON.parse(item.unitList)">
                  <v-list-item v-if="n.useFl == 'y' && n.unitCnt > 0">
                    <p>{{ n.unitNm }}</p>
                    <p>({{ n.unitCnt }}건)</p>
                    <v-spacer />
                    <p>{{ n.price * n.unitCnt }} 원</p>
                  </v-list-item>
                </template>


              </v-list-group>
            </v-list>
        </v-card>
        </div>
      </v-flex>
    </v-layout>

    <v-dialog
      width="460"
      v-model="dialog"
      fullscreen
    >
      <v-card color="#f6f6f6">
        <div class="col-md-12">
          <div class="popup_head">
            <h2>작업일지작성</h2>
            <v-icon @click="dialog=false">mdi-close</v-icon>
          </div>
          <div class="popup_container">
            <ul class="workStep pl-0">
              <li class="step step2" style="list-style: none;">
                <h3><span>항목선택</span></h3>
                <div class="workStepResult">
                  <dl
                    class="unitList"
                    style="list-style: none;">
                    <div v-for="(n, index) in unitList" :key="index" :data-unitCode="index">
                      <div v-if="n.useFl == 'y'">
                        <input type="number" :id="'unitCnt_'+index" v-model="n.unitCnt"/>
                        <v-btn depressed small height="42" @click="incrementValue(n, index, 1)">+1</v-btn>
                        <v-btn depressed small height="42" @click="incrementValue(n, index, 5)">+5</v-btn>
                        <v-btn depressed small height="42" @click="incrementValue(n, index, 10)">+10</v-btn>
                        <v-btn depressed small height="42" @click="incrementValue(n, index, 100)">+100</v-btn>
                      </div>
                    </div>
                  </dl>
                </div>
              </li>
            </ul>

            <v-btn
              depressed
              block
              height="42"
              id="workSubmit"
              @click="ModifyWork"
            >
              수정하기
            </v-btn>

          </div>
        </div>
      </v-card>
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
      workList: [],
      unitList: [],
    }
  },
  computed: {
    totalPrice: {
      get() {
        return this.ExpectedPrice
      },
      set() {

      }

    },
    totalQuantity: {
      get() {
        //return this.totalQuantity
      },
      set() {

      }
    },
  },
  methods: {
    ExpectedPrice (units) {
      //let totalCostPrice = 0;
      let totalPrice = 0;

      for (let unit in units) {
        if (units[unit].useFl === "y") {
          //totalCostPrice += units[unit].totalCostPrice;
          totalPrice += units[unit].totalPrice;
        }
      }

      return totalPrice

      //console.log(`Total Cost Price: ${totalCostPrice}`);
      console.log(`Total Price: ${totalPrice}`);
    },
    incrementValue(unit, index, incrementValue) {
      const input = document.getElementById('unitCnt_'+index)
      const currentValue = Number(input.value);
      if (isNaN(currentValue)) {
        // input 값이 숫자가 아닌 경우 처리
      } else {
        input.value = currentValue + incrementValue;
      }

      //unit.unitCnt += incrementValue;
    },
    ModifyWork(eventNo) {
      const params = new URLSearchParams()
      params.append('eventNo', eventNo)
      params.append('unitList', unitList)
      axios.post('http://localhost:3001/v1/work/member/modify', params)
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
      //params.append('eventDt', this.time3)
      axios.post('http://localhost:3001/v1/work/list', params)
        .then(res => {
          console.log(res.data.data, 'getMyWorkList')
          let result = res.data.data

          this.workList = result


        })
    },
    getMyWorkDetail(eventNo) {
      console.log(eventNo, 'eventNo')
      axios.get('http://localhost:3001/v1/work/list/details/'+eventNo)
        .then(res => {
          console.log(res.data.data[0],'getMyWorkDetail')
          let result = res.data.data[0]
          this.workList.forEach((a, index) => {
            if(a.eventNo == eventNo) {
              this.unitList = JSON.parse(a['unitList'])
            }
          })
          this.dialog = true
        })
    }
  },
  mounted() {
    this.time3 = commonJS.getDate()[0]
    //console.log(this.time3, 't')
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

.attendanceMore .unitList ul li h3 {
  font-weight: 500;
  font-size: 14px;
}

.detail-toggle p {
  font-weight: 500;
  font-size: 14px;
}
</style>
