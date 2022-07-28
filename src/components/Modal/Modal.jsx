import style from '../Modal/Modal.module.css';
import PropTypes from 'prop-types';

import { useEffect } from 'react';
export const Modal = ({ openModal, img }) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const onClick = evt => {
    if (evt.currentTarget === evt.target) {
      openModal(false);
    }
  };

  const onKeyDown = evt => {
    if (evt.code === 'Escape') {
      openModal(false);
    }
  };

  return (
    <div
      name="overlay"
      className={style.Overlay}
      id={'Overlay'}
      onClick={onClick}
    >
      <div className={style.Modal} id={'Modal'}>
        <img src={img} alt="img" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
