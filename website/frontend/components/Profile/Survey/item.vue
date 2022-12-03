<template>
    <b-list-group-item>
      <b-card border-variant="white">
          <b-container fluid>
            <b-row>
              <b-col cols="9" class="pl-0">
                <b-card-title >
                  {{survey.title}}
                </b-card-title>
              </b-col>
            </b-row>
          </b-container>
  
        <b-card-text>
          {{survey.description}}
        </b-card-text>
      </b-card>
    </b-list-group-item>
  </template>
  
  <script>
  export default {
    name:"SurveyItem",
    props:["surveyAnswered"],
    computed:{
        path(){
            return "/survey/" + this.survey.idSurvey;
        },
        survey() {
            return this.$store.state.survey.surveys.filter(
                survey => survey.idSurvey == this.surveyAnswered.idSurvey
            )[0];
        }
    }
  }
  </script>
  