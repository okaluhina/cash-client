/* eslint-disable*/
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import history from 'store/history';
import CatImg from 'assets/background-images/cats_sneeze.jpg';
import styles from './style.module.css';

const MainPage = ({ loadInfo, info }) => {
  useEffect(() => {
    loadInfo();
  }, [loadInfo]);

  return (
    <div>
      <img src={CatImg} className={styles.cat} />
      {info.length > 0
        ? info.map(i => (
            <div key={i.name}>
              <div>{i.name}</div>
              <div>{i.count}</div>
            </div>
          ))
        : 'no info'}

      <button onClick={() => history.push('/second')}> go on second page</button>
    </div>
  );
};

MainPage.propTypes = {
  loadInfo: PropTypes.func.isRequired,
  info: PropTypes.array.isRequired,
};

MainPage.defaultProps = {};

export default MainPage;
