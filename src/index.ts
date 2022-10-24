import db from './db';
import sql from 'mssql';
import Abonos from './db/models/abono.entity';
import {
	getAccountsInvalid,
	getListAccountsWithCommerce,
	Invalids,
	InvalidsWithCommerce,
} from './functions/getAccountsInvalid';
import fs from 'fs';

const test: string[] = [
	'01340497634971022797', //si
	'01020251580100014512', //si
	'01340365163651030134', //no
	'01020345300000670346', //no
	'01340365163651030134', //no
	'010201454500012218881', //no
	'010209301500001360001', //no
];

//test.forEach((st, index) => console.log(st, index + 1, isValid(st)));

async function getListAccounts(): Promise<Abonos[]> {
	try {
		await sql.connect(db);
		console.log('Connected DB');
		const result = await sql.query`select * from abonos`;
		return result.recordset;
	} catch (err) {
		console.log(err);
		process.exit();
	}
}

const file = fs.createWriteStream('my_data.txt');

async function main() {
	const accounts: Abonos[] = await getListAccounts();
	console.log('Total Abonos', accounts.length);
	const invalids: Invalids[] = getAccountsInvalid(accounts);
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
}

main();
