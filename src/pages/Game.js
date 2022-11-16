import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { playerScore } from '../redux/actions';
import '../styles/game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      alternativas: [],
      selected: [],
      position: 0,
      value: 0.5,
      isDisabled: false,
      timer: 0,
      intervalId: 0,
      btnNext: false,
      ranking: [],
    };
  }

  componentDidMount() {
    this.getQuestion();
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    // ranking && this.setState({ ranking });
    if (ranking) {
      this.setState({ ranking });
    }
  }

  getQuestion = async () => {
    const token = localStorage.getItem('token');
    const apiQuestion = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await apiQuestion.json();
    const quest = response;

    this.setState(({ alternativas: quest }), () => this.checkToken());
  };

  checkToken = () => {
    const { alternativas } = this.state;
    if (alternativas.response_code !== 0) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.startTimeout();
      this.setSelectedQuestion();
    }
  };

  setSelectedQuestion = () => {
    const { value, alternativas, position } = this.state;
    const num = 5;

    if (position < num) {
      const selected = [alternativas.results[position]];
      const answerArray = [...selected[0].incorrect_answers, selected[0].correct_answer]
        .sort(() => Math.random() - value);

      this.setState(({
        selected,
        answerArray,
        btnNext: false,
      }));
    }
  // } else {
  //   this.setState({
  //     // btnNext: false,
  //   });
  };

  startTimeout = () => {
    this.setState({ timer: 30 });

    const DELAY = 1000;
    const timeoutId = setInterval(() => {
      const { timer, intervalId } = this.state;
      this.setState({ timer: timer - 1 });

      if (timer <= 1) {
        this.setState({ isDisabled: true });

        clearTimeout(intervalId);
      }
    }, DELAY);

    this.setState({ intervalId: timeoutId });
  };

  showCorrectAnswer = ({ target }) => {
    this.setScore(target);

    const correctButton = document.querySelector('.correct');
    correctButton.style.border = '3px solid rgb(6, 240, 15)';

    const wrongButtons = document.querySelectorAll('.wrong');

    wrongButtons.forEach((ele) => {
      ele.style.border = '3px solid red';
    });
    this.setState({ btnNext: true });
  };

  setScore = (target) => {
    const { intervalId, selected, timer } = this.state;
    const { dispatch, oldScore, oldAssertions } = this.props;
    clearTimeout(intervalId);
    let difficulty = 0;
    let assertions = 0;
    const selec = selected[0].difficulty;
    if (target.className === 'correct') {
      assertions = 1;
      if (selec === 'easy') {
        const num = 1;
        difficulty = num;
      } if (selec === 'medium') {
        const num = 2;
        difficulty = num;
      } if (selec === 'hard') {
        const num = 3;
        difficulty = num;
      }
    }

    const ten = 10;
    const score = (ten + (timer * difficulty));
    const total = {
      score: score + oldScore,
      assertions: assertions + oldAssertions,
    };
    if (target.className === 'correct') {
      dispatch(playerScore(total));
    }
  };

  handleClick = () => {
    const { position } = this.state;

    this.setState(
      ({ position: position + 1 }),
      this.setSelectedQuestion,
      this.startTimeout(),
    );
  };

  // this.setState({ age: value}, this.checkAge);
  // this.setState(({ position: position + 1}), setSelectedQuestion);

  render() {
    const { selected,
      isDisabled,
      timer, answerArray,
      btnNext,
      position,
      ranking,
    } = this.state;

    const { name, email, oldScore } = this.props;
    const num = 5;

    if (position === num) {
      const imgGravatar = `https://www.gravatar.com/avatar/${md5(email)}`;
      const playerRanking = { name, imgGravatar, score: oldScore };
      const rankingTotal = [...ranking, playerRanking];
      const sortRanking = rankingTotal.sort((a, b) => Number(b.score) - Number(a.score));
      const testRank = JSON.stringify(sortRanking);
      localStorage.setItem('ranking', testRank);
      return <Redirect to="/feedback" />;
    }

    return (
      <main>
        <div className="container_game">
          <Header />
        </div>
        <h1>Trybe</h1>
        <h2>Score: 0</h2>
        {selected.map((q, i) => (
          <div key={ i }>
            <p data-testid="question-category">{q.category}</p>
            <p data-testid="question-text">{q.question}</p>
            <div data-testid="answer-options">
              {answerArray.map((que, index) => (
                <button
                  key={ index }
                  type="button"
                  className={
                    que === q.correct_answer
                      ? 'correct'
                      : 'wrong'
                  }
                  data-testid={
                    que === q.correct_answer
                      ? 'correct-answer'
                      : `wrong-answer-${index}`
                  }
                  onClick={ this.showCorrectAnswer }
                  disabled={ isDisabled }
                >
                  {que}
                </button>))}
            </div>
          </div>
        ))}
        { btnNext && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleClick }
          >
            Next
          </button>
        )}
        <p id="counter">{timer}</p>
      </main>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  oldScore: player.score,
  oldAssertions: player.assertions,
  name: player.name,
  email: player.gravatarEmail,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  oldScore: PropTypes.number.isRequired,
  oldAssertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
