import sqlConfig from './db';
import sql from 'mssql';
import Abonos from './db/models/abono.entity';
import {
	getAccountsInvalid,
	getListAccounts,
	getListAccountsWithCommerce,
	Invalids,
	InvalidsWithCommerce,
} from './functions/getAccountsInvalid';
import fs from 'fs';
import { config as configEnv } from 'dotenv';
configEnv();

const nameFile: string = process.env.RUTA + new Date().toISOString().split('T')[0] + '.txt';
const file = fs.createWriteStream(nameFile);

async function main() {
	try {
		await sql.connect(sqlConfig);
		const cuentas = await getListAccounts();
		console.log('Connected DB');
		console.log('Total Abonos', cuentas.length);
		const invalids: Invalids[] = getAccountsInvalid(cuentas);
		console.log('Total cuentas invalidas', invalids.length);
		//console.log(invalids);
		const invalidsWithCommerce: InvalidsWithCommerce[] = await getListAccountsWithCommerce(invalids);
		//console.log(invalidsWithCommerce);
		const pathName = file.path;
		file.on('error', (err) => {
			console.error(`There is an error writing the file ${pathName} => ${err}`);
			process.exit();
		});
		for (let i = 0; i < invalidsWithCommerce.length; i++) {
			let value = invalidsWithCommerce[i];
			file.write(
				value.comerRif.padEnd(11, ' ') +
					value.aboNroCuenta.padEnd(20, ' ') +
					value.aboTerminal.padStart(9, ' ') +
					` ${value.msg}` +
					'\n'
			);
		}
		file.end(() => {
			process.exit();
		});
	} catch (err) {
		console.log(err);
		throw err;
	}
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
