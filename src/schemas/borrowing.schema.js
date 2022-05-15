const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
        },
        book_id: {
            type: 'number',
        },
        student_id: {
            type: 'number',
        },
    },
    required: ['book_id', 'student_id'],
    additionalProperties: false,
};

const borrowingValidator = ajv.compile(schema);

module.exports = borrowingValidator;
