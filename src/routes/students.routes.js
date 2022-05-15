const express = require('express');
const router = express.Router();
const studentsController = require('../controlers/students.controller');

router
    .get('/:id?', async (req, res) => {
        const { id } = req.params;
        const responseInformation = await studentsController.get(id);
        res.status(responseInformation.statusCode).send(responseInformation);
    })
    .post('/', async (req, res) => {
        const student = { ...req.body };
        const responseInformation = await studentsController.create(student);
        res.status(responseInformation.statusCode).send(responseInformation);
    })

    .put('/:id', async (req, res) => {
        const { id } = req.params;
        const student = { ...req.body };
        const responseInformation = await studentsController.update(
            id,
            student
        );
        res.status(responseInformation.statusCode).send(responseInformation);
    })
    .delete('/:id', async (req, res) => {
        const { id } = req.params;
        const responseInformation = await studentsController.delete(id);
        res.status(responseInformation.statusCode).send(responseInformation);
    });

module.exports = router;
