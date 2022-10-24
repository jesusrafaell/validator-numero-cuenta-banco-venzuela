import { config } from 'mssql';

const db: config = {
	user: 'amendoza',
	password: 'Am1523246.',
	database: 'librepago',
	server: '10.198.72.11',
	// pool: {
	// 	max: 10,
	// 	min: 0,
	// 	idleTimeoutMillis: 30000,
	// },
	options: {
		encrypt: true,
		trustServerCertificate: true,
	},
};

export default db;
