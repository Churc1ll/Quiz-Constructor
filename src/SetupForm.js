import React from 'react';
import { useGlobalContext } from './context';
import FAQ from './FAQ';

const SetupForm = () => {
  const { handleChange, handleSubmit, quiz, error, table, tableQuantity } =
    useGlobalContext();
  return (
    <main>
      <FAQ />
      <section className='quiz quiz-small'>
        <h4>quiz constructor</h4>
        <form className='setup-form'>
          <div className='form-control'>
            <label htmlFor='amount'>number of questions</label>
            <input
              className='form-input'
              type='number'
              name='amount'
              id='amount'
              value={quiz.amount}
              onChange={handleChange}
              min={1}
              max={50}
            />
          </div>

          <div className='form-control'>
            <label htmlFor='category'>category</label>
            <select
              name='category'
              id='category'
              className='form-input'
              value={quiz.category}
              onChange={handleChange}
            >
              {table.map((item) => {
                const { name, id } = item;
                return (
                  <option value={name} key={id}>
                    {name} -{' '}
                    {tableQuantity[id]
                      ? tableQuantity[id]['total_num_of_verified_questions']
                      : null}{' '}
                    questions
                  </option>
                );
              })}
            </select>
          </div>

          <div className='form-control'>
            <label htmlFor='difficulty'> difficulty</label>
            <select
              name='difficulty'
              id='difficulty'
              className='form-input'
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value=''>any</option>
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </select>
          </div>

          <div className='form-control'>
            <label htmlFor='types'>type</label>
            <select
              name='types'
              id='types'
              className='form-input'
              value={quiz.types}
              onChange={handleChange}
            >
              <option value=''>any</option>
              <option value='multiple'>multiple choice</option>
              <option value='boolean'>True / false</option>
            </select>
          </div>

          <div className='form-control'>
            <label htmlFor='difficulty'> timer </label>
            <select
              name='timer'
              id='timer'
              className='form-input'
              value={quiz.timer}
              onChange={handleChange}
            >
              <option value='60'>easy: 60 sec</option>
              <option value='30'>normal: 30 sec</option>
              <option value='15'>hard: 15 sec</option>
            </select>
          </div>

          {error && (
            <p className='error'>
              can't generate questions, please try defferent options
            </p>
          )}
          <div>
            <button className='openFAQ'>read FAQ</button>
            <button type='submit' className='submit-btn' onClick={handleSubmit}>
              start
            </button>
          </div>
        </form>
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>© Turner</p>
      </section>
    </main>
  );
};

export default SetupForm;
