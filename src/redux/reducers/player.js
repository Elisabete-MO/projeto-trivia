import { PLAYER_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '', // nome-da-pessoa,
  assertions: '', // número-de-acertos,
  score: '', // pontuação,
  gravatarEmail: '', // email-da-pessoa,
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case PLAYER_LOGIN:
    return { ...state, player: payload };
  default:
    return state;
  }
};

export default player;
