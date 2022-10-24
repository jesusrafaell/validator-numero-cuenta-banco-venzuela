"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const mssql_1 = __importDefault(require("mssql"));
const getAccountsInvalid_1 = require("./functions/getAccountsInvalid");
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function getListAccounts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mssql_1.default.connect(db_1.default);
            console.log('Connected DB');
            const resultAbono = yield mssql_1.default.query `select * from abonos`;
            const resultBancos = yield mssql_1.default.query `select * from bancos`;
            return { cuentas: resultAbono.recordset, bancos: resultBancos.recordset };
        }
        catch (err) {
            console.log(err);
            process.exit();
        }
    });
}
const nameFile = process.env.RUTA + new Date().toISOString().split('T')[0] + '.txt';
const file = fs_1.default.createWriteStream(nameFile);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const { cuentas, bancos } = yield getListAccounts();
        console.log(bancos.length);
        console.log('Total Abonos', cuentas.length);
        const invalids = (0, getAccountsInvalid_1.getAccountsInvalid)(cuentas);
        console.log('Total cuentas invalidas', invalids.length);
        //console.log(invalids);
        const invalidsWithCommerce = yield (0, getAccountsInvalid_1.getListAccountsWithCommerce)(invalids);
        //console.log(invalidsWithCommerce);
        const pathName = file.path;
        file.on('error', (err) => {
            console.error(`There is an error writing the file ${pathName} => ${err}`);
            process.exit();
        });
        for (let i = 0; i < invalidsWithCommerce.length; i++) {
            let value = invalidsWithCommerce[i];
            file.write(value.comerRif.padEnd(11, ' ') +
                value.aboNroCuenta.padEnd(20, ' ') +
                value.aboTerminal.padStart(9, ' ') +
                ` ${value.msg}` +
                '\n');
        }
        file.end(() => {
            process.exit();
        });
    });
}
main();
/*
const test: string[] = [
    '01340497634971022797', //si
    '01020251580100014512', //si
    '01340365163651030134', //no
    '01020345300000670346', //no
    '01340365163651030134', //no
    '010201454500012218881', //no
    '010209301500001360001', //no
];
*/
//test.forEach((st, index) => console.log(st, index + 1, isValid(st)));
