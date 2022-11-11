import React from 'react';
import { screen } from '@testing-library/react';

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
});