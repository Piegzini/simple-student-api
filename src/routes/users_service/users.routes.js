const express = require('express');
const router = express.Router();
const usersController = require('../../controlers/users_service/users.controller');

router
    .post('/register', async (req, res) => {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };
        const response = await usersController.register(user);

        res.status(response.statusCode).send(response);
    })
    .post('/login', async (req, res) => {
        const data = { username: req.body.username, password: req.body.password };

        const response = await usersController.login(data);
        res.status(response.statusCode).send(response);
    });

module.exports = router;
