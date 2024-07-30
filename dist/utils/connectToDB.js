"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = connectToDB;
const typegoose_1 = require("@typegoose/typegoose");
async function connectToDB() {
    try {
        await typegoose_1.mongoose.connect(process.env.DB_URI, {
            maxPoolSize: 10,
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}
