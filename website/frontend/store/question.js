export const state = () => ({
    count : 7,
    questions:[
      {
          idQuestion:1,
          text:"What is your sex?",
          idSurvey: 1
      },
      {
        idQuestion:2,
        text:"Where do you live?",
        idSurvey: 1
      },
      {
        idQuestion:3,
        text:"How old are you?",
        idSurvey: 1
      },
      {
        idQuestion:4,
        text:"Do you have a smartphone?",
        idSurvey: 2
      },
      {
        idQuestion:5,
        text:"How much time do you use your phone per day?",
        idSurvey: 2
      },
      {
        idQuestion:6,
        text:"Which platform do you use?",
        idSurvey: 2
      },
    ]
})

export const actions = {
  create({commit}, question){
    commit('add', {
      idQuestion: count,
      text:question.text,
      idSurvey: question.idSurvey
    })
  },
  delete({commit}, id){
    commit('delete', id)
  },

}

export const mutations = {

  set: (state, questions) => {
    state.questions = []
    state.questions = questions
  },
  setOrUpdate: (state, question) => {
    state.questions.push(question)
  },
  add: (state, question) => {
    state.questions.push(question)
  },
  delete: (state, id) => {
    const index = state.questions.findIndex(question => question._id === id)
    state.questions.splice(index, 1)
  }
}



