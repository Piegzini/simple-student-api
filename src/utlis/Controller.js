const Response = require('./response');
const DatabaseService = require('../services/database.service');

class Controller {
    constructor(_collection, _validator) {
        this.dbService = new DatabaseService(_collection);
        this.validator = _validator;
    }

    async get(id, queryParams) {
        return await this.dbService.select(id, queryParams);
    }

    async create(element) {
        const resultOfValidation = this.validator(element);

        if (!resultOfValidation) {
            const message = this.validator.errors[0].message;
            return new Response(401, message);
        }

        return await this.dbService.insert(element);
    }

    async update(id, values) {
        const response = await this.dbService.select(id);

        const {
            statusCode,
            data: [currentElementValues],
        } = response;

        if (statusCode !== 200) {
            return response;
        }

        const updatedElement = {
            ...currentElementValues,
            ...values,
        };

        const resultOfValidation = this.validator(updatedElement);

        if (!resultOfValidation) {
            const message = this.validator.errors[0].message;
            return new Response(401, message);
        }

        return await this.dbService.update(id, updatedElement);
    }

    async delete(id) {
        return await this.dbService.delete(id);
    }
}

module.exports = Controller;
