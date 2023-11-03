<template>
<!--  <v-col style="background-color: #f1f3f4;">-->
    <v-container style="max-width: 460px;" fill-height>
      <v-layout row wrap>
        <v-flex>
          <work-main />

        </v-flex>
      </v-layout>
    </v-container>
<!--  </v-col>-->
</template>

<script>
import workMain from "@/components/work/workMain.vue";
export default {
  components: {
    workMain
  },
  data() {
    return {
      drawer: false,
      group: null,
      authValue: false,
    }
  },
  watch: {
    group () {
      this.drawer = false
    },
  },
  methods: {
    logOutUser() {

    }
  },
  mounted() {
    // if(!this.authValue) {
    //   this.$router.push('/login')
    // }
  }
}
</script>
