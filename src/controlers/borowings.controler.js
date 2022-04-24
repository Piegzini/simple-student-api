const mysql = require('mysql2/promise')
const config = require('../../db.config')
const Response = require('../utlis/response')
const borrowingValidator = require('../schemas/borrowing.schema')

const getBorrowing = async (id) => {
    const responseInformation = new Response()
    try {
        const borrowingProperties = Object.keys(
            borrowingValidator.schema.properties
        )

        const contentOfQuery = id
            ? `SELECT ${borrowingProperties} FROM borrowings WHERE id = ? `
            : `SELECT ${borrowingProperties} FROM borrowings`

        const query = mysql.format(contentOfQuery, id)
        const connection = await mysql.createConnection(config)
        const [data] = await connection.query(query)

        if (data.length > 0) {
            responseInformation.data = data
        } else {
            responseInformation.message = 'The resource does not exist'
            responseInformation.statusCode = 404
        }
    } catch (e) {
        responseInformation.statusCode = 500
        responseInformation.message = e.message
    }
    return responseInformation
}

const createBorrowing = async (book) => {
    const responseInformation = new Response()
    const resultOfValidation = booksValidator(book)
    if (!resultOfValidation) {
        responseInformation.statusCode = 401

        responseInformation.message = booksValidator.errors[0].message
        return responseInformation
    }

    try {
        const query = mysql.format('INSERT INTO books (title) VALUES (?) ', [
            book.title,
        ])
        const connection = await mysql.createConnection(config)
        await connection.query(query)

        responseInformation.message = 'New record created'
        responseInformation.statusCode = 201
    } catch (e) {
        responseInformation.statusCode = 500
        responseInformation.message = e.message
    }
    return responseInformation
}

const updateBorrowing = async (id, bookParametersToUpdate) => {
    const responseInformation = new Response()

    try {
        const {
            data: [currentBookParameters],
        } = await getBooks(id)

        const newBookInstance = {
            ...currentBookParameters,
            ...bookParametersToUpdate,
        }

        const resultOfValidation = booksValidator(newBookInstance)
        if (!resultOfValidation) {
            responseInformation.statusCode = 401

            responseInformation.message = booksValidator.errors[0].message
            return responseInformation
        }

        const query = mysql.format('UPDATE books SET ? WHERE id = ?', [
            newBookInstance,
            id,
        ])
        const connection = await mysql.createConnection(config)
        const [dataBaseResponse] = await connection.query(query)
        const { affectedRows, info } = dataBaseResponse

        responseInformation.statusCode = affectedRows ? 200 : 404
        responseInformation.message = info
    } catch (e) {
        responseInformation.statusCode = 400
        responseInformation.message = e.message
    }
    return responseInformation
}

const deleteBorrowing = async (id) => {
    const responseInformation = new Response()

    try {
        const query = mysql.format('DELETE FROM books WHERE id = ? ', id)
        const connection = await mysql.createConnection(config)
        const [{ affectedRows }] = await connection.query(query)

        if (!affectedRows) {
            responseInformation.statusCode = 404
            responseInformation.message = 'Resource with this id does not exist'
        }
    } catch (e) {
        responseInformation.statusCode = 400
        responseInformation.message = e.message
    }

    return responseInformation
}

module.exports = { getBorrowing }
