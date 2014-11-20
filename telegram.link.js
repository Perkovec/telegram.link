//       telegram.link
//
//       Copyright 2014 Enrico Stara 'enrico.stara@gmail.com'
//       Released under the Simplified BSD License
//       http://telegram.link

//      TelegramLink class
//
// This is the entry-point of Telegram.link library, and it lists high level methods to communicate
// with `TELEGRAM MESSANGER`

// Print library version
console.log(require('lib/static').signature);
console.log(('v.%s', require('./package.json').version));

// Register the project name on the logging sys
var getLogger = require('get-log');
getLogger.PROJECT_NAME = require('./package.json').name;

// Export the class
module.exports = exports = TelegramLink;

// Import dependencies
var crypto = require('lib/crypto-util');
var TcpConnection = require('lib/net').TcpConnection;
var HttpConnection = require('lib/net').HttpConnection;
var TypeObject = require('telegram-tl-node').TypeObject;
var mtproto = require('lib/mtproto');
var flow = require('get-flow');

// The constructor requires a primary telegram DataCenter address as argument
function TelegramLink(primaryDC) {
//    this._connection = new TcpConnection(primaryDC);
    this._connection = new HttpConnection({
        proxyHost: process.env.PROXY_HOST,
        proxyPort: process.env.PROXY_PORT,
        host: primaryDC.host,
        port: primaryDC.port
    });
}

// The method creates a connection to the DataCenter,
// provide a callback function to know when is done or to catch an error
TelegramLink.prototype.connect = function (callback) {
    this._connection.connect(callback);
};

// The method states the authorization key with the DataCenter,
// provide a callback function to know when is done or to catch an error
TelegramLink.prototype.authorization = function (callback) {
    var logger = getLogger('TelegramLink.authorization');
    // Put connection in the scope
    var connection = this._connection;

    // Run, run, run ...
    flow.retryUntilIsDone(callback, null,
        function (callback) {
            flow.runSeries([
                requestPQ,
                findPAndQ,
                findPublicKey,
                createPQInnerData,
                encryptPQInnerDataWithRSA,
                requestDHParams,
                decryptDHParams,
                createClientDHInnerData,
                encryptClientDHInnerDataWithAES,
                setClientDHParams
            ], callback);
        });

    // Request a PQ pair number
    function requestPQ(callback) {
        // Create a nonce for the client
        var clientNonce = crypto.createNonce(16);
        mtproto.req_pq({
            props: {
                nonce: clientNonce
            },
            conn: connection,
            callback: function (ex, resPQ) {
                if (clientNonce == resPQ.nonce) {
                    callback(null, resPQ);
                } else {
                    callback(createError('Nonce mismatch.', 'ENONCE'));
                }
            }
        });
    }

    // Find the P and Q prime numbers
    function findPAndQ(resPQ) {
        var pqFinder = new crypto.PQFinder(resPQ.pq);
        if (logger.isDebugEnabled()) logger.debug('Start finding P and Q, with PQ = %s', pqFinder.getPQPairNumber());
        var pq = pqFinder.findPQ();
        if (logger.isDebugEnabled()) logger.debug('Found P = %s and Q = %s', pq[0], pq[1]);
        return {
            pBuffer: pqFinder.getPQAsBuffer()[0],
            qBuffer: pqFinder.getPQAsBuffer()[1],
            resPQ: resPQ
        };
    }

    // Find the correct Public Key using fingerprint from server response
    function findPublicKey(obj) {
        var fingerprints = obj.resPQ.server_public_key_fingerprints.getList();
        if (logger.isDebugEnabled()) logger.debug('Public keys fingerprints from server: %s', fingerprints);
        for (var i = 0; i < fingerprints.length; i++) {
            var fingerprint = fingerprints[i];
            if (logger.isDebugEnabled()) logger.debug('Searching fingerprint %s in store', fingerprint);
            var publicKey = crypto.PublicKey.retrieveKey(fingerprint);
            if (publicKey) {
                if (logger.isDebugEnabled()) logger.debug('Fingerprint %s found in keyStore.', fingerprint);
                obj.fingerprint = fingerprint;
                obj.publicKey = publicKey;
                return obj;
            }
        }
        throw createError('Fingerprints from server not found in keyStore.', 'EFINGERNOTFOUND');
    }

    // Create the pq_inner_data buffer
    function createPQInnerData(obj) {
        var resPQ = obj.resPQ;
        var newNonce = crypto.createNonce(32);
        var pqInnerData = new mtproto.P_q_inner_data({props: {
            pq: resPQ.pq,
            p: obj.pBuffer,
            q: obj.qBuffer,
            nonce: resPQ.nonce,
            server_nonce: resPQ.server_nonce,
            new_nonce: newNonce
        }}).serialize();
        obj.pqInnerData = pqInnerData;
        obj.newNonce = newNonce;
        return obj;
    }

    // Encrypt the pq_inner_data with RSA
    function encryptPQInnerDataWithRSA(obj) {
        // Create the data with hash to be encrypt
        var hash = crypto.createSHA1Hash(obj.pqInnerData);
        var dataWithHash = Buffer.concat([hash, obj.pqInnerData]);
        if (logger.isDebugEnabled()) {
            logger.debug('Data to be encrypted contains: hash(%s), pqInnerData(%s), total length %s',
                hash.length, obj.pqInnerData.length, dataWithHash.length);
        }
        // Encrypt data with RSA
        obj.encryptedData = crypto.rsaEncrypt({message: dataWithHash, key: obj.publicKey});
        return obj;
    }

    // Request server DH parameters
    function requestDHParams(callback, obj) {
        var resPQ = obj.resPQ;
        mtproto.req_DH_params({
            props: {
                nonce: resPQ.nonce,
                server_nonce: resPQ.server_nonce,
                p: obj.pBuffer,
                q: obj.qBuffer,
                public_key_fingerprint: obj.fingerprint,
                encrypted_data: obj.encryptedData
            },
            conn: connection,
            callback: function (ex, serverDHParams, duration) {
                if (ex) {
                    logger.error(ex);
                    if (callback) callback(ex);
                } else {
                    if (serverDHParams.typeName == 'mtproto.Server_DH_params_ok') {
                        if (logger.isDebugEnabled()) logger.debug('\'Server_DH_params_ok\' received from Telegram.');
                        obj.serverDHParams = serverDHParams;
                        callback(null, obj, duration);
                    } else if (serverDHParams.typeName == 'mtproto.Server_DH_params_ko') {
                        logger.warn('\'Server_DH_params_ko\' received from Telegram!');
                        callback(createError(JSON.stringify(serverDHParams), 'EDHPARAMKO'));
                    } else {
                        var msg = 'Unknown error received from Telegram!';
                        logger.error(msg);
                        callback(createError(msg, 'EUNKNOWN'));
                    }
                }
            }
        });
    }

    // Decrypt DH parameters and synch the local time with the server time
    function decryptDHParams(obj, duration) {
        var newNonce = TypeObject.stringValue2Buffer(obj.newNonce, 32);
        var serverNonce = TypeObject.stringValue2Buffer(obj.resPQ.server_nonce, 16);
        if (logger.isDebugEnabled()) {
            logger.debug('newNonce = %s, serverNonce = %s', newNonce.toString('hex'), serverNonce.toString('hex'));
        }
        var hashNS = crypto.createSHA1Hash([newNonce, serverNonce]);
        var hashSN = crypto.createSHA1Hash([serverNonce, newNonce]);
        var hashNN = crypto.createSHA1Hash([newNonce, newNonce]);
        if (logger.isDebugEnabled()) {
            logger.debug('hashNS = %s, hashSN = %s, hashNN = %s', hashNS.toString('hex'), hashSN.toString('hex'), hashNN.toString('hex'));
        }
        // Create the AES key
        var aesKey = Buffer.concat([hashNS, hashSN.slice(0, 12)]);
        var aesIv = Buffer.concat([Buffer.concat([hashSN.slice(12), hashNN]), newNonce.slice(0, 4)]);
        if (logger.isDebugEnabled()) {
            logger.debug('aesKey = %s, aesIv = %s', aesKey.toString('hex'), aesIv.toString('hex'));
        }
        // Decrypt the message
        var answerWithHash = crypto.aesDecrypt(
            obj.serverDHParams.encrypted_answer,
            aesKey,
            aesIv
        );
        // Save AES key
        obj.aes = {key: aesKey, iv: aesIv};
        // De-serialize the inner data
        if (logger.isDebugEnabled()) logger.debug('answerWithHash(%s) = %s', answerWithHash.length, answerWithHash.toString('hex'));
        var answer = answerWithHash.slice(20, 564 + 20);
        if (logger.isDebugEnabled()) logger.debug('answer(%s) = %s', answer.length, answer.toString('hex'));
        var serverDHInnerData = new mtproto.Server_DH_inner_data({
            buffer: answer
        }).deserialize();
        if (logger.isDebugEnabled()) logger.debug('serverDHInnerData = %s obtained in %sms', JSON.stringify(serverDHInnerData), duration);
        // Check if the nonces are consistent
        if (serverDHInnerData.nonce != obj.serverDHParams.nonce) {
            throw createError('Nonce mismatch %s != %s', obj.serverDHParams.nonce, serverDHInnerData.nonce);
        }
        if (serverDHInnerData.server_nonce != obj.serverDHParams.server_nonce) {
            throw createError('ServerNonce mismatch %s != %s', obj.serverDHParams.server_nonce, serverDHInnerData.server_nonce);
        }
        // Synch the local time with the server time
        crypto.timeSynchronization(serverDHInnerData.server_time * 1000, duration);
        obj.serverDHInnerData = serverDHInnerData;
        return obj;
    }

    // Calculate the g_b = pow(g, b) mod dh_prime
    // Create the client DH inner data
    function createClientDHInnerData(obj) {
        var retryCount = 0;
        if (logger.isDebugEnabled()) logger.debug('Start calculating g_b');
        // Calculate g_b
        var g = obj.serverDHInnerData.g;
        var b = crypto.createNonce(256);
        var dhPrime = obj.serverDHInnerData.dh_prime;
        var gb = crypto.modPow(g, b, dhPrime);
        if (logger.isDebugEnabled()) logger.debug('g_b(%s) = %s', gb.length, gb.toString('hex'));
        // Create client DH inner data
        obj.clientDHInnerData = new mtproto.Client_DH_inner_data({props: {
            nonce: obj.resPQ.nonce,
            server_nonce: obj.resPQ.server_nonce,
            retry_id: retryCount,
            g_b: gb
        }}).serialize();
        return obj;
    }

    // Encrypt Client DH inner data
    function encryptClientDHInnerDataWithAES(obj) {
        var hash =  crypto.createSHA1Hash(obj.clientDHInnerData);
        var dataWithHash = Buffer.concat([hash, obj.clientDHInnerData]);
        if (logger.isDebugEnabled()) {
            logger.debug('Data to be encrypted contains: hash(%s), clientDHInnerData(%s), total length %s',
                hash.length, obj.clientDHInnerData.length, dataWithHash.length);
        }
        obj.encryptClientDHInnerData = crypto.aesEncrypt(
            dataWithHash,
            obj.aes.key,
            obj.aes.iv
        );
        if (logger.isDebugEnabled()) {
            logger.debug('encryptClientDHInnerData(%s) = %s',
                obj.encryptClientDHInnerData.length, obj.encryptClientDHInnerData.toString('hex'));
        }
        return obj;
    }

    // Set client DH parameters
    function setClientDHParams(callback, obj) {
        mtproto.set_client_DH_params({
            props: {
                nonce: obj.resPQ.nonce,
                server_nonce: obj.resPQ.server_nonce,
                encrypted_data: obj.encryptClientDHInnerData
            },
            conn: connection,
            callback: function (ex, setClientDHParamsAnswer, duration) {
                if (ex) {
                    logger.error(ex);
                    if (callback) callback(ex);
                } else {
                    if (setClientDHParamsAnswer.typeName == 'mtproto.Dh_gen_ok') {
                        if (logger.isDebugEnabled()) logger.debug('\'Dh_gen_ok\' received from Telegram.');
                        obj.setClientDHParamsAnswer = setClientDHParamsAnswer;
                        callback(null, obj, duration);
                    } else if (setClientDHParamsAnswer.typeName == 'mtproto.Dh_gen_retry') {
                        logger.warn('\'Dh_gen_retry\' received from Telegram!');
                        callback(createError(JSON.stringify(serverDHParams), 'EDHPARAMRETRY'));
                    } else if (setClientDHParamsAnswer.typeName == 'mtproto.Dh_gen_fail') {
                        logger.warn('\'Dh_gen_fail\' received from Telegram!');
                        callback(createError(JSON.stringify(serverDHParams), 'EDHPARAMFAIL'));
                    } else {
                        var msg = 'Unknown error received from Telegram!';
                        logger.error(msg);
                        callback(createError(msg, 'EUNKNOWN'));
                    }
                }
            }
        });
    }
};

function createError(msg, code) {
    var error = new Error(msg);
    error.code = code;
    return error;
}

// The method closes the communication with the DataCenter,
// provide a callback function to know when is done or to catch an error
TelegramLink.prototype.end = function (callback) {
    this._connection.close(callback);
};