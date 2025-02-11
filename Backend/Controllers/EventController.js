const eventModel = require('../Models/EventModel');

const createEvent = async (req, res) => {
    try {
        const { name, date, category } = req.body;
        const event = new eventModel({ name, date, category });
        await event.save();
        res.status(201).json({ message: 'Event created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await eventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const fetchFilteredEvents = async (req, res) => {
    try {
        const { name, date, category } = req.query;
        const filter = {};
        if (name) filter.name = name;
        if (date) filter.date = date;
        if (category) filter.category = category;

        const events = await eventModel.find(filter);
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const findEventByName = async (req, res) => {
    try {
        const { name } = req.params;
        const event = await eventModel.findOne({ name });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createEvent, getEvent, fetchFilteredEvents, findEventByName };