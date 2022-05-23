const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
        },
        email: {
            type: 'string',
        },
        hash: {
            type: 'string',
        },
        surname: {
            type: 'string',
        },
        salt: {
            type: 'string',
        },
    },
    required: ['username', 'email', 'hash', 'salt'],
    additionalProperties: false,
};

const userValidator = ajv.compile(schema);

module.exports = userValidator;
