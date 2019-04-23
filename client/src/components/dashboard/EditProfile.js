import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions.js';
import Layout from '../Layout/Layout.js';

const EditProfile = props => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [subjects, setSubjects] = useState('');
  const [bio, setBio] = useState('');
  const [picture, setPicture] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    props.setProfile(props.user.uid);
    setSuccess(false);
    return;
  }, []);

  useEffect(() => {
    setName(props.profile.data.displayName);
    setAddress(props.profile.data.address);
    setContact(props.profile.data.contact);
    setBio(props.profile.data.bio);
    if (props.profile.data.subjects) {
      setSubjects(props.profile.data.subjects.join(', '));
    }

    if (props.profile.updated) {
      setSuccess(true);
    }
    return;
  }, [props.profile.data]);

  // useEffect(() => {
  //   return;
  // }, [props.updateProfile]);

  const handleSubmit = e => {
    e.preventDefault();
    const subjectsArray = subjects.toLowerCase().split(', ');
    const subjectsArrayTrimmed = subjectsArray.map(subject => subject.trim());

    const valuesToSubmit = {
      displayName: name,
      address,
      contact,
      subjects: subjectsArrayTrimmed,
      bio,
    };
    props.updateProfile(props.profile.data.uid, valuesToSubmit);
  };

  const handleUploadPicture = e => {
    e.preventDefault();
    const pictureFile = new FormData();
    pictureFile.append('file', picture);
    if (picture) {
      props.uploadPicture(props.profile.data.uid, pictureFile);
    }
  };

  return (
    <Layout>
      {props.profile.isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : null}
      <div className="container">
        <h1>Edit Profile</h1>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center pb-4">
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

            <form onSubmit={e => handleSubmit(e)}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <button
                    className="btn btn-primary"
                    onClick={e => handleUploadPicture(e)}
                  >
                    Upload
                  </button>
                </div>
                <div className="custom-file">
                  <input
                    className="custom-file-input"
                    id="pictureUploadInput"
                    type="file"
                    name="myImage"
                    onChange={e => setPicture(e.target.files[0])}
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="pictureUploadInput"
                  >
                    Choose file
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your name"
                  value={name || ''}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your address"
                  value={address || ''}
                  onChange={e => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your contact number"
                  value={contact || ''}
                  onChange={e => setContact(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Subjects:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Comma separated list of subjects (ex: Math, English, History)"
                  value={subjects || ''}
                  onChange={e => setSubjects(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Bio:</label>
                <textarea
                  className="form-control"
                  id=""
                  cols="30"
                  rows="10"
                  value={bio || ''}
                  onChange={e => setBio(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Save
              </button>
              {success ? (
                <p className="bg-success text-white py-2 text-center">
                  Profile saved successfully
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </Layout>
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
)(EditProfile);
