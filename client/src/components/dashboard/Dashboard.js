import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions.js';
import Layout from '../Layout/Layout.js';
import Search from './Search.js';
import ProfileCard from './ProfileCard.js';

const TutorDashboard = props => {
  useEffect(() => {
    if (!props.profile.data.uid) {
      props.setProfile(props.user.uid);
    }
    return;
  }, []);

  // render methods
  const renderSubjectsList = () => {
    return (
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {props.profile.data.subjects
          ? props.profile.data.subjects.map((subject, i) => {
              return (
                <li
                  className="badge badge-pill badge-primary px-3 py-2 mr-2 mb-2"
                  key={i}
                >
                  <span style={{fontSize: '1rem'}}>{subject}</span>
                </li>
              );
            })
          : null}
      </ul>
    );
  };

  // RENDER
  return (
    <Layout>
      <div className="container">
        <div className="row mt-4">
          {props.profile.isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status" />
            </div>
          ) : null}
          <div className="col-sm-4 col-lg-3 order-sm-2 d-flex justify-content-center">
            <div
              style={{
                width: '150px',
                height: '150px',
                backgroundImage: `url(${props.profile.data.picture})`,
                backgroundSize: 'cover',
                borderRadius: '100%',
                border: '2px solid #ddd',
              }}
            />
          </div>
          <div className="col-sm-8 col-lg-9 order-sm-1">
            <h2>
              {props.profile.data.displayName}
              <span className="h4 pl-2 text-success">
                {props.profile.data.accountType}
              </span>
            </h2>
            <table>
              <tbody>
                <tr>
                  <td>Address:</td>
                  <td>{props.profile.data.address}</td>
                </tr>
                <tr>
                  <td>Contact:</td>
                  <td>{props.profile.data.contact}</td>
                </tr>
                <tr>
                  <td>Subjects</td>
                  <td>{renderSubjectsList()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12">
            <Search />
          </div>
        </div>
        <div className="row">
          {props.searchResults.data
            ? props.searchResults.data.map((result, i) => (
                <ProfileCard profile={result} key={i} />
              ))
            : null}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = ({ profile, searchResults }) => {
  return {
    profile,
    searchResults,
  };
};

export default connect(
  mapStateToProps,
  actions
)(TutorDashboard);
