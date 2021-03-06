const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const { join } = require('path');
const PRIV_KEY = fs.readFileSync(join(__dirname, '../middleware/passport/priv_key.pem'));

const generatePassword = (password) => {
    const salt = crypto.randomBytes(64).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');

    return { salt, hash };
};

const validPassword = (password, { hash, salt }) => {
    const hashToVerify = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return hash === hashToVerify;
};

const issueJWT = (user) => {
    const id = user.id;
    const expiresIn = '1 day';
    const payload = {
        sub: id,
        iat: Date.now(),
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

    return {
        token: 'Bearer ' + signedToken,
        expires: expiresIn,
    };
};

class Response {
    constructor() {
        this.status = 200;
        this.success = true;
    }

    setError(_status, _message) {
        this.success = false;
        this.status = _status;
        this.message = _message;
    }

    setData(_data, _status) {
        this.data = _data;
        this.status = _status ? _status : this.status;
    }
}

module.exports = { generatePassword, validPassword, issueJWT, Response };
