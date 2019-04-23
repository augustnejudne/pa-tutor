const faker = require('faker');
const Account = require('./server/server.js');

const generateRandomUser = () => {
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const getRandomSubjects = () => {
    const subjects = [
      'math',
      'science',
      'english',
      'art',
      'music',
      'algebra',
      'calculus',
      'trigonometry',
      'geometry',
      'writing',
      'grammar',
      'speech',
      'physics',
      'history',
      'biology',
    ];
    const selectedSubjects = [];

    const numberOfSubjects = getRandomInt(3, 8);

    for (let i = 0; i < numberOfSubjects; i++) {
      selectedSubjects.push(subjects[getRandomInt(0, subjects.length - 1)]);
    }
    return selectedSubjects;
  };

  const accountTypes = ['tutor', 'student'];

  const accountType = accountTypes[getRandomInt(0, 1)];
  const uid = faker.random.uuid();
  const displayName = faker.name.findName();
  const email = faker.internet.email();
  const address = faker.address.streetAddress() + ', ' + faker.address.city();
  const contact = faker.phone.phoneNumber();
  const bio = faker.lorem.paragraphs();
  const picture = faker.image.avatar();
  const subjects = getRandomSubjects();

  const newUser = {
    accountType,
    uid,
    displayName,
    email,
    address,
    contact,
    bio,
    picture,
    subjects,
  };

  return newUser;
};

for (let i=0;i < 100;i++) {
  Account.create(generateRandomUser());
}