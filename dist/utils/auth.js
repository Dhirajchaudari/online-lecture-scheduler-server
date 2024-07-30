"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtValid = jwtValid;
exports.signJwt = signJwt;
exports.verifyJwt = verifyJwt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const publicKey = Buffer.from(process.env.PUBLIC_KEY, "base64").toString("ascii");
const privateKey = Buffer.from(process.env.PRIVATE_KEY, "base64").toString("ascii");
function jwtValid(token) {
    var isValid = false;
    jsonwebtoken_1.default.verify(token, publicKey, (error, decode) => {
        if (error?.name === "TokenExpiredError") {
            isValid = true;
        }
        else {
            isValid = false;
        }
    });
    return isValid;
}
function signJwt(object, options) {
    return jsonwebtoken_1.default.sign(object, privateKey, {
        ...(options && options),
        algorithm: "RS256",
    });
}
function verifyJwt(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        return decoded;
    }
    catch (error) {
        return null;
    }
}
