<template>
  <v-container style="max-width: 460px;" fill-height>
    <v-card-title>작업시간</v-card-title>
    <v-layout row wrap>
      <v-flex style="padding: 30px;" class="pt-0">
        <v-card
          outlined
          style="border-radius: 10px"
        >
          <v-col cols="12">
            <h2>센터1</h2>
            <div class="attendanceWrap">
              <div class="attendanceDate">
                <p class="mb-0">2023-10-30 16:45:04 ~ 2023-10-30 17:54:45</p>
                <p>총 작업시간</p>

              </div>
              <v-slider
                hide-details
                v-model="sliderValue"
                :readonly="true"
                dense
                :color="'#c84726'"
                :track-color="'#D9D9D9'"
              />
            </div>

          </v-col>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      sliderValue: 20
    }
  }
}
</script>
<style scoped>
::v-deep .v-slider__track-fill {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

::v-deep .v-slider__track-background {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

::v-deep .v-slider__track-container {
  height: 32px;
}
</style>
