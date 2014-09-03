//       Telegram.link
//       Copyright 2014 Enrico Stara 'enrico.stara@gmail.com'
//       Released under the MIT license
//       http://telegram.link

//      AbstractObject class
//
// The `AbstractObject` class is an abstraction of the `TypeLanguage Objects and Methods` providing read/write methods to serialize/de-serialize
// the TypeLanguage binary format

// Imports dependencies
var debug = require('debug')('telegram.link:type_language.AbstractObject');
var BigInt = require('bignum');

// The constructor may be called giving a `Buffer` with the binary image - eventually starting from an `offset` -
// in order to de-serialize a `TypeLanguage entity` via `read*` methods,
// otherwise you can call it without any argument and start serializing a new one via `write*` methods
function AbstractObject(buffer, offset) {
    if (buffer) {
        this._writeBuffers = null;
        this._readOffset = 0;
        buffer = Buffer.isBuffer(buffer) ? buffer : new Buffer(buffer);
        this._buffer = offset ? buffer.slice(offset) : buffer;
    } else {
        this._writeBuffers = [];
    }
}

// base implementation to de-serialize the object
AbstractObject.prototype.deserialize = function () {
    if (!this.isReadonly()) {
        debug('Unable to de-serialize, the buffer is undefined');
        return false;
    }
    var id = this.readInt();
    if (this.id != id) {
        console.warn('Unable to de-serialize, (read id) %s != (this.id) %s', id, this.id);
        console.trace();
        return false;
    }
    return this;
};


// Gets finalized the serialization process and retrieved the `Buffer` image of the object,
// putting the instance in `readonly` state
AbstractObject.prototype.retrieveBuffer = function () {
    if (!this._buffer) {
        this._buffer = Buffer.concat(this._writeBuffers);
    }
    this._writeBuffers = null;
    this._readOffset = 0;
    return this._buffer;
};

// Writes the `int` value given as argument
AbstractObject.prototype.writeInt = function (intValue) {
    if (this.isReadonly()) {
        return false;
    }
    var buffer = new Buffer(4);
    if (intValue < 0) {
        buffer.writeInt32LE(intValue, 0);
    } else {
        buffer.writeUInt32LE(intValue, 0);
    }
    this._writeBuffers.push(buffer);
    return true;
};

// Writes the `BigInteger` value given as argument, you have to provide the value as `String` type
// and specify a `byte length`, where `length % 4 == 0`
AbstractObject.prototype._writeBigInt = function (bigIntegerAsString, byteLength) {
    if (this.isReadonly() || (byteLength % 4) !== 0) {
        return false;
    }

    var big = ('' + bigIntegerAsString).slice(0, 2) == '0x' ? new BigInt(bigIntegerAsString.slice(2), 16) : new BigInt(bigIntegerAsString, 10);
    var buffer = big.toBuffer({endian: 'little', size: byteLength});
    this._writeBuffers.push(buffer);

    return true;
};

// Writes the `byte[]` value given as argument,
// adding the bytes length at the beginning
// and adding padding at the end if needed
AbstractObject.prototype.writeBytes = function (bytes) {
    if (this.isReadonly()) {
        return false;
    }

    var bLength = bytes.length;
    var isShort = bLength < 0x7F;
    var buffer = new Buffer(isShort ? 1 : 4);
    var offset = 0;
    if (isShort) {
        buffer.writeUInt8(bLength, offset++);
    } else {
        buffer.writeUInt8(0x7F, offset++);
        buffer.writeUInt8(bLength & 0xFF, offset++);
        buffer.writeUInt8((bLength >> 8) & 0xFF, offset++);
        buffer.writeUInt8((bLength >> 16) & 0xFF, offset++);
    }
    this._writeBuffers.push(buffer);
    this._writeBytes(bytes);

    var padding = 4 - (offset + bLength) % 4;
    // add padding if needed
    if (padding > 0) {
        buffer = new Buffer(padding);
        buffer.fill(0);
        this._writeBuffers.push(buffer);
    }
    return true;
};

// Writes the `string` value given as argument
AbstractObject.prototype.writeString = function (str) {
    return this.writeBytes(str);
};

// Writes the `byte[]` value given as argument
AbstractObject.prototype._writeBytes = function (bytes) {
    if (this.isReadonly()) {
        return false;
    }
    var buffer = !Buffer.isBuffer(bytes) ? new Buffer(bytes) : bytes;
    this._writeBuffers.push(buffer);
    return true;
};

// Writes the `long` value given as argument
AbstractObject.prototype.writeLong = function (bigInteger) {
    return (typeof bigInteger == 'string' || typeof bigInteger == 'number') ? this._writeBigInt(bigInteger, 8) :
        this._writeBytes(bigInteger);
};

// Writes the `int128` value given as argument
AbstractObject.prototype.writeInt128 = function (bigInteger) {
    return (typeof bigInteger == 'string' || typeof bigInteger == 'number') ? this._writeBigInt(bigInteger, 16) :
        this._writeBytes(bigInteger);
};

// Writes the `int256` value given as argument
AbstractObject.prototype.writeInt256 = function (bigInteger) {
    return (typeof bigInteger == 'string' || typeof bigInteger == 'number') ? this._writeBigInt(bigInteger, 32) :
        this._writeBytes(bigInteger);
};


// Reads an `int` value starting from the current position, you may request the value `signed` or not
AbstractObject.prototype.readInt = function (signed) {
    if (!this.isReadonly() || (this._readOffset + 4) > this._buffer.length) {
        return undefined;
    }
    var intValue = signed ? this._buffer.readInt32LE(this._readOffset) : this._buffer.readUInt32LE(this._readOffset);
    // Reading position will be increased of 4
    this._readOffset += 4;
    return intValue;
};


// Reads a `byte[]` value starting from the current position, using the first byte(s) to get the length
AbstractObject.prototype.readBytes = function () {
    var start = this._readOffset;
    var bLength = this._buffer.readUInt8(this._readOffset++);
    var isShort = bLength < 0x7F;
    if (!isShort) {
        bLength = this._buffer.readUInt8(this._readOffset++) +
            (this._buffer.readUInt8(this._readOffset++) << 8) +
            (this._buffer.readUInt8(this._readOffset++) << 16);
    }
    var buffer = this._readBytes(bLength);
    // consider padding if needed
    this._readOffset += 4 - (this._readOffset - start) % 4;
    return buffer;
};


// Reads a `string` value starting from the current position
AbstractObject.prototype.readString = function () {
    return this.readBytes().toString('utf8');
};


// Reads a `byte[]` value starting from the current position
AbstractObject.prototype._readBytes = function (byteLength) {
    var end = this._readOffset + byteLength;
    if (!this.isReadonly() || end > this._buffer.length) {
        return undefined;
    }
    var buffer = this._buffer.slice(this._readOffset, end);
    this._readOffset = end;
    return buffer;
};

// Reads a `BigInteger` value with a given byte length starting from the current position
AbstractObject.prototype._readBigInt = function (byteLength) {
    var buffer = this._readBytes(byteLength);
    return buffer ? '0x' + BigInt.fromBuffer(buffer, {endian: 'little', size: byteLength}).toString(16) : undefined;
};

// Reads a `long` value with  starting from the current position
AbstractObject.prototype.readLong = function () {
    return this._readBigInt(8);
};

// Reads a `int128` value with  starting from the current position
AbstractObject.prototype.readInt128 = function () {
    return this._readBigInt(16);
};

// Reads a `int256` value with  starting from the current position
AbstractObject.prototype.readInt256 = function () {
    return this._readBigInt(32);
};

// Checks if the object has been already serialized and then it's `readonly`
AbstractObject.prototype.isReadonly = function () {
    if (this._buffer) {
        return true;
    }
    return false;
};

// retrieves the current read position
AbstractObject.prototype.getReadOffset = function () {
    return this._readOffset;
};

// Exports the class
module.exports = exports = AbstractObject;