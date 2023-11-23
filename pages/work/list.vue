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
            range
            :lang="lang"
          />
          <v-btn
            color="black"
            depressed
            @click="getMyWorkList"
          >
            <span class="text--white">검색</span>
          </v-btn>

          <h3>이번달 수익 : {{ totalPrice | comma }}원
            ({{ totalQuantity | comma }} 건)</h3>
          <v-card
            outlined
            style="border-radius: 10px"
            class="mb-2"
            v-for="item in paging"
          >
            <v-card-text :data-eventNo="item.eventNo">
              <h2>{{ item.groupNm }}] {{ item.companyNm }}</h2>
              <div class="attendanceWrap">
                <div class="attendanceDate">
                  <p class="mb-0">예상 수입금액 {{ item.price | comma }}원</p>
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
                    <p>{{ Math.round(n.price * n.unitCnt) | comma }} 원</p>
                  </v-list-item>
                </template>


              </v-list-group>
            </v-list>
        </v-card>
        </div>

        <div class="col-md-12">
          <v-pagination
              v-model="page"
              :length="Math.ceil(workList.length / pageSize)"
          ></v-pagination>
        </div>
      </v-flex>
      <v-main style="height: 500px"></v-main>
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
                      {{n.unitNm}}
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
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
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
      totalPrice: 0,
      totalQuantity: 0,
      pageSize: 5,
      page: 1,
      eventNo: '',
    }
  },
  computed: {
    paging() {
      let page = this.page
      let perPage = this.pageSize
      let from = (page - 1) * perPage
      let to = page * perPage
      return this.workList.slice(from, to);
    }
  },
  methods: {
    incrementValue(unit, index, incrementValue) {
      const input = document.getElementById('unitCnt_'+index)
      const currentValue = Number(input.value);
      if (isNaN(currentValue)) {
        // input 값이 숫자가 아닌 경우 처리
        alert("숫자를 입력해주세요.");
        return;
      } else {
        this.$set(this.unitList[index], 'unitCnt', currentValue + incrementValue);
        //input.value = currentValue + incrementValue;
      }
    },
    async ModifyWork() {
      const params = new URLSearchParams()
      params.append('eventNo', this.eventNo)
      params.append('unitList', JSON.stringify(this.unitList))
      await axios.post('http://localhost:3001/v1/work/member/modify', params)
        .then(res => {
          console.log(res.data.data)
          this.getMyWorkList()
          this.dialog = false
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
      const memNo = localStorage.getItem('memNo'),
          sDate = this.getToday(new Date(this.time3[0])),
          eDate = this.getToday(new Date(this.time3[1]));

      console.log(sDate, eDate)

      const params = new URLSearchParams()
      params.append('memNo', memNo)
      params.append('sDate', sDate)
      params.append('eDate', eDate)

      axios.post('http://localhost:3001/v1/work/list', params)
        .then(res => {
          console.log(res.data.data, 'getMyWorkList')
          let result = res.data.data

          this.workList = result

          // totalPrice와 totalQuantity 계산
          let totalPrice = 0;
          let totalQuantity = 0;

          this.workList.forEach(item => {
            const units = JSON.parse(item.unitList);
            for (let unit in units) {
              if (units[unit].useFl === "y") {
                if(!units[unit].unitCnt) {
                  units[unit].unitCnt = 0
                }

                totalPrice += parseFloat(units[unit].price) * parseFloat(units[unit].unitCnt);
                totalQuantity += parseFloat(units[unit].unitCnt);
              }
            }
          });

          // totalPrice와 totalQuantity 저장
          this.totalPrice = totalPrice;
          this.totalQuantity = totalQuantity;

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
          this.eventNo = eventNo
          this.dialog = true
        })
    },
    getToday(date){
      var year = date.getFullYear();
      var month = ("0" + (1 + date.getMonth())).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);

      return year + "/" + month + "/" + day;
    },
  },
  mounted() {
    this.time3 = commonJS.setThisMonthDate()
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

::v-deep .v-pagination__item {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0), 0px 2px 2px 0px rgba(0, 0, 0, 0), 0px 1px 5px 0px rgba(0, 0, 0, 0);
  border: 1px solid #E6E6E6;
}

::v-deep .v-pagination__navigation {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0), 0px 2px 2px 0px rgba(0, 0, 0, 0), 0px 1px 5px 0px rgba(0, 0, 0, 0);
  border: 1px solid #E6E6E6;
}
</style>
