<template>
    <div class="container">
      <b-button  class="float-right"><NuxtLink to="/">Back to the list</NuxtLink></b-button>
      
        <b-form-checkbox
        id="checkbox-1"
        v-model="status"
        name="checkbox-1"
        value="accepted"
        unchecked-value="not_accepted"
        >
            Are you a data user?
        </b-form-checkbox>

        <h1>Survey Answered</h1>
        <b-list-group v-if="surveyAnswered.length > 0" flush>
            <SurveyItem v-for="(surveyAnswered, index) in surveyAnswered" :key="index" :surveyAnswered="surveyAnswered"/>
        </b-list-group>
        <div v-else >
          You did not respond to any surveys
        </div>
  
    </div>
  </template>
  
  <script>
  
    import SurveyItem from "./Survey/item.vue"

  
  export default {
    name: "Surveys",
    components:{ SurveyItem },
  
    computed: {
      dataUser() {
        return this.$store.state.user.DataUser
      },
      surveyAnswered() {
        return this.$store.state.user.surveyAnswered
      },
    },
    methods: {
      create(){
        this.$refs.createModal.show()
      }
    },
  
  }
  </script>
  