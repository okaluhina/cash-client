import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import history from 'store/history'

import styles from './style.module.css';

const SecondPage = ({ loadSecond, saveSecond, second }) => {
  const [secondText, setSecondText] = useState('')

  useEffect(() => {
    loadSecond();
  }, [loadSecond]);

  return (
    <div className={styles.wrapper}>
     <label>we got info from second api</label>
     <p>{second ? second : 'no info'}</p>
     <input value={secondText} onChange={e => setSecondText(e.currentTarget.value)} />
     <button type='button' onClick={() => saveSecond(secondText)}>save</button>
     
     <br />
    <button onClick={() => history.push('/')}>go to main</button>
    </div>
  );
};

SecondPage.propTypes = {
  loadSecond: PropTypes.func.isRequired,
  saveSecond: PropTypes.func.isRequired,
  second: PropTypes.string 
};

SecondPage.defaultProps = {
  second: ''
};

export default SecondPage;
