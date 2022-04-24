const Ajv = require('ajv')
const ajv = new Ajv()

const schema = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
        },
        book_id: {
            type: 'integer',
        },
        student_id: {
            type: 'integer',
        },
    },
    required: ['book_id', 'student_id'],
    additionalProperties: false,
}

const borrowingValidator = ajv.compile(schema)

module.exports = borrowingValidator
