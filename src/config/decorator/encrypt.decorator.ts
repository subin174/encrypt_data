import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import crypto from 'crypto';
import configuration from '../configuration';
const { secret_key, secret_iv, ecnryption_method } = configuration
const alg = 'aes-256-ctr';
let key = '12345678912345678912345678912345';
key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);



if (!secret_key || !secret_iv || !ecnryption_method) {
    throw new Error('secretKey, secretIV, and ecnryptionMethod are required')
}

const encryptionIV = crypto
    .createHash('sha512')
    .update(secret_iv)
    .digest('hex')
    .substring(0, 16)

// Encrypt data
export function encryptData(data) {
    const cipher = crypto.createCipheriv(ecnryption_method, key, encryptionIV)
    return Buffer.from(
        cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64') // Encrypts data and converts to hex and base64
}

// Decrypt data
export function decryptData(encryptedData) {
    const buff = Buffer.from(encryptedData, 'base64')
    const decipher = crypto.createDecipheriv(ecnryption_method, key, encryptionIV)
    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    ) // Decrypts data and converts to utf8
}
