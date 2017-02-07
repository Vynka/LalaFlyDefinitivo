// RESERVA OBJECT
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

// Get the modal
var modal = document.getElementById('payment');

// Get the button that opens the modal
var btn = document.getElementById("payBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var reserva;

// When the user clicks on the button, open the modal 
btn.onclick = function () {
	reserva = new Reserva(
			$("#nVuelo").html(),
			$("#aOrigen").html(),
			$("#aDestino").html(),
			$("#plazasReservadas").html(),
			$("#hSalida").html(),
			$("#vCompany").html(),
			$("#vPrice").html()
		);
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};


$(function () {
    $("#slider-range-min").slider({
        range: "min",
        value: 50,
        min: 10,
        max: 150,
        slide: function (event, ui) {
            $("#amount").val(ui.value + ' €');
        }
    });
    $("#amount").val($("#slider-range-min").slider("value") + " €");
});

$(function () {
    var dateFormat = "yyyy-mm-dd",
            from = $("#fechaSalida")
            .datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 3
            })
            .on("change", function () {
                to.datepicker("option", "minDate", getDate(this));
            }),
            to = $("#fechaLlegada").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3
    })
            .on("change", function () {
                from.datepicker("option", "maxDate", getDate(this));
            });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }

        return date;
    }
});

/*
 DATOS
 */
var aeropuertos = [];
var aerolineas = [];
var vuelosGenericos = [];
var vuelos = [];

function cargaDatos() {
    ajaxAeropuerto = $.ajax({
        "url": "webresources/aeropuerto",
        "type": "get",
        "dataType": "json",
        "success": function (aeropuerto) {
            aeropuertos = aeropuerto;
            populate('#selASalida',aeropuertos);
            populate('#selALlegada',aeropuertos);
        }
        });
//	aeropuertos = [ {idAeropuerto: '1', codigo: 'MAD', nombre: 'Adolfo Suárez Madrid - Barajas', idCiudad: '1'},
//					{idAeropuerto: '2', codigo: 'BCN', nombre: 'Barcelona - El Prat', idCiudad: '2'},
//					{idAeropuerto: '3', codigo: 'VLC', nombre: 'Valencia', idCiudad: '3'},
//					{idAeropuerto: '4', codigo: 'SVQ', nombre: 'Sevilla', idCiudad: '4'},
//					{idAeropuerto: '5', codigo: 'SCQ', nombre: 'Santiago de Compostela', idCiudad: '5'},
//					{idAeropuerto: '6', codigo: 'LEN', nombre: 'León', idCiudad: '6'},
//					{idAeropuerto: '7', codigo: 'QRL', nombre: 'Marbella', idCiudad: '7'},
//					{idAeropuerto: '8', codigo: 'ALC', nombre: 'Alicante - Elche', idCiudad: '8'},
//					{idAeropuerto: '9', codigo: 'SDR', nombre: 'Santander', idCiudad: '9'},
//					{idAeropuerto: '10', codigo: 'GRX', nombre: 'Granada', idCiudad: '10'},
//					{idAeropuerto: '11', codigo: 'TFN', nombre: 'Los Rodeos - Tenerife Norte', idCiudad: '11'},
//					{idAeropuerto: '12', codigo: 'LPA', nombre: 'Gran Canaria', idCiudad: '12'}
//			];
	
	populate('#selASalida',aeropuertos);
    populate('#selALlegada',aeropuertos);

    ajaxAerolineas = $.ajax({
        "url": "webresources/aerolinea",
        "type": "get",
        "dataType": "json",
        "success": function (aerolinea) {
            aerolineas = aerolinea;
            populate('#selectAerolinea', aerolineas);
        }
        });

//	aerolineas = [	{idAerolinea: '1',codigo: 'AEA', nombre: 'Air Europa', idVueloGenerico: null},
//					{idAerolinea: '2',codigo: 'IBB', nombre: 'Binter', idVueloGenerico: null},
//					{idAerolinea: '3',codigo: 'IBE', nombre: 'Iberia', idVueloGenerico: null},
//					{idAerolinea: '4',codigo: 'JKK', nombre: 'Spanair', idVueloGenerico: null}
//	
//			];
	
	populate('#selectAerolinea', aerolineas);

    ajaxVuelosGenericos = $.ajax({
        "url": "webresources/vueloGenerico",
        "type": "get",
        "dataType": "json",
        "success": function (vueloGenerico) {
            vuelosGenericos = vueloGenerico;
        }
        });

		
    vuelosGenericos = [	{nVuelo: '1', horaSalida: '12:00:00', horaLlegada: '14:00:00', precio: '50', capacidad: '100', idOrigen: '11', idDestino: '12', idVueloGenerico: '1', idAerolinea: '1'},
						{nVuelo: '2', horaSalida: '15:00:00', horaLlegada: '17:30:00', precio: '50', capacidad: '100', idOrigen: '10', idDestino: '1', idVueloGenerico: '2', idAerolinea: '4'},
						{nVuelo: '3', horaSalida: '17:00:00', horaLlegada: '19:30:00', precio: '60', capacidad: '200', idOrigen: '2', idDestino: '3', idVueloGenerico: '3', idAerolinea: '3'},
						{nVuelo: '4', horaSalida: '19:00:00', horaLlegada: '22:30:00', precio: '30', capacidad: '150', idOrigen: '4', idDestino: '6', idVueloGenerico: '4', idAerolinea: '1'},
						{nVuelo: '5', horaSalida: '11:00:00', horaLlegada: '13:30:00', precio: '40', capacidad: '100', idOrigen: '9', idDestino: '8', idVueloGenerico: '5', idAerolinea: '2'}
    ];

    ajaxVuelos = $.ajax({
        "url": "webresources/vuelo",
        "type": "get",
        "dataType": "json",
        "success": function (vuelo) {
            vuelos = vuelo;
        }
        });
	
//	vuelos = [ 	{idVuelo: '1', fecha: '2017-02-05', plazasLibres: '11', idVueloGenerico: '1'},
//				{idVuelo: '2', fecha: '2017-02-06', plazasLibres: '20', idVueloGenerico: '1'},
//				{idVuelo: '3', fecha: '2017-02-07', plazasLibres: '43', idVueloGenerico: '1'},
//				{idVuelo: '4', fecha: '2017-02-08', plazasLibres: '25', idVueloGenerico: '4'},
//				{idVuelo: '5', fecha: '2017-02-09', plazasLibres: '7', idVueloGenerico: '5'}
//			];
	
};

function countVueloGenericoInVuelos(id){
	count = 0;
	for (var i = 0;i < vuelos.length; i++) {
		if (vuelos[i].idVueloGenerico.NVuelo == id)
			count++;
	}
	return count;
}

function getIdVuelosByVueloGenericoId(id){
	flights = [];
	for (var i = 0;i < vuelos.length; i++) {
		if (vuelos[i].idVueloGenerico == id)
			flights.push(vuelos[i].idVuelo);
	}
	return flights;
}

function getVueloGenericoById(id) {
	for (var i = 0; i < vuelosGenericos.length; i++){
		if (vuelosGenericos[i].idVueloGenerico == id)
			return vuelosGenericos[i];
	}
}

function getCodigoAeropuertoById(id){
	for (var i = 0; i < aeropuertos.length; i++){
		if (aeropuertos[i].idAeropuerto == id)
			return aeropuertos[i].codigo;
	}
}

function getCodigoAerolineaById(id){
	for (var i = 0; i < aerolineas.length; i++){
		if (aerolineas[i].idAerolinea == id)
			return aerolineas[i].codigo;
	}
}

$(document).ready(cargaDatos);


function populate(selector, data) {
    for (var i = 0; i < data.length; i++) {
        $(selector)
                .append('<option value="' + data[i].codigo + '">' + data[i].nombre + '</option>');
    }
}

function createLinkedList(array){
	str = '';
	str += '<ul>';
	for (i=0;i<array.length;i++){
		str+='<li><a href="#" id="'+array[i]+'">' + array[i] + '</li>';
	}
	str += '</ul>';
	return str;
}
function populateVuelo(vuelo,vueloGenerico){
	$('#listaVuelos').html('');
        $('#listaVuelos').append('<div class="detalleVuelo" id="' + vueloGenerico.NVuelo + '"><h1>' + vueloGenerico.idOrigen.codigo + ' - ' + vueloGenerico.idDestino.codigo + '</h1></div>');
	$('#' + vueloGenerico.NVuelo).append('<h3>'+ $('#fechaSalida').val() + '</h3>');
        $('#' + vueloGenerico.NVuelo).append('<label>Hora de salida</label> ');
        $('#' + vueloGenerico.NVuelo).append(vueloGenerico.horaSalida.substr(11,5));
        $('#' + vueloGenerico.NVuelo).append('<br/><label>Plazas</label> ');
        $('#' + vueloGenerico.NVuelo).append(vuelo.plazasLibres);
        $('#' + vueloGenerico.NVuelo).append('<br/><label>Precio</label> ');
        $('#' + vueloGenerico.NVuelo).append(vueloGenerico.precio);
        $('#' + vueloGenerico.NVuelo).append('<br/><button class="btn btn-primary btn-lg" id="btn_' + vueloGenerico.NVuelo + '">Reservar</button>')
}

$("#btn_Buscar").click(function () {
	if (($('#fechaSalida').val() == '') || ($('#horaSalida') == '')){
		alert('¡Introduce una fecha y una hora!')
		return;
	}
    $('#listaVuelos').html('');
    var nvuelos = 0;
    $("#vuelos").css('visibility', 'visible');
    $('#reserva').css('visibility', 'hidden');

    for (var i = 0; i < vuelos.length; i++) {

        var vuelo = vuelos[i];
	//var vueloGenerico = getVueloGenericoById(vuelo.idVueloGenerico.NVuelo);
	var vueloGenerico = vuelo.idVueloGenerico;	

        if ($('#selASalida').val() == vueloGenerico.idOrigen.codigo &&
                $('#selALlegada').val() == vueloGenerico.idDestino.codigo &&
                parseInt($('#numPasajero').val()) <= vuelo.plazasLibres &&
                parseInt($('#amount').val()) >= vueloGenerico.precio &&
                //$('#selectAerolinea').val() == getCodigoAerolineaById(vueloGenerico.idAerolinea) &&
                $('#fechaSalida').val() == vuelo.fecha.substr(0,10) &&
		$('#horaSalida').val() == vueloGenerico.horaSalida.substr(11,5)
			) {

            nvuelos++;

			//Ponemos el vuelo buscado
			populateVuelo(vuelo,vueloGenerico)

			//¿Hay más fechas?
			vuelosSimilares = countVueloGenericoInVuelos(vueloGenerico.NVuelo);
			if (vuelosSimilares > 1){
				idVuelos = getIdVuelosByVueloGenericoId(vueloGenerico.NVuelo);
				$('#' + vueloGenerico.NVuelo).append('<div>Hay <b>' + vuelosSimilares + '</b> vuelos similares en otras fechas: ' + 
														createLinkedList(idVuelos)+ '</div>');
				
				
			}
			
			
            $('#btn_' + vueloGenerico.NVuelo).click(function (e) {

                var id = e.target.id.substr(e.target.id.length - 1) - 1;

                $('#reserva').css('visibility', 'visible')
		$('#fechaVuelo').html($('#fechaSalida').val())
                $('#nVuelo').html(vuelos[id].idVuelo);
                $('#aOrigen').html(vuelos[id].idVueloGenerico.idOrigen.codigo);
                $('#aDestino').html(vuelos[id].idVueloGenerico.idDestino.codigo);
                //$('#vCompany').html(getCodigoAerolineaById(vuelosGenericos[id].idAerolinea));
                $('#vCompany').html($('#selectAerolinea').val())
		$('#hSalida').html(vuelos[id].idVueloGenerico.horaSalida.substr(11,5));
		$('#hLlegada').html(vuelos[id].idVueloGenerico.horaLlegada.substr(11,5));
                $('#vPrice').html(vuelos[id].idVueloGenerico.precio + ' €');
                $('#plazasReservadas').html($('#numPasajero').val());

                var datosDeVuelo = $('#datosDeVuelo').html();
                $('#confirmData').html(datosDeVuelo);
            });
        }
    }

    if (nvuelos == 0)
        $('#listaVuelos').append('<div class="detalleVuelo" id="0"><h1> No se han encontrado vuelos con las características deseadas </h1></div>');

})

$('#success').click(function () {
	if ($('#card-number').val() == '') {
		alert("Introduzca un número de tarjeta válido");
		return;
	}
	reserva.persist();
    window.location = 'login.html';
});