const Response = require('./response');
const DatabaseService = require('../services/database.service');

class Controller {
    constructor(_collection, _model, _validator) {
        this.dbService = new DatabaseService(_collection, _model);
        this.validator = _validator;
    }

    async get(id, queryParams) {
        const paginated = queryParams?.page || queryParams?.limit;

        if (id) {
            return await this.dbService.select(id, queryParams);
        }
        if (paginated) {
            const { page, limit } = queryParams;
            return await this.dbService.selectPaginated(page, limit);
        }

        return await this.dbService.selectAll();
    }

    async create(element) {
        const resultOfValidation = this.validator(element);

        if (!resultOfValidation) {
            const message = this.validator.errors[0].message;
            return new Response(400, message);
        }

        return await this.dbService.insert(element);
    }

    async update(id, values) {
        const response = await this.dbService.selectById(id);

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
            return new Response(400, message);
        }

        return await this.dbService.update(id, updatedElement);
    }

    async delete(id) {
        return await this.dbService.delete(id);
    }
}

module.exports = Controller;
