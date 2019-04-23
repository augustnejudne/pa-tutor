import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions.js';

const Search = props => {
  const [radioChoice, setRadioChoice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (props.profile.data.accountType === 'tutor') {
      setRadioChoice('students');
    }
  }, [props.profile.data]);

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery !== '') {
      props.search(radioChoice, searchQuery);
    }
  };

  return (
    <Fragment>
      <h4>Search {radioChoice}</h4>
      <form onSubmit={e => handleSubmit(e)}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchQuery || ''}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
        <br/>
        <div className="input-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="tutors"
              id="tutors"
              value="tutors"
              checked={radioChoice === 'tutors'}
              onChange={() => setRadioChoice('tutors')}
            />
            <label className="form-check-label" htmlFor="tutors">
              Tutors&nbsp;
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="students"
              id="students"
              value="students"
              checked={radioChoice === 'students'}
              onChange={() => setRadioChoice('students')}
            />
            <label className="form-check-label" htmlFor="students">
              Students&nbsp;
            </label>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = ({ profile }) => {
  return {
    profile,
  };
};

export default connect(
  mapStateToProps,
  actions
)(Search);
