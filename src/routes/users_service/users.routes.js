const express = require('express');
const utils = require('../../helpers/utils');
const DatabaseService = require('../../services/database.service');
const router = express.Router();
const User = require('../../patterns/models/users.model');
const { Response } = require('../../helpers/utils');

router
    .post('/register', async (req, res) => {
        const { salt, hash } = utils.generatePassword(req.body.password);

        const user = {
            username: req.body.username,
            email: req.body.email,
            hash,
            salt,
        };

        const db = new DatabaseService('users', User);

        const result = await db.insert(user);

        if (result.statusCode === 201) {
            const { token, expires } = utils.issueJWT(result.data);
            result.data = { id: result.data.id };
            result.token = token;
            result.expires = expires;
            return res.status(result.statusCode).send(result);
        }
        res.status(result.statusCode).send(result);
    })
    .post('/login', async (req, res) => {
        const user = await User.findOne({
            where: { username: req.body.username },
        });

        if (!user) {
            const response = new Response(401, "User with this name doesn't exist");
            return res.status(response.statusCode).send(response);
        }

        const isValid = utils.validPassword(req.body.password, user);

        if (isValid) {
            const { token, expires } = utils.issueJWT(user);
            const response = new Response(200, 'Success');
            response.token = token;
            response.expires = expires;

            return res.status(response.statusCode).send(response);
        } else {
            const response = new Response(401, 'Wrong password');
            return res.status(response.statusCode).send(response);
        }
    });

module.exports = router;
