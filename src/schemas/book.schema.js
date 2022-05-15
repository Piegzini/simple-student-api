const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
        },
        title: {
            type: 'string',
        },
    },
    required: ['title'],
    additionalProperties: false,
};

const booksValidator = ajv.compile(schema);

module.exports = booksValidator;
