"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const sqlConfig = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    server: process.env.SERVER,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};
exports.default = sqlConfig;
