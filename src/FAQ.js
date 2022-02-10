import React from 'react';
import { useGlobalContext } from './context';
const FAQ = () => {
  const {closeFAQ, isFAQ} = useGlobalContext();
  return (
    <div className={`${isFAQ ? 'FAQ-container isOpen' : 'FAQ-container'}`}>
      <section>
        <div className='modal-content FAQ'>
          <h3>Frequently asked questions</h3>
          <p>
            Quiz Constructor can be started with default settings. But vast variety of
            settings offer much more fun! Check them out:
          </p>
          <ul>
            <li>
              <i>Number of questions: </i>
              the bigger number the longer would be your quiz journey :)
            </li>
            <li>
              <i>Category: </i>the topic of quiz. You can choose only one topic
              during the game session. Topics have info about its total amount of questions. 
            </li>
            <li>
              <i>Difficulty: </i>Degree of questions' Frequently asked questions
            </li>
            <li>
              <i>Type: </i> You free to play Multiple choice mode or choose True\False mode. By default, these two modes are mixed up 
            </li>
            <li>
              <i>Timer: </i>amount of time you have before a random answer will
              be chosen. So in difficult situations you allowed to check you
              luck :D
            </li>
          </ul>
          <button className='submit-btn' onClick={closeFAQ}>
            Got it!
          </button>
        </div>
      </section>
    </div>
  );
  };
export default FAQ;