const express = require('express');
const router = express.Router();
const borrowingsController = require('../controlers/borrowings.controller');

router
    .get('/:id?', async (req, res) => {
        const { id } = req.params;
        const responseInformation = await borrowingsController.get(id);
        res.status(responseInformation.statusCode).send(responseInformation);
    })
    .post('/', async (req, res) => {
        const borrowing = { ...req.body };
        const responseInformation = await borrowingsController.create(
            borrowing
        );
        res.status(responseInformation.statusCode).send(responseInformation);
    })

    .put('/:id', async (req, res) => {
        const { id } = req.params;
        const borrowing = { ...req.body };
        const responseInformation = await borrowingsController.update(
            id,
            borrowing
        );
        res.status(responseInformation.statusCode).send(responseInformation);
    })
    .delete('/:id', async (req, res) => {
        const { id } = req.params;
        const responseInformation = await borrowingsController.delete(id);
        res.status(responseInformation.statusCode).send(responseInformation);
    });

module.exports = router;
