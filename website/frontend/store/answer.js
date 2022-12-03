export const state = () => ({
    count : 22,
    answers:[
      {
        idAnswer:1,
        text:"Male",
        idQuestion: 1
      },
      {
        idAnswer:2,
        text:"Female",
        idQuestion: 1
      },
      {
        idAnswer:3,
        text:"Other",
        idQuestion: 1
      },
      {
        idAnswer:4,
        text:"Europe",
        idQuestion: 2
      },
      {
        idAnswer:5,
        text:"Asia",
        idQuestion: 2
      },
      {
        idAnswer:6,
        text:"America",
        idQuestion: 2
      },
      {
        idAnswer:7,
        text:"Africa",
        idQuestion: 2
      },
      {
        idAnswer:8,
        text:"Oceania",
        idQuestion: 2
      },
      {
        idAnswer:9,
        text:"0-18",
        idQuestion: 3
      },
      {
        idAnswer:10,
        text:"19-30",
        idQuestion: 3
      },
      {
        idAnswer:11,
        text:"31-50",
        idQuestion: 3
      },
      {
        idAnswer:12,
        text:"51-70",
        idQuestion: 3
      },
      {
        idAnswer:13,
        text:"+70",
        idQuestion: 3
      },
      {
        idAnswer:14,
        text:"yes",
        idQuestion: 4
      },
      {
        idAnswer:15,
        text:"no",
        idQuestion: 4
      },
      {
        idAnswer:16,
        text:"0-2h",
        idQuestion: 5
      },
      {
        idAnswer:17,
        text:"2-5h",
        idQuestion: 5
      },
      {
        idAnswer:18,
        text:"+5h",
        idQuestion: 5
      },
      {
        idAnswer:19,
        text:"android",
        idQuestion: 6
      },
      {
        idAnswer:20,
        text:"apple",
        idQuestion: 6
      },
      {
        idAnswer:21,
        text:"other",
        idQuestion: 6
      },
    ]
})

export const actions = {
  create({commit}, answer){
    commit('add', {
      idAnswer: count,
      text:answer.text,
      idQuestion: answer.idQuestion
    })
    count++;
  },
  delete({commit}, id){
    commit('delete', id)
  },

}

export const mutations = {

  set: (state, answers) => {
    state.answers = []
    state.answers = answers
  },
  setOrUpdate: (state, answer) => {
    state.answers.push(answer)
  },
  add: (state, answer) => {
    state.answers.push(answer)
  },
  delete: (state, id) => {
    const index = state.answers.findIndex(answer => answer._id === id)
    state.answers.splice(index, 1)
  }
}



