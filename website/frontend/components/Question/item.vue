<template>
    <b-list-group-item>
      <b-card border-variant="white">
        <b-card-text>
          {{question.text}}
        </b-card-text>
        <b-form-radio-group
          :options="answers"
          class="mb-3"
          value-field="text"
          text-field="text"
        ></b-form-radio-group>
        <!--<b-list-group flush>
          
          <AnswerItem v-for="(answer, index) in answers" :key="index" :answer="answer" />
        </b-list-group>-->
 
      </b-card>
    </b-list-group-item>
  </template>
  
  <script>
  import AnswerItem from "../Answer/item.vue"
  export default {
    name:"SurveyItem",
    props:["question"],
    components:{AnswerItem},
    computed: {
      answers() {
        return this.$store.state.answer.answers.filter(
          // eslint-disable-next-line eqeqeq
          answer => answer.idQuestion == this.question.idQuestion
        );
      }
    },
  }
</script>
  