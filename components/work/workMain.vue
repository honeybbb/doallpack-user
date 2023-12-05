<template>
  <div class="col-md-12">
    <template v-if="workArea.length > 0">

      <div v-if="!doing">
        <v-card
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
              @click="startWork(item.sno)"
            >
              <span>작업시작</span>
            </v-btn>
          </div>

        </v-card-text>
        </v-card>
      </div>
      <div v-else>
        <v-card
          v-for="item in workArea"
          v-if="doing.companySno == item.sno"
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
              class="endWork"
              color="#39a759"
              height="42"
              block
              depressed
              @click="endWork(item.sno)"
            >
              <span>작업종료</span>
            </v-btn>
          <div class="attendanceInfo">
              <ul
                class="pl-0"
                style="
                  list-style: none;
                  display: flex;
                  justify-content: space-between;"
              >
                <li>출근</li>
                <li>{{ doing.workStartDt }}</li>
              </ul>
            </div>
            <div
              class="attendanceWrite cursor-pointer"
              @click="getScmContractByScm(item.sno)"
            >
              <v-icon
                small
                color="#177ee3"
              >
                mdi-pencil-circle-outline
              </v-icon>
              작업일지작성
            </div>
          </div>
        </v-card-text>
        </v-card>
      </div>
    </template>
    <template v-else>
      <v-card
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
    </template>

    <!-- 작업일지 dialog -->
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
              <li class="step step1" style="list-style: none;">
                <h3><span>업체선택</span></h3>
                <div
                  class="workStepResult col-md-12"
                  v-for="group in companyList"
                  :key="group.sno"
                >
                  <dl
                      v-for="company in JSON.parse(group.scmGroupList)"
                      :key="company.scmNo">
                    <dd
                      :class="selected == company.scmNo ?'selected':''"
                      @click="getScmContract(company.scmNo)"
                    >
                      {{company.companyNm}}
                    </dd>
                  </dl>
                </div>
              </li>
              <li class="step step2" style="list-style: none;">
                <h3><span>항목선택</span></h3>
                <div class="workStepResult">
                  <dl
                    v-for="item in contracts" :key="item.sno"
                    class="unitList"
                    style="list-style: none;">
                    <div v-for="(n, index) in item.unitList"
                         :key="index"
                         :data-unitCode="index"
                         :data-itemNm="getItemNm(index)|splitName"
                         :data-costPrice="n.costPrice"
                         :data-price="n.price"
                    >
                      <div v-if="n.useFl == 'y'">
                        <h4>{{ getItemNm(index) | splitName }}</h4>
                        <input type="number"
                               :id="'unitCnt_'+index"
                               :data-itemNm="getItemNm(index)|splitName"
                               :data-costPrice="n.costPrice"
                               :data-price="n.price"
                               v-model="n.unitCnt"
                               @change="incrementValue(n, index, 0)"
                               @blur="incrementValue(n, index, 0)"
                        />
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
                @click="workSubmit"
              >
                등록하기
              </v-btn>

          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
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
      doing: [],
      contracts: [],
      companyList: [],
      units: [],
      groupNo: '',
      scmNo: '',
      workList: '',
      selected: [],
    }
  },
  filters: {
    splitName(val) {
      return val.split('^')[0].replace('^\^y','')
    },
  },
  methods: {
    getItemNm(index) {
      const found = this.units.find((a) => a.itemCd == index);
      return found ? found.itemNm : null;
    },
    startWork (companySno) {
      //const memNo = this.$store.state.memNo
      const memNo = localStorage.getItem('memNo')
      const params = new URLSearchParams();
      params.append('memNo', memNo)
      params.append('companySno', companySno)

      axios.post('http://api.doall.renewwave.co.kr/v1/work/member/start', params)
        .then(res => {
          console.log(res)
          this.getWorkFl()
          alert('[출근]처리가 완료되었습니다.')
        })



      //const diary = document.getElementsByClassName('attendanceWrite')[0]
      //diary.className = 'attendanceWrite cursor-pointer'
      //console.log(diary, 'd')
    },
    endWork (companySno) {
      const memNo = localStorage.getItem('memNo')
      const params = new URLSearchParams();
      params.append('memNo', memNo)
      params.append('companySno', companySno)

      axios.post('http://api.doall.renewwave.co.kr/v1/work/member/end', params)
        .then(res => {
          console.log(res)
          this.getWorkFl()
          alert('[퇴근]처리가 완료되었습니다.')
        })


    },
    incrementValue(unit, index, incrementValue) {
      const input = document.getElementById('unitCnt_'+index)
      const currentValue = Number(input.value);
      if (isNaN(currentValue)) {
        // input 값이 숫자가 아닌 경우 처리
        alert("숫자를 입력해주세요.");
        return;
      } else {
        input.value = currentValue + incrementValue;
        unit['unitCnt'] =input.value
        unit['unitNm']= input.dataset.itemnm
        unit['totalCostPrice']= input.value * parseFloat(input.dataset.costprice)
        unit['totalPrice']= input.value * parseFloat(input.dataset.price)
        console.log(unit, '추가 수량')
      }

      // 이 부분에서 this.$set을 사용하여 unitList를 업데이트합니다.
      this.$set(this.contracts[0].unitList, index, unit);
    },
    async workSubmit() {
        const result = confirm('입력 후에는 수정 및 추가입력이 불가능합니다. 입력하시겠습니까?')

        if(result) {
            const ChangeUnitList = this.contracts[0].unitList

            let memNo = localStorage.getItem('memNo'),
                  unitList = ChangeUnitList,
                  companySno = this.groupNo,
                  scmNo = this.scmNo,
                  groupKey = companySno + '_' + scmNo,
                  costPrice = 0,
                  price = 0,
                  qnt = 0;

            const arr = Object.values(unitList)
            arr.map((a, index) => {

              if(a.useFl == 'y'){
                if(!a.unitCnt) {
                  a.unitCnt = 0
                }

                if(a.unitNm) {
                  console.log(a.unitNm, a.unitCnt, a.costPrice, a.price, a, '더해질 값들 확인');
                  qnt += parseFloat(a.unitCnt)
                  costPrice += parseFloat(a.costPrice * a.unitCnt)
                  price += parseFloat(a.price * a.unitCnt)
                }
              }
              //qnt = qnt.toFixed(3) // 소수점 셋째자리에서 반올림
              //costPrice = costPrice.toFixed(3) // 소수점 셋째자리에서 반올림,
              //price = price.toFixed(3) // 소수점 셋째자리에서 반올림
            })

            const params = new URLSearchParams()
            params.append('eventDt', new Date().toISOString().substr(0, 10))
            params.append('unitList', JSON.stringify(unitList))
            params.append('memNo', memNo)
            params.append('companySno', companySno)
            params.append('scmNo', scmNo)
            params.append('groupKey', groupKey)
            params.append('costPrice', costPrice)
            params.append('price', price)
            params.append('quantity', qnt)

            await axios.post('http://api.doall.renewwave.co.kr/v1/work/list/write', params)
                .then(res => {
                    let result = res.data.data
                    if(result.insertId) {
                        alert('정상적으로 등록되었습니다.')
                        this.dialog = false
                    }
                })
        }


    },
    async getScmContract(scmNo) {
      this.selected = scmNo
      await axios.get('http://api.doall.renewwave.co.kr/v1/scm/contract/'+scmNo)
        .then(res => {
          //console.log(res.data.data)
          const result = res.data.data

          result.map((item) => {
            item.unitList = JSON.parse(item.unitList)

            for (let unit in item.unitList) {
              // Add totalCostPrice and totalPrice with initial value of 0
              item.unitList[unit] = {
                ...item.unitList[unit],
                unitNm: this.$options.filters.splitName(this.getItemNm(unit)),
                totalCostPrice: 0,
                totalPrice: 0,
              };
            }

            console.log(JSON.stringify(item.unitList))
          })

          this.contracts = result
          this.scmNo = scmNo

        })
    },
    getWorkFl() {
      const memNo = localStorage.getItem('memNo')
      axios.get('http://api.doall.renewwave.co.kr/v1/work/doing/'+memNo)
        .then(res => {
          const result = res.data.data[0]
          console.log(result, 'getWorkFl')
          this.doing = result
        })
    },
    async getScmContractByScm(sno) {
        //계약항목 불러오기
      console.log(sno, 'sno')
        this.groupNo = sno
      await axios.get('http://api.doall.renewwave.co.kr/v1/scm/manage/group/list/info/'+sno)
        .then(res => {
          console.log(res.data.data, 'getScmContract')
          if(res.data.data.length > 0) {
            this.companyList = res.data.data
            this.dialog=true
          }

        })
    },
    async getUnitCode() {
      await axios.get('http://api.doall.renewwave.co.kr/v1/code/unit/item')
        .then(res => {
          console.log(res.data.data)
          this.units = res.data.data
        })
    },
  },
  mounted() {
    this.getWorkFl()
    this.getUnitCode()
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

.popup_container .workStepResult dl dd {
  float: left;
  width: calc(50% - 10px);
  margin-right: 10px;
  margin-bottom: 5px;
  background: #fff;
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
}

.popup_container .workStepResult {
  padding: 20px 20px 15px;
  background: #ddd;
  box-shadow: inset 0 8rem 10rem rgba(0, 0, 0, .15);
  overflow-y: auto;

  @media (max-width: 391px) {
    padding: 10px 10px 15px;

  }
}

.popup_container .workStepResult input[type="number"] {
  background-color: #FFFFFF;
  padding-left: 10px;
  max-width: 100px;
  line-height: 40px;
  border: 1px solid #ddd;
  box-sizing: border-box;

  @media (max-width: 376px) {
    max-width: 80px;

  }
}

.popup_work .popup_container .workStepResult #workSubmit {
  margin: 0;
  margin-top: 30px;
  background: #c84726;
  width: 100%;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 42px;
  font-weight: 900;
  border: none;
}

.selected {
  background-color: #c84726 !important;
  color: #FFFFFF;
}
</style>
