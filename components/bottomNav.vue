<template>
  <div >
    <v-bottom-navigation
      height="65"
      background-color="#3f4850"
      align="center"
      fixed
    >
      <div class="w-460" style="align-self: center;">
        <ul class="bottom-wrap" >
          <li>
            <v-btn value="home" to="/">
              <div class="d-block">
                <v-icon>mdi-home-outline</v-icon>
                <p>홈</p>
              </div>
            </v-btn>
          </li>

          <li>
            <v-btn value="list" to="/work/list">
              <div class="d-block">
                <v-icon>mdi-calendar-check-outline</v-icon>
                <p>작업내역</p>
              </div>
            </v-btn>
          </li>

          <li>
            <v-btn value="time" to="/work/timeList">
              <div class="d-block">
                <v-icon >mdi-clock-outline</v-icon>
                <p>작업시간</p>
              </div>
            </v-btn>
          </li>
        </ul>
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
  font-size: 0.8em;
  margin-top: 2px;
}
</style>
