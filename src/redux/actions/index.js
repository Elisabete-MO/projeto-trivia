export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_FINISHED = 'REQUEST_FINISHED';
export const SET_SCORE = 'SET_SCORE';

// Player Login

export const playerLogin = (data) => ({
  type: PLAYER_LOGIN,
  payload: data,
});

// Player Score and Assertions

export const playerScore = (score) => ({
  type: SET_SCORE,
  payload: score,
});

// Request Token

const requestToken = () => ({
  type: REQUEST_STARTED,
});

const requestFinished = (token) => {
  localStorage.setItem('token', token.token);
  return { type: REQUEST_FINISHED, payload: token };
};

export const getToken = () => (dispatch) => {
  dispatch(requestToken());
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((token) => dispatch(requestFinished(token)));
};
