export default interface Abonos {
	aboCod?: number;
	aboTerminal: string;
	aboCodAfi: string;
	aboCodComercio: number;
	aboCodBanco: string;
	aboNroCuenta: string;
	aboTipoCuenta: string;
	aboFreg?: string;
	estatusId: number;
	pagoContado?: number;
	fechaPago?: Date;
	montoEquipoUSD?: number;
	ivaEquipoBs?: number;
	montoTotalEquipoBs?: number;
}
