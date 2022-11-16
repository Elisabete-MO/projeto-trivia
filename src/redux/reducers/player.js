import { PLAYER_LOGIN, REQUEST_STARTED, REQUEST_FINISHED, SET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '', // nome-da-pessoa,
  assertions: 0, // número-de-acertos,
  score: 0, // pontuação,
  gravatarEmail: '', // email-da-pessoa,
  token: '', // token-do-player
  gettingToken: false, // esperando-api
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case PLAYER_LOGIN:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.email,
      gettingToken: false,
    };
  case SET_SCORE:
    return {
      ...state,
      assertions: payload.assertions,
      score: payload.score,
    };
  case REQUEST_STARTED:
    return { ...state };
  case REQUEST_FINISHED:
    return { ...state, token: payload, gettingToken: true, score: 0 };
  default:
    return state;
  }
};

export default player;
