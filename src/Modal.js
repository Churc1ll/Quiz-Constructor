import React from 'react';
import { useGlobalContext } from './context';
const Modal = () => {
  const { isModalOpen, closeModal, score } = useGlobalContext();
  const numb = score();
  return (
    <div
      className={`${
        isModalOpen ? 'modal-container isOpen' : 'modal-container'
      }`}
    > 
      <div className='modal-content'>
        
        {numb < 30 ? <h2>not so easy, huh?</h2> : null}
        {numb > 30 && numb < 60 ? <h2>Sweet! </h2> : null}
        {numb > 60 ? <h2>congratz</h2> : null}
        <p>you answered {numb} % of questions correctly</p>
        <button className='close-btn' onClick={closeModal}>
          play again
        </button>
        <button className='share'>share</button>
        {numb < 30 ? (
          <img
            className='img-better'
            src={require('./images/better.gif')}
            alt='better'
            width='205px'
          />
        ) : null}
        {numb > 30 && numb < 60 ? (
          <img
            className='img-good'
            src={require('./images/good.gif')}
            alt='good'
            width='205px'
          />
        ) : null}
        {numb > 60 ? (
          <img src={require('./images/nice.gif')} alt='nice' /> 
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
