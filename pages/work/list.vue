<template>
  <v-container style="max-width: 460px;" fill-height>
    <v-layout row wrap>
      <v-flex class="pt-0">
        <v-col cols="12">
          <v-card-title class="px-0">작업내역</v-card-title>
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
          >
            <span class="text-white">검색</span>
          </v-btn>

          <h4 class="mb-2">이번달 수익 : 1,540원 (10건)</h4>
          <v-card
            outlined
            style="border-radius: 10px"
          >
            <v-card-text>
            <h2>[센터1] 하비언니</h2>
            <div class="attendanceWrap">
              <div class="attendanceDate">
                <p class="mb-0">예상 수입금액 1,540원</p>
                <p>2023-11-03 12:21:20 검수대기</p>
                <v-btn small depressed color="#177ee3">수정하기</v-btn>
              </div>

            </div>
          </v-card-text>
            <v-divider></v-divider>
            <v-list class="work-list">
              <v-list-group :value="false" append-icon="mdi-chevron-down">
                <template v-slot:activator>
                  <v-list-item-title>상세내역보기</v-list-item-title>
                </template>

                <v-list-item>(새벽,) 검수/포장 (3건)</v-list-item>
                <v-list-item>(주간,야간) 검수/포장 (2건)</v-list-item>
                <v-list-item>불량 (1건)</v-list-item>
                <v-list-item>원피스/셔츠 (1건)</v-list-item>
                <v-list-item>자켓/코트 (1건)</v-list-item>
                <v-list-item>세트상품 (1건)</v-list-item>
              </v-list-group>
            </v-list>
        </v-card>
        </v-col>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script >
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';
import commonJS from '/assets/js/common';

export default {
  components: {
    DatePicker
  },
  data() {
    return {
      time3: '',
      selectedDate: new Date().toISOString().substr(0, 10),
      lang: {
        months: [
          '1월','2월','3월','4월','5월','6월',
          '7월','8월','9월','10월','11월','12월',
        ]
      }
    }
  },
  methods: {
    updateDate(value) {
      this.selectedDate = value;
    },
    updateMonth(month) {
      this.$refs.picker.tableDate = month;
    },
  },
  mounted() {
    this.time3 = commonJS.getMonthday()
  }
}
</script>

<style scoped>
.work-list .v-list-item {
  font-size: 14px;
}
</style>
