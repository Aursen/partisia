<template class="h-100">
  <div class="h-100 w-100 mx-auto">
    <NuxtLink to="/" class="float-right">Back to the list</NuxtLink>
    <b-modal id="modal-1" title="Confirm">
      <label for="range-2">For how much do you want to sell this survey? : {{ value }} USD</label>
      <b-form-input id="range-2" v-model="value" type="range" min="0" max="5" step="0.02"></b-form-input>
      <template #modal-footer>
        <b-btn variant="success" @click="onSubmit">Confirm</b-btn>
      </template>
    </b-modal>
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
      <b-card no-body class="mt-3">
        <b-list-group flush>
          <QuestionItem v-for="(question, index) in questions" :key="index" :question="question" />
        </b-list-group>
      </b-card>
      <b-button variant="success" v-b-modal.modal-1>Send</b-button>
    </b-card>
  </div>
</template>

<script>
import QuestionItem from './item.vue'
export default {
  name: "Questions",
  components:{QuestionItem},
  data() {
    return {
      id: this.$route.params.id,
      value: '2'
    }
  },
  computed: {
    survey() {
      // eslint-disable-next-line eqeqeq
      return this.$store.state.survey.surveys.filter(
        // eslint-disable-next-line eqeqeq
        survey => survey.idSurvey == this.$route.params.id
        )[0];
    },
    questions() {
      return this.$store.state.question.questions.filter(
        // eslint-disable-next-line eqeqeq
        question => question.idSurvey == this.$route.params.id
      );
    }
  },
  methods:{
    onSubmit(){
      this.$store.dispatch("user/create", this.$route.params.id)
      this.$router.replace("/");
    }
  }
}
</script>
