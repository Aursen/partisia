<template>
  <div class="container">
    <Create ref="createModal" />

    <b-button class="btn-sm float-right" variant="success" @click="create">create</b-button>
    <b-button class="btn-sm float-left" variant="primary" @click="profile">profile</b-button>
    <b-list-group v-if="surveys.length > 0" flush>
      <SurveyItem v-for="(survey, index) in surveys" :key="index" :survey="survey"/>
    </b-list-group>
    <div v-else >
      There is no survey.
    </div>

  </div>
</template>

<script>

  import SurveyItem from "./item.vue"
  import Create from "./create.vue"

export default {
  name: "Surveys",
  components:{ SurveyItem, Create },

  computed: {
    surveys() {
      return this.$store.state.survey.surveys
    },
  },
  methods: {
    create(){
      this.$refs.createModal.show()
    },
    profile(){
      this.$router.replace("/profile");
    }
  },

}
</script>
