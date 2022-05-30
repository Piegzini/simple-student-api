const { Response } = require('../helpers/utils');
const DatabaseService = require('../services/database.service');

class Controller {
    constructor(_collection, _model, _validator) {
        this.dbService = new DatabaseService(_collection, _model);
        this.validator = _validator;
    }

    async get(id, queryParams) {
        const paginated = queryParams?.page || queryParams?.limit;

        if (id) {
            return await this.dbService.selectById(id);
        }
        if (paginated) {
            const { page, limit } = queryParams;
            return await this.dbService.selectPaginated(page, limit);
        }

        return await this.dbService.selectPaginated(1, 20);
    }

    async create(element) {
        const resultOfValidation = this.validator(element);

        if (!resultOfValidation) {
            const response = new Response();
            const message = this.validator.errors[0].message;
            response.setError(400, message);
        }

        return await this.dbService.insert(element);
    }

    async update(id, values) {
        const response = await this.dbService.selectById(id);
        const { statusCode, data: element } = response;

        if (statusCode !== 200) {
            return response;
        }

        element.set({ ...values });
        return await this.dbService.update(id, element);
    }

    async delete(id) {
        return await this.dbService.delete(id);
    }
}

module.exports = Controller;
