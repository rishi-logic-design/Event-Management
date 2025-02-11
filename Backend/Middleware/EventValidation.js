const { body, validationResult } = require('express-validator');

const eventValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('date').isISO8601().withMessage('Date must be a valid date'),
    body('category')
        .notEmpty().withMessage('Category is required')
        .isIn(['Conference', 'Workshop', 'Seminar', 'Meetup', 'Music', 'Lecture', 'Symposium'])
        .withMessage('Category must be one of the following: Conference, Workshop, Seminar, Meetup, Music, Lecture, Symposium'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { eventValidation };