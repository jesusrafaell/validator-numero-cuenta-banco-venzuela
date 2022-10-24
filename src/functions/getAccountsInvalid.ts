import sql from 'mssql';
import db from '../db';
import Abonos from '../db/models/abono.entity';
import Bancos from '../db/models/bancos.entity';
import { isValid, isValidExpresion } from './validAcoountBank';

export interface Invalids {
	aboTerminal: string;
	aboNroCuenta: string;
	aboCodComercio: number;
	msg: string;
}

export interface InvalidsWithCommerce {
	comerRif: string;
	aboTerminal: string;
	aboNroCuenta: string;
	msg: string;
}

export function getAccountsInvalid(array: Abonos[]) {
	let list: Invalids[] = [];
	array.forEach((item: Abonos) => {
		const { aboTerminal, aboNroCuenta, aboCodComercio } = item;
		if (isValidExpresion(aboNroCuenta)) {
			if (!isValid(aboNroCuenta)) list.push({ aboTerminal, aboNroCuenta, aboCodComercio, msg: 'cc_invalido' });
		} else {
			list.push({ aboTerminal, aboNroCuenta, aboCodComercio, msg: 'longitud_invalida' });
		}
	});
	return list;
}

async function getCommerce(comerCod: number): Promise<string> {
	try {
		const result = await sql.query`select comerRif from comercios where comerCod=${comerCod}`;
		return result.recordset[0].comerRif;
	} catch (err) {
		console.log(err);
		process.exit();
	}
}

export async function getListAccountsWithCommerce(array: Invalids[]) {
	await sql.connect(db);
	let list: InvalidsWithCommerce[] = [];
	for (let i = 0; i < array.length; i++) {
		const { aboCodComercio, ...data } = array[i];
		let comerRif: string = await getCommerce(aboCodComercio);
		list.push({ ...data, comerRif });
	}
	return list;
}
