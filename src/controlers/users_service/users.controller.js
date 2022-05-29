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

        if (result.status === 201) {
            result.message = 'Account has been successfully registered';
            return result;
        }

        return result;
    }

    async login({ username, password }, isFirstLogin) {
        const response = new Response();
        const user = await this.dbService.model.findOne({
            where: { username },
        });

        if (!user) {
            response.setError(401, "User with this name doesn't exist");
            return response;
        }

        const isValidPassword = utils.validPassword(password, user);

        if (!isValidPassword) {
            response.setError(401, 'Wrong password');
            return response;
        }

        const { token, expires } = utils.issueJWT(user);

        const postman = new MailerService();
        const statusOfSendingMail = await postman.send(user.email, token, expires, isFirstLogin);

        if (statusOfSendingMail !== 250) {
            response.setError(statusOfSendingMail, 'Something is wrong with your email');
        }

        return response;
    }
}

const studentsController = new UsersController('users', User, Validator);
module.exports = studentsController;
