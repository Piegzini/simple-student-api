const express = require('express');
const router = express.Router();
const studentsController = require('../../controlers/api/students.controller');
const passport = require('passport');

router
    .use(passport.authenticate('jwt', { session: false }))
    .get('/:id?', async (req, res) => {
        const { id } = req.params;
        const queryParams = { ...req.query };
        const response = await studentsController.get(id, queryParams);
        res.status(response.status).send(response);
    })
    .post('/', async (req, res) => {
        const student = { ...req.body };
        const response = await studentsController.create(student);
        res.status(response.status).send(response);
    })

    .put('/:id', async (req, res) => {
        const { id } = req.params;
        const student = { ...req.body };
        const response = await studentsController.update(id, student);
        res.status(response.status).send(response);
    })
    .delete('/:id', async (req, res) => {
        const { id } = req.params;
        const response = await studentsController.delete(id);
        res.status(response.status).send(response);
    });

module.exports = router;
