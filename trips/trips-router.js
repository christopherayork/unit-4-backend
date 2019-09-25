const express = require('express');
const router = express.Router();
const errorWrapper = require('../handlers/errorWrapper');
const tripDB = require('./trips-model');
const authUser = require('../auth/authUser');

router.route('/')
  .get(errorWrapper(async (req, res) => {
    let trips = await tripDB.find();
    if(trips) res.status(200).json(trips);
    else res.status(404).json({ message: 'Could not retrieve trips' });
  }))
  .post(authUser, errorWrapper(async (req, res) => {
    let trip = req.body;
    let photos = trip.photos ? [...trip.photos] : null;
    console.log(req.user_id);
    trip = { user_id: req.user_id, location: trip.location, description: trip.description, short_desc: trip.short_desc };
    console.log(trip);
    if(!trip || !trip.location || !trip.description || !trip.user_id) res.status(400).json({ message: 'Could not post trip to that user' });
    else {
      let [posted] = await tripDB.insert(trip);
      console.log(posted);
      if(posted && Array.isArray(photos)) {
        photos = photos.map(p => ({...p, user_id: req.user_id}));
        console.log(photos);
        let photoPosted = await tripDB.insertPhotos(posted, photos);
        res.status(201).json({ message: 'Trip created', trip_id: posted, photos: photoPosted ? 'Photos posted' : 'Photos weren\'t posted' });
      }
      else if(posted) res.status(201).json({ message: 'Trip created', trip_id: posted });
      else res.status(400).json({ message: 'Could not post trip' });
    }
  }));

router.route('/:id')
  .get(errorWrapper(async (req, res) => {
    let id = req.params.id;
    let [trip] = await tripDB.findByID(id);
    let photos = await tripDB.getPhotos(id);
    if(trip) {
      trip.photos = photos;
      res.status(200).json(trip);
    }
    else res.status(404).json({ message: 'Could not find trip' });
  }))
  .put(authUser, errorWrapper(async (req, res) => {
    let id = req.params.id;
    let updates = req.body;
    if(!id || !updates) res.status(400).json({ message: 'No changes to make' });
    else {
      let [current] = await tripDB.findByID(id);
      if(req.user_id !== current.user_id) res.status(400).json({ message: 'Permission denied' });
      else {
        let updated = await tripDB.update(id, updates);
        if(updated) res.status(200).json({ message: 'Trip updated' });
        else res.status(400).json({ message: 'Trip could not be updated' });
      }
    }
  }))
  .delete(authUser, errorWrapper(async (req, res) => {
    let id = req.params.id;
    let [current] = await tripDB.findByID(id);
    if(req.user_id !== current.user_id) res.status(400).json({ message: 'Permission denied' });
    else {
      let deleted = await tripDB.remove(id);
      if(deleted) res.status(200).json({ message: 'Trip deleted' });
      else res.status(400).json({ message: 'Could not delete trip' });
    }
  }));

router.route('/photo/:id')
  .get(errorWrapper(async (req, res) => {
    let id = req.params.id;
    let photo = await tripDB.getPhoto(id);
    if(photo) res.status(200).json(photo);
    else res.status(404).json({ message: 'Could not find photo' });
  }))
  .put(authUser, errorWrapper(async (req, res) => {
    let id = req.params.id;
    let updates = req.body;
    let [current] = await tripDB.getPhoto(id);
    if(req.user_id !== current.user_id) res.status(400).json({ message: 'Permission denied' });
    else {
      if(updates.hasOwnProperty('user_id')) delete updates.user_id;
      if(updates.default) {
        let currentPhotos = await tripDB.getPhotos(current.trip_id);
        currentPhotos.forEach(p => {
          const forceSingleDefault = async () => {
            if(p.default) await tripDB.updatePhoto(p.id, { ...p, default: 0 });
          };
          forceSingleDefault();
        });
      }
      let updated = await tripDB.updatePhoto(id, updates);
      console.log(updated);
      if(updated) res.status(200).json({ message: 'Photo updated' });
      else res.status(400).json({ message: 'Could not update photo' });
    }
  }))
  .delete(authUser, errorWrapper(async (req, res) => {
    let id = req.params.id;
    let [current] = await tripDB.getPhoto(id);
    if(req.user_id !== current.user_id) res.status(400).json({ message: 'Permission denied' });
    else {
      let deleted = await tripDB.removePhoto(id);
      if(deleted) res.status(200).json({ message: 'Deleted photo' });
      else res.status(400).json({ message: 'Could not delete photo' });
    }
  }));

router.route('/:id/photos')
  .get(errorWrapper(async (req, res) => {
    let id = req.params.id;
    let photos = await tripDB.getPhotos(id);
    if(photos) res.status(200).json(photos);
    else res.status(404).json({ message: 'Could not retrieve photos' });
  }))
  .post(authUser, errorWrapper(async (req, res) => {
    // for posting photos to a trip
    // photos are expected to be in an array
    let id = req.params.id;
    let photos = req.body;
    if(!id || !photos || !Array.isArray(photos)) res.status(400).json({ message: 'Photos must be in an array' });
    let [{user_id}] = await tripDB.findByID(id);
    if(user_id && req.user_id === user_id) {
      photos = photos.map(p => ({...p, user_id}));
      let currentPhotos = await tripDB.getPhotos(id);
      let foundDefault = currentPhotos.filter(p => p.default);
      if(!foundDefault || !foundDefault.length) photos[0].default = true;
      let posted = await tripDB.insertPhotos(id, photos);
      if(posted) res.status(201).json({ message: 'Photos posted to trip' });
      else res.status(400).json({ message: 'Failed to post photos' });
    }
    else res.status(400).json({ message: 'Permission denied' });
  }))
  .delete(authUser, errorWrapper(async (req, res) => {
    let id = req.params.id;
    let [current] = await tripDB.getPhotos(id);
    if(req.user_id !== current.user_id) res.status(400).json({ message: 'Permission denied' });
    else {
      let deleted = await tripDB.removePhotos(id);
      if(deleted) res.status(200).json({ message: 'Deleted photos', count: Array.isArray(deleted) ? deleted[0] : deleted });
      else res.status(400).json({ message: 'Could not delete photos' });
    }
  }));




module.exports = router;