"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha1 = sha1;
exports.encode = encode;
exports.decode = decode;
const crypto_1 = __importDefault(require("crypto"));
const mercurius_1 = require("mercurius");
const password = process.env.CRYPT_PASSWORD;
const iv = Buffer.from(process.env.IV);
if (!iv) {
    throw new mercurius_1.ErrorWithProps("IV in the env is not set!");
}
const ivstring = iv.toString("hex");
function sha1(input) {
    return crypto_1.default.createHash("sha1").update(input).digest();
}
function password_derive_bytes(password, salt, iterations, len) {
    let key = Buffer.from(password + salt);
    for (var i = 0; i < iterations; i++) {
        key = sha1(key);
    }
    if (key.length < len) {
        let hx = password_derive_bytes(password, salt, iterations - 1, 20);
        for (var counter = 1; key.length < len; ++counter) {
            key = Buffer.concat([
                key,
                sha1(Buffer.concat([Buffer.from(counter.toString()), hx])),
            ]);
        }
    }
    return Buffer.alloc(len, key);
}
// Function to encode the object
async function encode(string) {
    const key = password_derive_bytes(password, "", 100, 32);
    // Initialize Cipher Object to encrypt using AES-256 Algorithm
    const cipher = crypto_1.default.createCipheriv("aes-256-cbc", key, ivstring);
    const part1 = cipher.update(string, "utf8");
    const part2 = cipher.final();
    const encrypted = Buffer.concat([part1, part2]).toString("base64");
    return encrypted;
}
// Function to decode the object
async function decode(string) {
    const key = password_derive_bytes(password, "", 100, 32);
    // Initialize decipher Object to decrypt using AES-256 Algorithm
    const decipher = crypto_1.default.createDecipheriv("aes-256-cbc", key, ivstring);
    let decrypted = decipher.update(string, "base64", "utf8");
    decrypted += decipher.final();
    return decrypted;
}
