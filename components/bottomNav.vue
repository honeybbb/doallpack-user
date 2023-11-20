<template>
  <div>
    <v-bottom-navigation
      grow
      height="65"
      background-color="#3f4850"
      align="center"
      fixed
      app
    >
      <div class="w-460" style="align-self: center;">
        <div class="bottom-wrap" >

            <v-btn value="home" to="/">
              <div class="d-block">
                <v-icon>mdi-home-outline</v-icon>
                <p class="mb-0">홈</p>
              </div>
            </v-btn>

            <v-btn value="list" to="/work/list">
              <div class="d-block">
                <v-icon>mdi-calendar-check-outline</v-icon>
                <p class="mb-0">작업내역</p>
              </div>
            </v-btn>

            <!--v-btn value="time" to="/work/timeList">
              <div class="d-block">
                <v-icon >mdi-clock-outline</v-icon>
                <p>작업시간</p>
              </div>
            </v-btn-->

        </div>
      </div>
    </v-bottom-navigation>
  </div>
</template>

<script >
export default {
  name: 'bottomNav',
}
</script>
<style>
.bottom-wrap {
  align-self: center;
  display: flex;
  list-style: none;
  justify-content: space-between;
}
.bottom-wrap span {
  color: #FFFFFF;
  font-weight: 300;
}

.bottom-wrap p {
  //font-size: 0.8rem;
  margin-top: 2px;
  margin-bottom: 0;
}
</style>
