export const state = () => ({

    surveyAnswered:[],
    DataUser:false
})

export const actions = {
  create({commit}, idSurvey){
    commit('add', {
      idSurvey: idSurvey
    })
  },
  async delete({commit}, id){
    commit('delete', id)
  },

}

export const mutations = {

  set: (state, surveyAnswered) => {
    state.surveyAnswered = []
    state.surveyAnswered = surveyAnswered
  },
  setOrUpdate: (state, idSurvey) => {
    state.surveyAnswered.push(idSurvey)
  },
  add: (state, idSurvey) => {
    state.surveyAnswered.push(idSurvey)
  }
}

export const getters = {
  getSurvayById(state) {
    return id => state.surveyAnswered.filter(survay =>{
      return survay._id === id
    });
  },
}


