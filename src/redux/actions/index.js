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
  localStorage.setItem('token', token);
  return { type: REQUEST_FINISHED, payload: token };
};

// const getQuestion = (payload) => ({
//   type: GET_QUESTION,
//   payload,
// });

export const getToken = () => (dispatch) => {
  dispatch(requestToken());
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((token) => dispatch(requestFinished(token.token)));
};

// export const requestQuestion = async (token) => {
//   const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
//   const quest = await response.json();
//   return dispatch(getQuestion(quest));
// };
