import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = ({ profile }) => {
  return (
    <div className="col-12">
      <div className="card" style={{ position: 'relative', maxWidth: '800px', margin: '.5rem auto' }}>
        <div
          className="d-sm-none"
          style={{
            background: `url(${profile.picture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            width: '150px',
            height: '150px',
            margin: '0 auto',
            borderRadius: '100%',
          }}
        />
        <div className="card-body">
          <div className="row">
            <div className="col-xs-12 col-sm-9">
              <Link className="h4 px-0 card-title" to={`/tutor/${profile.uid}`}>
                {profile.displayName}
              </Link>
              <h6 className="text-success">{profile.accountType}</h6>
              <div>
                <strong>Address: </strong>
                {profile.address}
              </div>
              <div>
                <strong>Contact: </strong>
                {profile.contact}
              </div>
              <div>
                <strong>Subjects: </strong>
                {profile.subjects.map((subject, i) => (
                  <span
                    className="badge badge-pill badge-primary px-2 py-1 mr-2 mb-2"
                    key={i}
                  >
                    <span>{subject}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="col-3">
              <div
                className="d-none d-sm-block"
                style={{
                  background: `url(${profile.picture})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  width: '150px',
                  height: '150px',
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                  top: '50%',
                  right: '-70px',
                  borderRadius: '100%',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
