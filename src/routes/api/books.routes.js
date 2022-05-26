const express = require('express');
const router = express.Router();
const booksController = require('../../controlers/api/books.controller');
const passport = require('passport');
router
    .use(passport.authenticate('jwt', { session: false }))
    .get('/:id?', async (req, res) => {
        const { id } = req.params;
        const queryParams = { ...req.query };
        const responseInformation = await booksController.get(id, queryParams);
        res.status(responseInformation.statusCode).send(responseInformation);
    })
    .post('/', async (req, res) => {
        const book = { ...req.body };
        const responseInformation = await booksController.create(book);
        res.status(responseInformation.statusCode).send(responseInformation);
    })

    .put('/:id', async (req, res) => {
        const { id } = req.params;
        const book = { ...req.body };
        const responseInformation = await booksController.update(id, book);
        res.status(responseInformation.statusCode).send(responseInformation);
    })
    .delete('/:id', async (req, res) => {
        const { id } = req.params;
        const responseInformation = await booksController.delete(id);
        res.status(responseInformation.statusCode).send(responseInformation);
    });

module.exports = router;
