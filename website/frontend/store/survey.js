export const state = () => ({
    count : 3,
    surveys:[
        {
            idSurvey:1,
            title:"Basics survey",
            description:"Basic question about who you are",
            downloads:0,
            answer:0,
            date: new Date(2022, 8, 22)
        },
        {
          idSurvey:2,
          title:"Mobile Usage",
          description:"How do you use your mobile phone?",
          downloads:0,
          answer:0,
          date: new Date(2022, 11, 17)
      }
    ]
})

export const actions = {
  create({commit}, survey){
    commit('add', {
      idSurvay: count,
      title: survey.title,
      description: survey.description,
      downloads:0,
      answer:0,
      date: new Date()
    })
    count++
  },
  async delete({commit}, id){
    commit('delete', id)
  },

}

export const mutations = {

  set: (state, surveys) => {
    state.surveys = []
    state.surveys = surveys
  },
  setOrUpdate: (state, survay) => {
    state.surveys.push(survay)
  },
  add: (state, survay) => {
    state.surveys.push(survay)
  },
  delete: (state, id) => {
    const index = state.surveys.findIndex(survay => survay._id === id)
    state.surveys.splice(index, 1)
  }
}

export const getters = {
  getSurvayById(state) {
    return id => state.surveys.filter(survay =>{
      return survay._id === id
    });
  },
}


