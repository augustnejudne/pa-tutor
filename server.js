const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const Schema = mongoose.Schema;
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// ======================
// DATABASE STUFF
// ======================
// connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log('connected to db'))
  .catch(e => console.log(e));

mongoose.set('useFindAndModify', false);
// models
const AccountSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: '',
  },
  contact: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  picture: {
    type: String,
    default: '',
  },
  subjects: [{ type: String }],
});

const Account = mongoose.model('account', AccountSchema);

// MULTER
// Set The Storage Engine
const storage = multer.diskStorage({
  // destination: path.join(__dirname, 'public/uploads/pictures'),
  destination: './public/uploads/pictures',
  filename: (req, file, cb) => {
    cb(null, req.params.uid + path.extname(file.originalname));
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('file');

// Check File Type
const checkFileType = (file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

// ROUTES

app.get('/', (req, res) => {
  res.send('patutor backend');
});

// upload picture
app.post('/upload/picture/:uid', (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.send(err).status(500);
    } else {
      const newFilePath = req.file.path.replace('server/public/', '');
      Account.findOneAndUpdate(
        { uid: req.params.uid },
        {
          $set: { picture: newFilePath },
        },
        { new: true }
      )
        .then(() => res.send(newFilePath))
        .catch(e => res.send(e));
    }
  });
});

// get all acounts
app.get('/api/accounts/all', (req, res) => {
  Account.find({})
    .then(accounts => res.send(accounts))
    .catch(e => res.send(e));
});

// find tutors
app.get('/api/accounts/tutors', (req, res) => {
  if (req.query.subjects) {
    const queries = req.query.subjects.split(', ');
    Account.find({
      $and: [{ accountType: 'tutor' }, { subjects: { $all: queries } }],
    })
      .then(tutors => res.send(tutors))
      .catch(e => res.send(e));
  } else {
    Account.find({ accountType: 'tutor' })
      .then(tutors => res.send(tutors))
      .catch(e => res.send(e));
  }
});

// find students
app.get('/api/accounts/students', (req, res) => {
  if (req.query.subjects) {
    const queries = req.query.subjects.split(', ');
    Account.find({
      $and: [{ accountType: 'student' }, { subjects: { $all: queries } }],
    })
      .then(students => res.send(students))
      .catch(e => res.send(e));
  } else {
    Account.find({ accountType: 'student' })
      .then(students => res.send(students))
      .catch(e => res.send(e));
  }
});

// add new account
app.post('/api/accounts/add', (req, res) => {
  Account.create(req.body)
    .then(account => res.send(account))
    .catch(e => res.send(e));
});

// update profile
app.put('/api/accounts/:uid', (req, res) => {
  Account.findOneAndUpdate(
    { uid: req.params.uid },
    {
      $set: req.body,
    },
    { new: true }
  )
    .then(account => res.send(account))
    .catch(e => res.send(e));
});

//delete individual todo
app.delete('/api/account/:id', (req, res) => {
  Account.findOneAndDelete({ _id: req.params.id }).catch(e => res.send(e));
});

// find account by id
app.get('/api/accounts/:uid', (req, res) => {
  Account.find({ uid: req.params.uid })
    .then(account => res.send(account))
    .catch(e => res.send(e));
});

// PORT LISTEN
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Running on PORT: ${PORT}`);
});
