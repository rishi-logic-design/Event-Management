const express = require('express');
const router = express.Router();
const { eventValidation } = require('../Middleware/EventValidation');
const { createEvent, getEvent, fetchFilteredEvents, findEventByName } = require('../Controllers/EventController');

router.post('/createEvent', eventValidation, createEvent);
router.get('/getEvent/:id', getEvent);
router.get('/fetchFilteredEvents', fetchFilteredEvents);
router.get('/findEventByName/:name', findEventByName);

module.exports = router;