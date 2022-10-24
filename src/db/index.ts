import { config } from 'mssql';
import { config as configEnv } from 'dotenv';
configEnv();

const sqlConfig: config = {
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	server: process.env.SERVER!,
	options: {
		encrypt: false,
		trustServerCertificate: true,
	},
};

export default sqlConfig;
