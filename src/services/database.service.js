const mysql = require('mysql2/promise')
const config = require('../../db.config')
const Response = require('../utlis/response')

class DatabaseService {
    baseClient = mysql
    constructor(_collection) {
        this.collection = _collection
    }

    pagination(_limit, _page) {
        const limit = parseInt(_limit)
        const offset = limit * (parseInt(_page) - 1)
        const preQuery = `SELECT * FROM ${this.collection} LIMIT ? OFFSET ? `
        return this.baseClient.format(preQuery, [limit, offset])
    }

    async pagesInformation(_limit, _page) {
        const limit = parseInt(_limit)
        const page = parseInt(_page) - 1
        let rowsCount = 0
        const result = {}

        let query = `SELECT COUNT(*) as 'rows' FROM ${this.collection}`
        query = this.baseClient.format(query)

        try {
            const connection = await mysql.createConnection(config)
            const [data] = await connection.query(query)
            rowsCount = data[0].rows
            console.log(rowsCount)
        } catch (e) {
            throw e
        }

        if (page - 1 > 0) {
            result.previous = {
                page: page - 1,
                limit,
            }
        }

        if (page + 1 < rowsCount / limit) {
            result.next = {
                page: page + 1,
                limit,
            }
        }

        return result
    }

    async select(id, queryParams) {
        const pagination = queryParams?.page || queryParams?.limit

        let query

        if (pagination) {
            const { page, limit } = queryParams
            query = this.pagination(limit, page)
        } else {
            query = id
                ? `SELECT * FROM ${this.collection} WHERE id = ? `
                : `SELECT * FROM ${this.collection}`
            query = this.baseClient.format(query, id)
        }

        try {
            const connection = await mysql.createConnection(config)
            const [data] = await connection.query(query)
            if (!data.length) {
                const message = 'The resource does not exist'
                return new Response(404, message)
            }

            const { page, limit } = queryParams
            const pagesInformation = await this.pagesInformation(limit, page)

            const response = new Response(200, 'Success', data)
            response.pages = pagesInformation

            return response
        } catch (e) {
            return new Response(500, e.message)
        }
    }

    async insert(element) {
        const query = this.baseClient.format(
            `INSERT INTO ${this.collection} SET ? `,
            [element]
        )

        try {
            const connection = await this.baseClient.createConnection(config)
            await connection.query(query)

            return new Response(201, 'New record created')
        } catch (e) {
            const message = e.message
            return new Response(500, message)
        }
    }

    async update(id, element) {
        const query = this.baseClient.format(
            `UPDATE ${this.collection} SET ? WHERE id = ?`,
            [element, id]
        )
        try {
            const connection = await this.baseClient.createConnection(config)
            const [dataBaseResponse] = await connection.query(query)
            const { affectedRows, info } = dataBaseResponse

            return new Response(affectedRows ? 200 : 404, info)
        } catch (e) {
            const message = e.message
            return new Response(400, message)
        }
    }

    async delete(id) {
        const query = this.baseClient.format(
            `DELETE FROM ${this.collection} WHERE id = ? `,
            id
        )

        try {
            const connection = await this.baseClient.createConnection(config)
            const [{ affectedRows }] = await connection.query(query)

            if (!affectedRows) {
                const message = 'Resource with this id does not exist'
                return new Response(404, message)
            }

            return new Response(200, 'Success')
        } catch (e) {
            const message = e.message
            return new Response(400, message)
        }
    }
}

module.exports = DatabaseService
