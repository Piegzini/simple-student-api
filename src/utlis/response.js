class Response {
    constructor(_statusCode = 200, _message = 'Success', _data = []) {
        this.statusCode = _statusCode
        this.message = _message
        this.data = _data
    }
}

module.exports = Response
