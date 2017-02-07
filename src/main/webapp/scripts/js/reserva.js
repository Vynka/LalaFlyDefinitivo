function Reserva(nVuelo,origen,destino,plazas,horaSalida,aerolinea,precio){
	this.nVuelo 	= nVuelo;
	this.origen 	= origen;
	this.destino 	= destino;
	this.plazas 	= plazas;
	this.horaSalida = horaSalida;
	this.aerolinea 	= aerolinea;
	this.precio 	= precio;
}

Reserva.prototype.persist = function(){
	jsonReserva = JSON.stringify(this);
	localStorage.setItem("RESERVA_VUELO",jsonReserva);
}

Reserva.prototype.fromStorage = function(){
	if (localStorage.getItem("RESERVA_VUELO") != null) {
		aux = JSON.parse(localStorage.getItem("RESERVA_VUELO"));
		this.nVuelo 	= aux.nVuelo;
		this.origen 	= aux.origen;
		this.destino 	= aux.destino;
		this.plazas 	= aux.plazas;
		this.horaSalida = aux.horaSalida;
		this.aerolinea 	= aux.aerolinea;
		this.precio 	= aux.precio;
	}
}