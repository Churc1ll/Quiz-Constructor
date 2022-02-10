import React from 'react';
import { useGlobalContext } from './context';
import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';

function App() {
  const {
    timer,
    goModal,
    question,
    answers,
    waiting,
    index,
    correct,
    loading,
    questions,
  } = useGlobalContext();

  if (waiting) {
    return <SetupForm />
  }
  if (loading) {
    return <Loading />;
  }
  if (questions.length) { 
    return (
      <main>
        <Modal />
        <section className='quiz'>
          <article className='container'>
            <h4 dangerouslySetInnerHTML={{ __html: question }} />
            <div className='btn-container'>
              {answers.map((answer, index) => {
                if (answer) return (
                  <button
                    key={index}
                    className='answer-btn'
                    dangerouslySetInnerHTML={{ __html: answer }}
                  />
                );
                return null
              })}
            </div>
          </article>
          <button className='next-question' onClick={goModal}>
            go to results
          </button>
          <p className={`timer`}>
            <span className='stopwatch'>{timer}</span> seconds left
          </p>
          <p className='correct-answers'>
            correct answers: {correct}/{index}
          </p>  
        </section>
      </main>
    );
  } else {
    return <Loading />;
  }
}

export default App;
