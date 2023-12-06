<template>
  <v-container style="max-width: 460px;" fill-height>
    <v-layout row wrap>
      <v-flex class="pt-0">
        <div class="col-md-12 normal_board">
          <h2>{{ memNm }}님 작업내역</h2>
          <div class="d-flex">
            <date-picker
              valueType="format"
              range
              type="month"
              v-model="time3"
              @change="handleDateChange"
              :lang="lang"
              class="mb-5"
            />
            <v-spacer/>
            <v-btn
              color="black"
              depressed
              @click="getMyWorkList"
            >
              <span class="text--white">검색</span>
            </v-btn>
          </div>


        <table width="100%">
          <thead>
            <th>업체</th>
            <th>항목명</th>
            <th>단가</th>
            <th>수량</th>
            <th>합계</th>
          </thead>
          <template v-if="workList.length>0">
            <template v-for="item in workList">
              <tr
                v-for="(c, j) in JSON.parse(item.unitList)"
                :key="j"
                v-if="c.unitCnt>0"
              >
                <td><h4>{{ item.companyNm }}</h4></td>
                <td >{{ c.unitNm }}</td>
                <td >{{ c.price}}</td>
                <td >{{ c.unitCnt }}</td>
                <td >{{ c.price * c.unitCnt |comma }}</td>
              </tr>
                <tr>
                  <td bgcolor="#E6E6E6" colspan="3">{{ item.companyNm }} 소계</td>
                  <td bgcolor="E6E6E6">{{ item.quantity |comma }}</td>
                  <td bgcolor="E6E6E6">{{ item.price |comma }}</td>
                </tr>
            </template>
            <tr>
              <td bgcolor="#dbe7f0" colspan="3">합계</td>
              <td bgcolor="#ffffff"><h4>{{ totalQuantity | comma }}</h4></td>
              <td bgcolor="#ffffff"><h4>{{ totalPrice | comma }}</h4></td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="5">작업내역이 없습니다.</td>
          </tr>
        </table>
      </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script >
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';
import commonJS from '/assets/js/common';
import axios from "axios";
import moment from 'moment';
export default {
  components: {
    DatePicker
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    splitName(val) {
      return val.split('^')[0].replace('^\^y','')
    },
  },
  data () {
    return {
      time3: '',
      workList: [],
      lang: {
        months: [
          '1월','2월','3월','4월','5월','6월',
          '7월','8월','9월','10월','11월','12월',
        ]
      },
      totalPrice: 0,
      totalCostPrice: 0,
      totalQuantity: 0,
      memNm: ''
    }

  },
  methods: {
    handleDateChange(date){
      if(date.length === 2) {
        if (date.length === 2) {
          const startOfMonth = this.getStartOfMonth(date[0]);
          const endOfMonth = this.getEndOfMonth(date[1]);
          this.time3 = [startOfMonth, endOfMonth];
        }
      }
    },
    getStartOfMonth(date) {
      return moment(date).startOf('month').format('YYYY-MM-DD');
    },
    getEndOfMonth(date) {
      return moment(date).endOf('month').format('YYYY-MM-DD');
    },
    filteredSubRows(item) {
      return JSON.parse(item.unitList)
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

      axios.post('http://api.doall.renewwave.co.kr/v1/work/list', params)
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
          this.totalPrice = totalPrice.toFixed(2);
          this.totalQuantity = totalQuantity.toFixed(2);

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
    this.memNm = localStorage.getItem('memNm')
    this.getMyWorkList()
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 20px;
  text-align: center;

  th {
    background-color: #E6E6E6;
  }

  th, td {
    padding: 6px;
    font-size: 0.9rem;
    word-break: keep-all;
    border: 1px solid #E6E6E6;
  }
}

.normal_board h2 {font-size:16px; margin-bottom:10px;}
.normal_board h3 {font-size:14px; margin-bottom:10px;}
</style>
