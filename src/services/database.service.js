const mysql = require('mysql2/promise')
const config = require('../../db.config')
const Response = require('../utlis/response')

class DatabaseService {
    baseClient = mysql
    constructor(_collection) {
        this.collection = _collection
    }

    async select(id) {
        const preQuery = id
            ? `SELECT * FROM ${this.collection} WHERE id = ? `
            : `SELECT * FROM ${this.collection}`

        const query = this.baseClient.format(preQuery, id)

        try {
            const connection = await mysql.createConnection(config)
            const [data] = await connection.query(query)
            if (!data.length) {
                const message = 'The resource does not exist'
                return new Response(404, message)
            }

            return new Response(200, 'Success', data)
        } catch (e) {
            console.log(e)
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
