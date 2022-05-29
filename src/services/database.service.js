const config = require('../db');
const { Response } = require('../helpers/utils');

class DatabaseService {
    constructor(_collection, _model) {
        this.collection = _collection;
        this.model = _model;
    }

    async pagesInformation(_page, _limit) {
        const limit = _limit;
        const page = _page;

        let rowsCount;

        try {
            rowsCount = await this.model.count();
        } catch (e) {
            console.log(e);
        }

        let result = {
            previous: { page: page - 1, limit },
            next: { page: page + 1, limit },
        };

        if (page - 1 <= 0) {
            const { previous, ...rest } = result;
            result = rest;
        }

        if (page + 1 >= rowsCount / limit) {
            const { next, ...rest } = result;
            result = rest;
        }

        return result;
    }

    async selectById(id) {
        const response = new Response();
        try {
            const data = await this.model.findByPk(id);
            if (!data) {
                response.setError(404, 'Not Found');
                return response;
            }
            return response;
        } catch ({ message }) {
            response.setError(500, message);
            return response;
        }
    }

    async selectPaginated(_page, _limit) {
        const response = new Response();

        const limit = parseInt(_limit);
        const page = parseInt(_page);
        const offset = limit * (page - 1);

        try {
            const data = await this.model.findAll({ limit, offset });
            const pages = await this.pagesInformation(page, limit);
            response.setData(data);
            response.pages = pages;
        } catch (e) {
            response.setError(500, e.message);
        }
        return response;
    }

    async insert(element) {
        const response = new Response();
        console.log(element);
        try {
            const { dataValues } = await this.model.create({ ...element });
            response.setData(dataValues, 201);
        } catch (e) {
            console.log(e);
            response.setError(500, e.message);
        }

        return response;
    }

    async update(id, element) {
        const response = new Response();
        try {
            await element.save();
        } catch (e) {
            response.setError(500, e.message);
        }

        return response;
    }

    async delete(id) {
        const response = new Response();
        try {
            const isDeleted = await this.model.destroy({
                where: {
                    id: id,
                },
            });

            if (!isDeleted) {
                const message = 'Resource with this id does not exist';
                response.setError(404, message);
            }
        } catch (e) {
            response.setError(500, e.message);
        }

        return response;
    }
}

module.exports = DatabaseService;
