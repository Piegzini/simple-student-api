const Ajv = require('ajv')
const ajv = new Ajv()

const schema = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
        },
        pesel: {
            type: 'string',
            maxLength: 11,
            minLength: 11,
        },
        surname: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
    },
    required: ['pesel', 'name', 'surname'],
    additionalProperties: false,
}

const studentValidator = ajv.compile(schema)

module.exports = studentValidator
