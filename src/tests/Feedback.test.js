import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa o componente <Feedback />', () => {
  test('Testa se a mensagem "Could be better..." aparece na tela caso a pessoa acerte menos de 3 perguntas', () => {
    const INITIAL_STATE = {
      player: {
        name: 'alguém',
        assertions: 2,
        gravatarEmail: 'alguem@alguem.com',
        score: 173,
      }
    };

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');

    expect(history.location.pathname).toBe('/feedback')

    const couldBeBetterMessage = screen.getByTestId('feedback-text');
    expect(couldBeBetterMessage).toBeInTheDocument();

    expect(couldBeBetterMessage).toHaveTextContent(/Could be better.../i)
  });

  test('Testa se a mensagem "Well Done!" aparece na tela caso a pessoa acerte menos de 3 perguntas', () => {
    const INITIAL_STATE = {
      player: {
        name: 'alguém',
        assertions: 3,
        gravatarEmail: 'alguem@alguem.com',
        score: 173,
      }
    };

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');

    expect(history.location.pathname).toBe('/feedback')

    const couldBeBetterMessage = screen.getByTestId('feedback-text');
    expect(couldBeBetterMessage).toBeInTheDocument();

    expect(couldBeBetterMessage).toHaveTextContent(/Well Done!/i)
  });

  test('Testa se, ao clicar no botão "play again", o usuário é redirecionado para a rota "/"', () => {
    const INITIAL_STATE = {
      player: {
        name: 'alguém',
        assertions: 3,
        gravatarEmail: 'alguem@alguem.com',
        score: 173,
      }
    };

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');

   const playAgainButton = screen.getByTestId('btn-play-again');
   expect(playAgainButton).toBeInTheDocument();

   userEvent.click(playAgainButton);

   expect(history.location.pathname).toBe('/');
  });

  test('Testa se, ao clicar no botão "ranking", o usuário é redirecionado para a rota "/ranking"', () => {
    const INITIAL_STATE = {
      player: {
        name: 'alguém',
        assertions: 3,
        gravatarEmail: 'alguem@alguem.com',
        score: 173,
      }
    };

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');

   const rankingButton = screen.getByTestId('btn-ranking');
   expect(rankingButton).toBeInTheDocument();

   userEvent.click(rankingButton);

   expect(history.location.pathname).toBe('/ranking');
  });
});