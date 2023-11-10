<template>
  <v-col cols="12">
    <v-card
      v-for="group in workArea"
      outlined
      style="border-radius: 10px"
      class="mb-2"
    >
    <v-card-text>
    <h2>{{ group.groupNm }}</h2>
    <div class="attendanceWrap">

      <div class="attendanceDate">
        <p class="mb-0">2023-10-24</p>
        <p>작업 장소를 선택해주세요.</p>

      </div>

      <v-btn
        class="startWork"
        color="#c84726"
        height="42"
        block
        depressed
        @click="startWork(group)"
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

    <v-dialog width="460" v-model="dialog">
    <v-card
      color="#f6f6f6"
    >
      <v-col cols="12">
        <div class="popup_head">
          <v-card-title>작업일지작성</v-card-title>
          <v-icon @click="dialog=false">mdi-close</v-icon>
        </div>
        <div class="popup_container">
          <v-col cols="12" class="workStep">

            <v-list>
              <v-list-group
                v-for="item in contracts"
                :key="item.title"
                v-model="item.active"
                :prepend-icon="item.action"
                no-action
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                  v-for="child in item.items"
                  :key="child.title"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{child.title}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
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
      </v-col>
    </v-card>
  </v-dialog>

    </v-card>
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
      contracts: [
        {
          items: [{ title: 'List Item' },{ title: 'List Item' },{ title: 'List Item' }],
          title: '업체 선택',
        },
        {
          items: [{ title: 'List Item' }],
          title: '항목',
        },
      ],
    }
  },
  methods: {
    startWork () {
      const memNo = this.$store.state.memNo
      console.log(memNo,'memNo')
      const params = new URLSearchParams();
      params.append('memNo', memNo)
      axios.post('http://localhost:3001/v1/member/work/start', params)
        .then(res => {
          console.log(res)
          return
        })


      alert('[출근]처리가 완료되었습니다.')
      const diary = document.getElementsByClassName('attendanceWrite')[0]
      diary.className = 'attendanceWrite cursor-pointer'
      console.log(diary, 'd')
    },
    endWork () {
      alert('[퇴근]처리가 완료되었습니다.')
    }
  },

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
