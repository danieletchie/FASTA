const router = require('express').Router();
const User = require('../models/index.js');
const bcrypt = require('../helpers/bcrypt');


//  CREATE A NEW USER AND ADD TO DATABASE
router.post('/', async (req, res) => {
  // console.log(req.body);
  // eslint-disable-next-line consistent-return
  await User.findOne({ email: req.body.email }).then((result) => {
    if (result) {
      return res.status(403).json({ response: 'email exists' });
    }
  });
  try {
    const {
      fullname, email, phonenumber, password, confirmPassword
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(403).json({ response: 'confirmpassword and password doesn\'t match' });
    }
    const hash = await bcrypt.hashPassword(confirmPassword);
    await User.create({
      fullname, email, phonenumber, password: hash
    });
    return res.status(200).json({ response: 'Signup succesfully' });
  } catch (error) {
    return res.status(500).json({ response: error.message });
  }
});

//  GET ALL USERS FROM DATABASE
router.get('/', (req, res) => {
  User.find().then(
    (allUsers) => {
      console.log('Getting all users!');
      res.status(200).json(allUsers.reverse());
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error
      });
    }
  );
});

//  GET A SPECIFIC USER BY ID) FROM DATABASE
router.get('/:id', (req, res) => {
  const { id } = req.params;

  User.findOne({
    _id: id
  }).then(
    (thisUser) => {
      //   console.log('Getting specific user by ID!');
      res.status(200).json(thisUser);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error
      });
    }
  );
});

module.exports = router;
