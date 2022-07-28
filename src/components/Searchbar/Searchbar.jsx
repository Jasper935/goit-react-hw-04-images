import PropTypes from 'prop-types';
import style from '../Searchbar/Searchbar.module.css';
import { useState } from 'react';
export const Searchbar = ({ getSearch, getFirstPage }) => {
  const [search, setSearch] = useState('');
  const onSubmit = evt => {
    evt.preventDefault();
    getSearch(search);
    getFirstPage();
    setSearch('');
  };

  const onInput = evt => {
    setSearch(evt.currentTarget.value);
  };

  return (
    <header className={style.Searchbar}>
      <form onSubmit={onSubmit} className={style.SearchForm}>
        <button type="submit" className={style.SearchFormButton}>
          <span className={style.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          name="search"
          value={search}
          className={style.SearchFormInput}
          onInput={onInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  getSearch: PropTypes.func.isRequired,
  getFirstPage: PropTypes.func.isRequired,
};
