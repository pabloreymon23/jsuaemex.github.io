//Recoger variables de la URL
function getParameterByName(datoget) {
    datoget = datoget.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var rgx = new RegExp("[\\?&]" + datoget + "=([^&#]*)"),
    resultado = rgx.exec(location.search);
    return resultado === null ? "" : decodeURIComponent(resultado[1].replace(/\+/g, " "));
};

//Desilizador de contenedor del problema y diagrama
window.onload = function(){
    $('.container-title').click(function () {
        $(this).next('.container-description').slideToggle();
    });
};
