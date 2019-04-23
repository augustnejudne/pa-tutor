import React, { Fragment, useEffect } from 'react';
import Layout from '../Layout/Layout.js';
import * as actions from '../../store/actions.js';
import { connect } from 'react-redux';

const UserProfile = props => {
  console.log(props.match.params.uid);

  useEffect(() => {
    props.getUserProfile(props.match.params.uid);
    return;
  }, []);

  const renderSubjectsList = () => {
    return (
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {props.userProfile.data.subjects
          ? props.userProfile.data.subjects.map((subject, i) => {
              return (
                <li
                  className="badge badge-pill badge-primary px-2 py-1 mr-2 mb-2"
                  key={i}
                >
                  <span>{subject}</span>
                </li>
              );
            })
          : null}
      </ul>
    );
  };

  return (
    <Fragment>
      <Layout>
        <div className="container">
          <div className="row mt-4">
            <div className="col-sm-4 order-sm-2 d-flex justify-content-center">
              <div
                style={{
                  width: '150px',
                  height: '150px',
                  backgroundImage: `url(${props.userProfile.data.picture})`,
                  backgroundSize: 'cover',
                  borderRadius: '100%',
                  border: '2px solid #ddd',
                }}
              />
            </div>
            <div className="col-sm-8 order-sm-1">
              <h2>
                {props.userProfile.data.displayName}
                <span className="h4 pl-2 text-success">
                  {props.userProfile.data.accountType}
                </span>
              </h2>
              <table>
                <tbody>
                  <tr>
                    <td>Address:</td>
                    <td>{props.userProfile.data.address}</td>
                  </tr>
                  <tr>
                    <td>Contact:</td>
                    <td>{props.userProfile.data.contact}</td>
                  </tr>
                  <tr>
                    <td>Subjects</td>
                    <td>{renderSubjectsList()}</td>
                  </tr>
                  <tr>
                    <td>Bio:</td>
                    <td>
                      <p style={{ whiteSpace: 'pre-line' }}>
                        "{props.userProfile.data.bio}"
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

const mapStateToProps = ({ userProfile }) => {
  return {
    userProfile,
  };
};

export default connect(
  mapStateToProps,
  actions
)(UserProfile);
