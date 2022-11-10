import GET_QUESTION from '../actions';

const INICIAL_STATE = {
  question: [],
};

const game = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTION:
    return {
      ...state,
      questions: action.payload.results,
    };
  default:
    return state;
  }
};

export default game;
