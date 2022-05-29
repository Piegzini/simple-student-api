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

        res.status(response.status).send(response);
    })
    .post('/login', async (req, res) => {
        const data = { username: req.body.username, password: req.body.password };
        const isFirstLogin = !req.cookies?.['isFirstLogin'];

        if (isFirstLogin) {
            res.cookie('isFirstLogin', 'false');
        }

        const response = await usersController.login(data, isFirstLogin);
        res.status(response.status).send(response);
    });

module.exports = router;
