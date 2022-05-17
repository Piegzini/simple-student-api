const mysql = require('mysql2/promise');
const config = require('../../db.config');
const Response = require('../helpers/response');

class DatabaseService {
    baseClient = mysql;
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
        try {
            const data = await this.model.findByPk(id);
            if (!data) {
                return new Response(404, 'Not Found');
            }
            return new Response(200, 'Success', data);
        } catch (e) {
            const message = e.message;
            return new Response(500, message);
        }
    }

    async selectAll() {
        try {
            const data = await this.model.findAll();
            return new Response(200, 'Success', data);
        } catch (e) {
            const message = e.message;
            return new Response(500, message);
        }
    }

    async selectPaginated(_page, _limit) {
        const limit = parseInt(_limit);
        const page = parseInt(_page);
        const offset = limit * (page - 1);

        try {
            const data = await this.model.findAll({ limit, offset });
            const pages = await this.pagesInformation(page, limit);
            const response = new Response(200, 'Success', data);
            response.pages = pages;
            return response;
        } catch (e) {
            const message = e.message;
            return new Response(500, message);
        }
    }

    async insert(element) {
        try {
            const response = await this.model.create({ ...element });
            console.log(response);
            return new Response(201, 'New record created');
        } catch (e) {
            const message = e.message;
            return new Response(500, message);
        }
    }

    async update(id, element) {
        const query = this.baseClient.format(`UPDATE ${this.collection} SET ? WHERE id = ?`, [element, id]);
        try {
            const connection = await this.baseClient.createConnection(config);
            const [dataBaseResponse] = await connection.query(query);
            const { affectedRows, info } = dataBaseResponse;

            return new Response(affectedRows ? 200 : 404, info);
        } catch (e) {
            const message = e.message;
            return new Response(400, message);
        }
    }

    async delete(id) {
        try {
            const isDeleted = await this.model.destroy({
                where: {
                    id: id,
                },
            });

            if (!isDeleted) {
                const message = 'Resource with this id does not exist';
                return new Response(404, message);
            }

            return new Response(200, 'Success');
        } catch (e) {
            const message = e.message;
            return new Response(400, message);
        }
    }
}

module.exports = DatabaseService;
