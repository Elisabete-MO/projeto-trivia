import React from 'react';
import { getByTestId, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';
import App from '../App';
import Login from '../pages/Login';

describe('Teste a página <Game.js />', () => {
  const dataLoginEmail = 'input-gravatar-email';
  const dataLoginName = 'input-player-name';

  const dataIdName = 'header-player-name';
  const dataIdScore = 'header-score';
  const dataIdPicture = 'header-profile-picture';
  const dataIdBtn = 'btn-play';
  const dataEmail = 'test@mail.com';
  const dataName = 'Rolando Penha';

  test(
    'Teste se a página contém um header com as informações da pessoa jogadora',
    async () => {
      renderWithRouterAndRedux(<Login />);
      const loginEmail = screen.getByTestId(dataLoginEmail);
      userEvent.type(loginEmail, dataLoginEmail);

      const loginName = screen.getByTestId(dataLoginName);
      userEvent.type(loginName, dataName);

      const loginBtn = screen.getByRole('button', { name: /jogar/i });
      userEvent.click(loginBtn);

      const gameHeaderPicture = screen.getByTestId(dataIdPicture);
      expect(gameHeaderPicture).toHaveAttribute('img');
      console.log(gameHeaderPicture);
      expect(gameHeaderPicture).toBeInTheDocument();
      const gameHeaderName = screen.getByTestId(dataIdName);
      expect(gameHeaderName).toBeInTheDocument();
      const gameHeaderScore = screen.getByTestId(dataIdScore);
      expect(gameHeaderScore).toBeInTheDocument();

      expect.assertions(1);
      await getMagicCard('130550');
      expect(fetch).toHaveBeenCalledWith('https://api.magicthegathering.io/v1/cards/130550');
      
  });

  // test('Teste se a página contém um campo do tipo "text" para inserir o nome', () => {
  //   renderWithRouterAndRedux(<App />);
  //   const loginName = screen.getByTestId(dataIdName);

  //   expect(loginName).toBeInTheDocument();
  //   expect(loginName).toHaveAttribute('type', 'text');
  // });

  // test('Teste se a página contém um botão com título "Jogar"', () => {
  //   renderWithRouterAndRedux(<App />);

  //   const loginBtn = screen.getByRole('button', {name: /jogar/i});
  //   expect(loginBtn).toBeInTheDocument();
  //   expect(loginBtn).toHaveAttribute('type', 'button');
  //   expect(loginBtn.innerHTML).toBe('Jogar');
  // });

  // test('Passar dados válidos para testar se o botão "Entrar" fica habilitado', () => {
  //   renderWithRouterAndRedux(<App />);

  //   const loginEmail = screen.getByTestId(dataIdEmail);
  //   userEvent.type(loginEmail, dataEmail);
  //   expect(loginEmail).toHaveValue(dataEmail);

  //   const loginName = screen.getByTestId(dataIdName);
  //   userEvent.type(loginName, dataName);
  //   expect(loginName).toHaveValue(dataName);

  //   const loginBtn = screen.getByRole('button', {name: /jogar/i});
  //   expect(loginBtn).toBeEnabled();
  // });

  // test('Passar email inválido para testar se o botão "Entrar" fica habilitado', () => {
  //   renderWithRouterAndRedux(<App />);

  //   const loginEmail = screen.getByTestId(dataIdEmail);
  //   userEvent.type(loginEmail, 'test');
  //   expect(loginEmail).toHaveValue('test');

  //   const loginBtn = screen.getByRole('button', {name: /jogar/i});
  //   expect(loginBtn).not.toBeEnabled();
  // });

  // test('Passar nome inválido para testar se o botão "Entrar" fica habilitado', () => {
  //   renderWithRouterAndRedux(<App />);

  //   const loginName = screen.getByTestId(dataIdName);
  //   userEvent.type(loginName);
  //   expect(loginName.value).toBe('');

  //   const loginBtn = screen.getByRole('button', {name: /jogar/i});
  //   expect(loginBtn).not.toBeEnabled();
  // });

  // test('Passar dados válidos para testar se o token vai para o estado global', () => {
  //   const { store, history } = renderWithRouterAndRedux(
  //     <App />,
  //     { initialState: { player: { gravatarEmail: dataEmail } } },
  //   );

  //   const loginEmail = screen.getByTestId(dataIdEmail);
  //   userEvent.type(loginEmail, dataEmail);
  //   expect(loginEmail).toHaveValue(dataEmail);

  //   const loginPassword = screen.getByTestId(dataIdName);
  //   userEvent.type(loginPassword, dataName);
  //   expect(loginPassword).toHaveValue(dataName);

  //   const loginBtn = screen.getByRole('button', {name: /jogar/i});
  //   expect(loginBtn).toBeEnabled();
  //   userEvent.click(loginBtn);

  //   const estadoGlobal = store.getState();
  //   const { player: { gravatarEmail } } = estadoGlobal;

  //   expect(history.location.pathname).toBe('/game');

  //   expect(gravatarEmail).toBe(dataEmail);
  // });

  // test('Testar se o botão de settings redireciona para a pagina', () => {
  //   const { history } = renderWithRouterAndRedux(<App />);

  //   const inputSetting = screen.getByTestId('btn-settings');
  //   expect(inputSetting).toBeInTheDocument();
  //   userEvent.click(inputSetting);
  //   expect(history.location.pathname).toBe('/settings');
  // });
});
