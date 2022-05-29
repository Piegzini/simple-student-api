const express = require('express');
const router = express.Router();
const booksController = require('../../controlers/api/books.controller');
const passport = require('passport');
router
    .use(passport.authenticate('jwt', { session: false }))
    .get('/:id?', async (req, res) => {
        const { id } = req.params;
        const queryParams = { ...req.query };
        const response = await booksController.get(id, queryParams);
        res.status(response.status).send(response);
    })
    .post('/', async (req, res) => {
        const book = { ...req.body };
        const response = await booksController.create(book);
        res.status(response.status).send(response);
    })

    .put('/:id', async (req, res) => {
        const { id } = req.params;
        const book = { ...req.body };
        const response = await booksController.update(id, book);
        res.status(response.status).send(response);
    })
    .delete('/:id', async (req, res) => {
        const { id } = req.params;
        const response = await booksController.delete(id);
        res.status(response.status).send(response);
    });

module.exports = router;
