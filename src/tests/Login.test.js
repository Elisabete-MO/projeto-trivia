import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Teste a página <Login.js />', () => {
  const dataIdName = 'input-player-name';
  const dataIdEmail = 'input-gravatar-email';
  const dataEmail = 'test@mail.com';
  const dataName = 'Rolando Penha';

  test('Teste se a página contém um campo do tipo "email" para inserir o email', () => {
    renderWithRouterAndRedux(<App />);
    const loginEmail = screen.getByTestId(dataIdEmail);

    expect(loginEmail).toBeInTheDocument();
    expect(loginEmail).toHaveAttribute('type', 'email');
  });

  test('Teste se a página contém um campo do tipo "text" para inserir o nome', () => {
    renderWithRouterAndRedux(<App />);
    const loginName = screen.getByTestId(dataIdName);

    expect(loginName).toBeInTheDocument();
    expect(loginName).toHaveAttribute('type', 'text');
  });

  test('Teste se a página contém um botão com título "Jogar"', () => {
    renderWithRouterAndRedux(<App />);

    const loginBtn = screen.getByRole('button', { name: /jogar/i });
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toHaveAttribute('type', 'button');
    expect(loginBtn.innerHTML).toBe('Jogar');
  });

  test('Passar dados válidos para testar se o botão "Entrar" fica habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const loginEmail = screen.getByTestId(dataIdEmail);
    userEvent.type(loginEmail, dataEmail);
    expect(loginEmail).toHaveValue(dataEmail);

    const loginName = screen.getByTestId(dataIdName);
    userEvent.type(loginName, dataName);
    expect(loginName).toHaveValue(dataName);

    const loginBtn = screen.getByRole('button', { name: /jogar/i });
    expect(loginBtn).toBeEnabled();
  });

  test('Passar email inválido para testar se o botão "Entrar" fica habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const loginEmail = screen.getByTestId(dataIdEmail);
    userEvent.type(loginEmail, 'test');
    expect(loginEmail).toHaveValue('test');

    const loginBtn = screen.getByRole('button', { name: /jogar/i });
    expect(loginBtn).not.toBeEnabled();
  });

  test('Passar nome inválido para testar se o botão "Entrar" fica habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const loginName = screen.getByTestId(dataIdName);
    userEvent.type(loginName);
    expect(loginName.value).toBe('');

    const loginBtn = screen.getByRole('button', { name: /jogar/i });
    expect(loginBtn).not.toBeEnabled();
  });

  test('Passar dados válidos para testar se o token vai para o estado global', () => {
    const { store, history } = renderWithRouterAndRedux(
      <App />,
      { initialState: { player: { gravatarEmail: dataEmail } } },
    );

    const loginEmail = screen.getByTestId(dataIdEmail);
    userEvent.type(loginEmail, dataEmail);
    expect(loginEmail).toHaveValue(dataEmail);

    const loginName = screen.getByTestId(dataIdName);
    userEvent.type(loginName, dataName);
    expect(loginName).toHaveValue(dataName);

    const loginBtn = screen.getByRole('button', { name: /jogar/i });
    expect(loginBtn).toBeEnabled();
    userEvent.click(loginBtn);

    const estadoGlobal = store.getState();
    const { player: { gravatarEmail } } = estadoGlobal;

    expect(history.location.pathname).toBe('/game');

    expect(gravatarEmail).toBe(dataEmail);
  });

  test('Testar se o botão de settings redireciona para a pagina', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputSetting = screen.getByTestId('btn-settings');
    expect(inputSetting).toBeInTheDocument();
    userEvent.click(inputSetting);
    expect(history.location.pathname).toBe('/settings');
  });
});
