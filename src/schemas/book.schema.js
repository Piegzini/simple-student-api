const Ajv = require('ajv')
const ajv = new Ajv()

const schema = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
        },
        title: {
            type: 'string',
        },
    },
    required: ['title'],
    additionalProperties: false,
}

const booksValidator = ajv.compile(schema)

console.log(`SELECT  FROM books WHERE id = ? `)
module.exports = booksValidator
