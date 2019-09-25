const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const errorWrapper = require('../handlers/errorWrapper');
const userDB = require('./users-model');
const generateToken = require('../auth/generateToken');
const authUser = require('../auth/authUser');

router.route('/')
  .get(errorWrapper(async (req, res) => {
    let users = await userDB.find();
    users.forEach(u => delete u.password);
    if(users) res.status(200).json(users);
    else res.status(404).json({ message: 'Could not retrieve users' });
  }));


// user id returns 0
router.route('/register')
  .post(errorWrapper(async (req, res) => {
    let user = req.body;
    if(user && user.email && user.password && user.first_name) {
      user.password = await bcrypt.hash(user.password, 8);
      let [success] = await userDB.insert(user);
      if(success === -1) res.status(400).json({ message: 'That email is already taken' });
      else if(!success) res.status(400).json({ message: 'Could not register that account' });
      else {
        let storedUser = await userDB.findByEmail(user.email);
        if(!storedUser) res.status(400).json({ message: 'User was not saved properly' });
        else {
          let token = generateToken(storedUser);
          res.status(201).json({ user_id: success, token, message: 'User saved, token is used to authenticate' });
        }
      }
    } else {
      res.status(400).json({ message: 'You must supply a user with username, password, and first_name' });
    }
  }));

router.route('/login')
  .post(errorWrapper(async (req, res) => {
    let credentials = req.body;
    if(credentials && credentials.email && credentials.password) {
      let storedUser = await userDB.findByEmail(credentials.email);
      if(storedUser && await bcrypt.compare(credentials.password, storedUser.password)) {
        let token = generateToken(storedUser);
        res.status(200).json({ token, user_id: storedUser.id });
      } else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(400).json({ message: 'You must supply an email and password' });
    }
  }));

router.route('/:id')
  .get(errorWrapper(async (req, res) => {
    let id = req.params.id;
    let [user] = await userDB.findByID(id);
    user.trips = await userDB.findTripsById(id);
    delete user.password;
    if(user) res.status(200).json(user);
    else res.status(404).json({ message: 'Could not find user' });
  }))
  .put(authUser, errorWrapper(async (req, res) => {
    let id = req.params.id;
    let updates = req.body;
    let [current] = await userDB.findByID(id);
    if(req.user_id !== current.id) res.status(400).json({ message: 'Permission denied' });
    else {
      if(updates.password) updates.password = await bcrypt.hash(updates.password, 8);
      let updated = await userDB.update(id, updates);
      if(updated) res.status(200).json({ message: 'User updated', user_id: id });
      else res.status(400).json({ message: 'Could not update user' });
    }
  }))
  .delete(authUser, errorWrapper(async (req, res) => {
    let id = req.params.id;
    let [current] = await userDB.findByID(id);
    if(req.user_id !== current.id) res.status(400).json({ message: 'Permission denied' });
    else {
      let deleted = await userDB.remove(id);
      if(deleted) res.status(200).json({ message: 'User deleted', user_id: id });
      else res.status(400).json({ message: 'Could not delete user' });
    }
  }));


module.exports = router;