import mysql, { Connection } from 'mysql';

const db: Connection = mysql.createConnection({
	//type: 'mssql',
	host: '10.198.72.11',
	user: 'amendoza',
	password: 'Am1523246.',
	database: 'librepago',
});

export default db;
