$(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

$( document ).ready(function() {
    // DOM ready
	$("#sign-in").click(function(){
		if ($("#inputName").val() != null &&
			$("#inputEmail").val() != null) {
		localStorage.setItem("PROFILE_NAME",$("#inputName").val());
		localStorage.setItem("PROFILE_REAUTH_EMAIL",$("#inputEmail").val());
		if (localStorage.getItem("RESERVA_VUELO") == null)
			window.location = 'search.html';
		else
			$('#goPay').hide();
		}
	});

	$('#btnReservar').click(function(){
		window.location = 'search.html';
	});
	
	if (localStorage.getItem("RESERVA_VUELO") != null){
		reserva = new Reserva();
		reserva.fromStorage();
		$("#reservas").append("<h3>Reservas activas</h3>")
		$("#tablaReservas").append("<thead class='tbl-header'><th>Número de vuelo</th><th>Origen</th><th>Destino</th><th>Plazas Reservadas</th><th>Hora de salida</th><th>Aerolínea</th><th>Importe</th></thead>");
		$("#tablaReservas").append("<tr>");
		$("#tablaReservas").append("<td>"+reserva.nVuelo + "</td><td>"
									+ reserva.origen + "</td><td>"
									+ reserva.destino + "</td><td>"
									+ reserva.plazas + "</td><td>"
									+ reserva.horaSalida + "</td><td>"
									+ reserva.aerolinea + "</td><td>"
									+ reserva.precio + "</td>"
								  );
		$("#tablaReservas").append("</tr>");
		if (localStorage.getItem("PROFILE_NAME") == null){
			$('#btnReservar').hide();
			$('#goPay').append('Inicie Sesión para completar la reserva')
		}
			
	}
	
    // Test data
    /*
     * To test the script you should discomment the function
     * testLocalStorageData and refresh the page. The function
     * will load some test data and the loadProfile
     * will do the changes in the UI
     */
    if (testLocalStorageData())
    // Load profile if it exits
		loadProfile();
});

/**
 * Function that gets the data of the profile in case
 * thar it has already saved in localstorage. Only the
 * UI will be update in case that all data is available
 *
 * A not existing key in localstorage return null
 *
 */
function getLocalProfile(callback){
    var profileName        = localStorage.getItem("PROFILE_NAME");
    var profileReAuthEmail = localStorage.getItem("PROFILE_REAUTH_EMAIL");

    if(profileName !== null
            && profileReAuthEmail !== null) {
        callback(profileName, profileReAuthEmail);
    }
}

/**
 * Main function that load the profile if exists
 * in localstorage
 */
function loadProfile() {
    if(!supportsHTML5Storage()) { return false; }
    // we have to provide to the callback the basic
    // information to set the profile
    getLocalProfile(function(profileName, profileReAuthEmail) {
        //changes in the UI
        $("#profile-name").html(profileName);
        $("#reauth-email").html(profileReAuthEmail);
        $("#inputEmail").hide();
		$("#inputPassword").hide();
        $("#remember").hide();
		$("#sign-in").hide();
		$("#inputName").hide();
		//$("#sign-in").click(function() {window.location = 'search.html'});
    });
}

/**
 * function that checks if the browser supports HTML5
 * local storage
 *
 * @returns {boolean}
 */
function supportsHTML5Storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

/**
 * Test data. This data will be safe by the web app
 * in the first successful login of a auth user.
 * To Test the scripts, delete the localstorage data
 * and comment this call.
 *
 * @returns {boolean}
 */
function testLocalStorageData() {
    if(!supportsHTML5Storage()) { return false; }
    email = localStorage.getItem("PROFILE_REAUTH_EMAIL");
	if (email != '')
		return true;
	else
		return false;
}	