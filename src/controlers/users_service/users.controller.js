const Controller = require('../../helpers/Controller');
const User = require('../../patterns/models/user.model');
const Validator = require('../../patterns/schemas/student.schema');
const utils = require('../../helpers/utils');
const { Response } = require('../../helpers/utils');
const MailerService = require('../../services/mailer.service');

class UsersController extends Controller {
    constructor(_collection, _model, _validator) {
        super(_collection, _model, _validator);
    }

    async register({ username, email, password }) {
        const { salt, hash } = utils.generatePassword(password);
        const user = { username, email, salt, hash };

        const result = await this.dbService.insert(user);

        if (result.statusCode === 201) {
            const { token, expires } = utils.issueJWT(result.data);
            result.data = { id: result.data.id };
            //sending mail
            const postman = new MailerService();
            const statusOfSendingMail = await postman.send(email, token, expires);

            if (statusOfSendingMail !== 250) {
                result.statusCode = statusOfSendingMail;
                result.message = 'Something is wrong with your email';
            }

            result.message = 'Token has been sent successfully to your email';
            return result;
        }

        return result;
    }

    async login({ username, password }) {
        const user = await this.dbService.model.findOne({
            where: { username },
        });

        if (!user) {
            return new Response(401, "User with this name doesn't exist");
        }

        const isValidPassword = utils.validPassword(password, user);

        if (!isValidPassword) {
            return new Response(401, 'Wrong password');
        }

        const { token, expires } = utils.issueJWT(user);

        const response = new Response(200, 'Success');

        const postman = new MailerService();
        const statusOfSendingMail = await postman.send(user.email, token, expires);

        if (statusOfSendingMail !== 250) {
            response.statusCode = statusOfSendingMail;
            response.message = 'Something is wrong with your email';
        }

        return response;
    }
}

const studentsController = new UsersController('users', User, Validator);
module.exports = studentsController;
