import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { response } from './helpers/mocks';
import App from '../App';

const timeOut = 30000;
jest.setTimeout(timeOut);

describe('Teste a página <Game.js />', () => {
  const dataLoginEmail = 'input-gravatar-email';
  const dataLoginName = 'input-player-name';
  const dataIdName = 'header-player-name';
  const dataIdScore = 'header-score';
  const dataIdPicture = 'header-profile-picture';
  const dataEmail = 'test@mail.com';
  const dataName = 'Test';
  const numberButtons = 3;

  test(
    'Se a página contém um header com as informações da pessoa jogadora',
    () => {
      const INITIAL_STATE = {
        player: {
          name: dataName,
          gravatarEmail: dataEmail,
          score: 0,
        },
      };
      const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

      expect(history.location.pathname).toBe('/game');

      const gameHeaderPicture = screen.getByTestId(dataIdPicture);
      expect(gameHeaderPicture).toHaveAttribute('src');
      expect(gameHeaderPicture).toBeInTheDocument();

      const gameHeaderName = screen.getByTestId(dataIdName);
      expect(gameHeaderName).toBeInTheDocument();
      expect(gameHeaderName.innerHTML).toBe(dataName);
    },
  );

  test('Se a página contém um header com a pontuação zerada', () => {
    const INITIAL_STATE = {
      player: {
        name: dataName,
        gravatarEmail: dataEmail,
        score: 0,
      },
    };
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    expect(history.location.pathname).toBe('/game');

    const gameHeaderScore = screen.getByTestId(dataIdScore);
    expect(gameHeaderScore).toBeInTheDocument();
    expect(gameHeaderScore.innerHTML).toStrictEqual('0');
  });

  test(
    'Se o token inválido é excluído e a aplicação é redirecionada',
    async () => {
      const INITIAL_STATE = {
        player: {
          name: dataName,
          gravatarEmail: dataEmail,
          score: 0,
        },
      };
      const invToken = {
        response_code: 3,
        results: [],
      };

      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(invToken),
      });

      const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(invToken),
      });

      await act(async () => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(history.location.pathname).toBe('/game');
      });

      waitFor(() => {
        expect(history.location.pathname).toBe('/');
      });
    },
  );

  test(
    'Se ao clickar no botão "Jogar" e a aplicação é redirecionada para "/game"',
    async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(response),
      });

      const { history } = renderWithRouterAndRedux(<App />);
      const loginEmail = screen.getByTestId(dataLoginEmail);
      userEvent.type(loginEmail, dataEmail);
      const loginName = screen.getByTestId(dataLoginName);
      userEvent.type(loginName, dataName);
      const loginBtn = screen.getByRole('button', { name: /jogar/i });
      userEvent.click(loginBtn);

      waitFor(() => {
        expect(history.location.pathname).toBe('/game');
      });
    },
  );

  test('Se a categoria da pergunta está presente', async () => {
    const INITIAL_STATE = {
      player: {
        name: dataName,
        gravatarEmail: dataEmail,
        score: 0,
      },
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    waitFor(() => {
      expect(history.location.pathname).toBe('/game');
    });
    const gameCategory = screen.findByText('Entertainment: Video Games');
    expect(await gameCategory).toBeInTheDocument();
  });

  test('Se os botoes de resposta estão presentes', async () => {
    const INITIAL_STATE = {
      player: {
        name: dataName,
        gravatarEmail: dataEmail,
        score: 0,
      },
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    waitFor(() => {
      expect(history.location.pathname).toBe('/game');
      const btnAnswer = screen.getByTestId('correct-answer');
      expect(btnAnswer).toBeInTheDocument();
      const btnWrong = document.getElementsByClassName('wrong');
      expect(btnWrong.length).toBe(numberButtons);
    });
  });

  test('Se os botoes de resposta apresentam as cores corretas', async () => {
    const INITIAL_STATE = {
      player: {
        name: dataName,
        gravatarEmail: dataEmail,
        score: 0,
      },
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    waitFor(() => {
      expect(history.location.pathname).toBe('/game');
      const btnAnswer = screen.getByTestId('correct-answer');
      userEvent.click(btnAnswer);
      expect(btnAnswer).toHaveStyle('border: 3px solid rgb(6, 240, 15);');
      const btnWrong = screen.getAllByTestId(/wrong-answer/i);
      expect(btnWrong[0]).toHaveStyle('border: 3px solid red;');
      expect(btnWrong).toHaveLength(numberButtons);
    });
  });

  test('Se os botoes de resposta ficam desabilitados após 30s', async () => {
    const INITIAL_STATE = {
      player: {
        name: dataName,
        gravatarEmail: dataEmail,
        score: 0,
        oldAssertions: 0,
        assertions: 0,
      },
    };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    waitFor(() => {
      expect(history.location.pathname).toBe('/game');
      const buttons = document.getElementsByClassName('wrong');
      expect(buttons[0]).toBeDisabled();
      expect(buttons[1]).toBeDisabled();
      expect(buttons[2]).toBeDisabled();
    });
  });
});
