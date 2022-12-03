<template>
      <b-modal id="createModal" v-model="isVisible" class="modal fade" size="xl" no-stacking no-close-on-background no-close-on-esc hide-header-close>
        <template #modal-title>
          Create a new survey
        </template>
        <b-form @submit="onSubmit">
        <b-form-group
            id="title-input-group"
            label="Title:"
            label-for="title-input"
            description="Please give a title to your survey."
        >
            <b-form-input
            id="title-input"
            v-model="survey.title"
            placeholder="Enter title"
            required
            ></b-form-input>
        </b-form-group>

        <b-form-group id="description-input-group" label="Description:" label-for="description-input">
            <b-form-input
            id="description-input-"
            v-model="survey.description"
            placeholder="Enter a description"
            required
            ></b-form-input>
        </b-form-group>

        <!--<b-form-group
            id="place-input-group"
            label="Place:"
            label-for="place-input"
            description="Where did the event take place?"
        >
            <b-form-input
            id="place-input"
            v-model="party.place"
            placeholder="Enter the place"
            required
            ></b-form-input>
        </b-form-group>

        <b-form-group
            id="date-input-group"
            label="Date:"
            label-for="date-input"
            description="when did the event take place?"
        >
            <b-form-datepicker
            v-model="party.date"
            placeholder="Choose a date"
            :min="min"
            locale="en"
            today-button
            reset-button
            close-button
            ></b-form-datepicker>
        </b-form-group>-->
        </b-form>
        <template #modal-footer>
          <b-btn variant="outline-secondary" @click="isVisible=false">Cancel</b-btn>
          <b-btn variant="success" @click="onSubmit">Create</b-btn>
        </template>

      </b-modal>
</template>

<script>
export default {
  name:"Create",
  data() {
    return {
      isVisible: false,

      survey: {
        title: "",
        description: ""
      }
    }
  },
  methods: {
        onSubmit(event) {
            event.preventDefault()
            this.$store.dispatch("survey/create", this.survey)
            this.isVisible = false;
        },
        show() {
          this.isVisible = true
        }
  }

}
</script>
