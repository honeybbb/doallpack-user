<template>
  <v-container style="max-width: 460px;" fill-height>
    <v-card-title>작업내역</v-card-title>
    <v-layout align-center row wrap>
      <v-flex style="padding: 30px;">
        <v-card
          outlined
          style="border-radius: 10px"
        >
          <v-date-picker v-model="date"></v-date-picker>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script >

export default {
  methods: {

  },
}
</script>

<style scoped>

</style>
