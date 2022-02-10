import {
  SET_DATA,
  SET_TABLE,
  SET_QUATITY,
  SET_INDEX,
  SET_PLUS,
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_FAQ,
  CLOSE_FAQ,
  SET_ZERO,
  SET_TOKEN,
} from './actions';

import reducer from './reducer';
import React, {
  useState,
  useContext,
  useReducer,
  useEffect,
} from 'react';

const apiCategories = 'https://opentdb.com/api_category.php';
const apiQuantity = 'https://opentdb.com/api_count_global.php';
const apiToken = 'https://opentdb.com/api_token.php?command=request';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'General Knowledge',
    difficulty: '',
    timer: '60',
    types: '',
  });

  const initialState = {
    waiting: true,
    loading: false,
    questions: [],
    index: 0,
    correct: 0,
    error: false,
    isFAQ: false,
    isModalOpen: false,
    table: [],
    tableQuantity: {},
    token:'',
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { index, questions, correct, token, table, } = state;
  const { amount, category, difficulty, types, timer } = quiz;
  
  const fetchUrl = async (url, SET_METHOD) => {
    const response = await fetch(url);
    const data = await response.json();
    dispatch({
      type: SET_METHOD,
      payload: { data },
    });
  };

  const openModal = () => {
    dispatch({ type: OPEN_MODAL });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };
  
  const openFAQ = (e) => {
    e.preventDefault();
    dispatch({ type: OPEN_FAQ });
  };
  
  const closeFAQ = () => {
    dispatch({ type: CLOSE_FAQ });    
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  const search = (name) => {
    const found = table.find((category) => category.name === name);
    return found.id;
  };

  const handleSubmit = (e) => {
    const categoryNumber = search(category);
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryNumber}&difficulty=${difficulty}&type=${types}&token=${token}`;
    fetchUrl(url, SET_DATA);
    e.preventDefault();
  };

  const { question, incorrect_answers, correct_answer } = questions[index] || {
    incorrect_answers: [1, 2, 3],
  };
  let answers = [];
  if (questions) {
    answers = [...incorrect_answers];
  }
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  const checkAnswer = (value, e) => {
    let btnClasses = e.target.classList;
    let rightBtnClasses;
    btnClasses.add('unknown-answer');
    const goRed = () => {
      btnClasses.remove('unknown-answer');
      btnClasses.remove('correct-answer');
      btnClasses.add('wrong-answer');
    };
    const goGreen = () => {
      btnClasses.remove('wrong-answer');
      btnClasses.remove('unknown-answer');
      btnClasses.add('correct-answer');
    };
    if (!value) {
      setTimeout(goRed, 1000);
      let whatIsCorrectNode = document.querySelectorAll('.answer-btn');
      let whatIsCorrectList = [...whatIsCorrectNode];
      let whatIsCorrect =
        whatIsCorrectList.filter((btn) => btn.innerHTML == correct_answer)[0] ||
        0;
      if (whatIsCorrect.classList) rightBtnClasses = whatIsCorrect.classList;
      
      const goRandom = () => {
        if (rightBtnClasses) {
          rightBtnClasses.remove('unknown-answer');
          rightBtnClasses.remove('wrong-answer');
          rightBtnClasses.add('correct-answer');
        }
      };
      setTimeout(goRandom, 1000);
    } else {
      setTimeout(goGreen, 1000);
    }
    document.querySelectorAll('button').forEach((answer) => {
      answer.removeEventListener('click', event);
    });

    const goNext = () => {
      btnClasses.remove('wrong-answer');
      btnClasses.remove('correct-answer');
      if (rightBtnClasses) rightBtnClasses.remove('correct-answer');
      nextQuestion(value);
    };
    setTimeout(goNext, 1700);
  };

  const score = () => {
    return ((correct / questions.length) * 100).toFixed(0);
  };

  const nextQuestion = (value) => {
    if (value) {
      dispatch({
        type: SET_PLUS,
        payload: { oldCorrect: correct },
      });
    }
    dispatch({ type: SET_INDEX, payload: { oldIndex: index } });
    if (index > questions.length - 2) {
      openModal();
      score();

      dispatch({ type: SET_ZERO });
    } else {
      return index;
    }
  };

  const goModal = () => {
    dispatch({ type: OPEN_MODAL });
    dispatch({ type: SET_ZERO });
  };

  const event = (e) => checkAnswer(e.target.innerHTML === correct_answer, e);
  
  // share
  const url = window.document.location.href;
  const eventShare = async () => {
    try {
      await navigator.share({ url: url });
    } catch (error) {
      console.log('error' + error);
    }
  };

  // useEffects
  useEffect(() => {
    fetchUrl(apiCategories, SET_TABLE);
    fetchUrl(apiQuantity, SET_QUATITY);
    fetchUrl(apiToken, SET_TOKEN);
  }, []);

useEffect(() => {
  document.querySelectorAll('.answer-btn').forEach((answer) => {
    answer.addEventListener('click', event, {
      once: true,
    });
  });
}, [nextQuestion]);

  useEffect(() => {
    if (document.querySelector('.share')) {
      const btn = document.querySelector('.share');
      btn.addEventListener('click', eventShare);
    }
    document.querySelector('.openFAQ') &&
      document.querySelector('.openFAQ').addEventListener('click', openFAQ);
  }, [openModal]);

  //timer
  useEffect(() => {
    const start = Date.now();
    const time = () => {
      if (document.querySelector('.timer'))
        document.querySelector('.timer').innerHTML =
          '<span class="stopwatch">time has out, random answer is chosen</span> seconds left';
      let delta = Date.now() - start;
      if (document.querySelector('.stopwatch')) {
        let stopwatchHolder = document.querySelector('.stopwatch');
        let time = Number(timer) - Math.floor(delta / 1000);
        stopwatchHolder.textContent = time;
        if (time < 15) {
          document.querySelector('.timer').classList.add('red');
        }
        if (time === 0) {
          clearInterval(interval);
          stopwatchHolder.textContent = 'time has out, random answer is chosen';
          document.querySelector('.timer').innerHTML =
            '<span class="stopwatch">time has out, random answer is chosen</span>';
          let buttons = document.querySelectorAll('.answer-btn');
          let index 
          index = Math.floor(Math.random() * 2); 
          // else  index = Math.floor(Math.random() * 4);
          let e = { target: buttons[index] };
          checkAnswer(e.target.innerHTML === correct_answer, e);
        }
      }
    };
    let interval = setInterval(time, 1000);
    return () => {
      clearInterval(interval);
      if (document.querySelector('.timer')) {
        document.querySelector('.timer').classList.remove('red');
      }
    };
  });

  return (
    <AppContext.Provider
      value={{
        ...state,
        quiz,
        score,
        nextQuestion,
        checkAnswer,
        closeModal,
        openFAQ,
        closeFAQ,
        handleChange,
        handleSubmit,
        answers,
        incorrect_answers,
        question,
        goModal,
        timer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
