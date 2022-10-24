import db from './db';
import getAccountNumber from './db/querys/getAccountNumber';
import { isValid } from './functions/validAcoountBank';

const test: string[] = [
	'01340497634971022797', //si
	'01020251580100014512', //si
	'01340365163651030134', //no
	'01020345300000670346', //no
	'01340365163651030134', //no
	'010201454500012218881', //no
	'010209301500001360001', //no
];

test.forEach((st, index) => console.log(st, index + 1, isValid(st)));

//init
db.connect((err) => {
	if (err) throw err;
	console.log('Connected!');
	const abonos = getAccountNumber(db);
	console.log('abonos index', abonos);
});
