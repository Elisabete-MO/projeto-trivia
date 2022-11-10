export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_FINISHED = 'REQUEST_FINISHED';
// export const GET_QUESTION = 'GET_QUESTION';

// Player Login

export const playerLogin = (data) => ({
  type: PLAYER_LOGIN,
  payload: data,
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
