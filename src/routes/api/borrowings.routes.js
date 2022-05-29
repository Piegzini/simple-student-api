const express = require('express');
const router = express.Router();
const borrowingsController = require('../../controlers/api/borrowings.controller');
const passport = require('passport');

router
    .use(passport.authenticate('jwt', { session: false }))
    .get('/:id?', async (req, res) => {
        const { id } = req.params;
        const queryParams = { ...req.query };

        const response = await borrowingsController.get(id, queryParams);
        res.status(response.status).send(response);
    })
    .post('/', async (req, res) => {
        const borrowing = { ...req.body };
        const response = await borrowingsController.create(borrowing);
        res.status(response.status).send(response);
    })

    .put('/:id', async (req, res) => {
        const { id } = req.params;
        const borrowing = { ...req.body };
        const response = await borrowingsController.update(id, borrowing);
        res.status(response.status).send(response);
    })
    .delete('/:id', async (req, res) => {
        const { id } = req.params;
        const response = await borrowingsController.delete(id);
        res.status(response.status).send(response);
    });

module.exports = router;
