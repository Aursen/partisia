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
              <b-col cols="3" class="text-right">
                {{survey.date}}
              </b-col>
            </b-row>
          </b-container>
  
        <b-card-text>
          {{survey.description}}
        </b-card-text>
        <b-container v-if="(surveyAnswered.length < 1)">
          <b-row>
            <b-col cols="4" class="pl-0">
              <NuxtLink :to="path" class="card-link">Answer it!</NuxtLink>
            </b-col>
            <!--<b-col cols="8" class="text-right">
              <div v-if="guest.status == 'owner'">OWNER</div>
            </b-col>-->
          </b-row>
        </b-container>
        <b-container v-else>
            <b-row>
                Already Answered
            </b-row>
          </b-container>

  
      </b-card>
    </b-list-group-item>
  </template>
  
  <script>
  export default {
    name:"SurveyItem",
    props:["survey"],
    computed:{
        path(){
            return "/survey/" + this.survey.idSurvey;
        },
        surveyAnswered() {
            return this.$store.state.user.surveyAnswered.filter(
                user => user.idSurvey == this.survey.idSurvey
            );
        }
    }
  }
  </script>
  