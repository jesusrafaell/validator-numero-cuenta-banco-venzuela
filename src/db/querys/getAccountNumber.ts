import { Connection } from 'mysql';
import Abonos from '../models/abono.entity';

function getAccountNumber(db: Connection) {
	db.query('SELECT * FROM Abonos', function (err, result: Abonos[]) {
		if (err) console.log(err);
		console.log('abonos', result.length);
		return result;
	});
}
export default getAccountNumber;
