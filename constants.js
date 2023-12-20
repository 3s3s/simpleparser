'use strict';

exports.my_portSSL = 5131;
exports.SSL_KEY = '/home/dev/parser/privkey.pem';
exports.SSL_CERT = '/home/dev/parser/fullchain.pem';

exports.SSL_options = {
    key: require("fs").readFileSync(exports.SSL_KEY),
    cert: require("fs").readFileSync(exports.SSL_CERT)
};
