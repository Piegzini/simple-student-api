const crypto = require('crypto');
const fs = require('fs');
const { join } = require('path');

const createKeys = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 1000,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    });

    fs.writeFileSync(join(__dirname + '/pub_key.pem'), publicKey);

    fs.writeFileSync(join(__dirname + '/priv_key.pem'), privateKey);
};

createKeys();
