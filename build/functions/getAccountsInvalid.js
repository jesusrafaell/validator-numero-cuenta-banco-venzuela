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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListAccountsWithCommerce = exports.getAccountsInvalid = void 0;
const mssql_1 = __importDefault(require("mssql"));
const db_1 = __importDefault(require("../db"));
const validAcoountBank_1 = require("./validAcoountBank");
function getAccountsInvalid(array) {
    let list = [];
    array.forEach((item, index) => {
        const { aboTerminal, aboNroCuenta, aboCodComercio } = item;
        if ((0, validAcoountBank_1.isValidExpresion)(aboNroCuenta)) {
            if (!(0, validAcoountBank_1.isValid)(aboNroCuenta))
                list.push({ aboTerminal, aboNroCuenta, aboCodComercio, msg: 'CC invalido' });
        }
        else {
            list.push({ aboTerminal, aboNroCuenta, aboCodComercio, msg: 'Longitud invalida' });
        }
    });
    return list;
}
exports.getAccountsInvalid = getAccountsInvalid;
function getCommerce(comerCod) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield mssql_1.default.query `select comerRif from comercios where comerCod=${comerCod}`;
            return result.recordset[0].comerRif;
        }
        catch (err) {
            console.log(err);
            process.exit();
        }
    });
}
function getListAccountsWithCommerce(array) {
    return __awaiter(this, void 0, void 0, function* () {
        yield mssql_1.default.connect(db_1.default);
        let list = [];
        for (let i = 0; i < array.length; i++) {
            const _a = array[i], { aboCodComercio } = _a, data = __rest(_a, ["aboCodComercio"]);
            let comerRif = yield getCommerce(aboCodComercio);
            list.push(Object.assign(Object.assign({}, data), { comerRif }));
        }
        return list;
    });
}
exports.getListAccountsWithCommerce = getListAccountsWithCommerce;
