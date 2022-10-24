"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidExpresion = exports.isValid = void 0;
function dc(numero, esCuenta) {
    let pesos = [];
    if (esCuenta)
        pesos = [3, 2, 7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    else
        pesos = [3, 2, 7, 6, 5, 4, 3, 2, 5, 4, 3, 2];
    let s = 0;
    for (let i = 0; i < numero.length; i++) {
        let d = numero[i];
        s += Number(d) * pesos[i];
    }
    let resultado = Number(11 - (s % 11));
    if (resultado == 10)
        resultado = 0;
    else if (resultado == 11)
        resultado = 1;
    return resultado;
}
function getDigitoVerificador(entidad, sucursal, cuenta) {
    const num1 = dc(entidad + sucursal, false);
    const num2 = dc(sucursal + cuenta, true);
    const d = `${num1}${num2}`;
    return d;
}
function isValid(account_number) {
    //if (!/^[0-9]{20}$/.test(account_number)) return false;
    const entidad = account_number.slice(0, 4);
    const sucursal = account_number.slice(4, 8);
    const dc = account_number.slice(8, 10);
    const cuenta = account_number.slice(10);
    const calculo = getDigitoVerificador(entidad, sucursal, cuenta);
    if (calculo == dc)
        return true;
    return false;
}
exports.isValid = isValid;
function isValidExpresion(account_number) {
    if (!/^[0-9]{20}$/.test(account_number))
        return false;
    return true;
}
exports.isValidExpresion = isValidExpresion;
