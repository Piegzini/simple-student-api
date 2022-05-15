const Logger = require('./Logger');

const apiLogger = (req, res, next) => {
    try {
        res.on('finish', async () => {
            const ipAddr =
                req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                '-';
            const user = req['remote-user'] || '-';
            const http_method = req.method;
            const url = req.baseUrl;
            const path = req.path;
            const statusCode = res.statusCode;
            const contentLength = res._contentLength || '-';
            const userAgent = req.headers['user-agent'] || '-';

            Logger.info({
                message: `Api request ${ipAddr} ${user} ${http_method} ${url}${path} HTTP/${req.httpVersion} status: ${statusCode} l:${contentLength}  ${userAgent}`,
                label: req.id,
            });
        });
    } catch (err) {
        Logger.info({
            message: `Error when trying to middleware apiLogger write log e:${err}`,
            label: req.id,
        });
    }

    next();
};
module.exports = apiLogger;
