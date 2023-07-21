const segundos = document.getElementById('segundos');
const minutos = document.getElementById('minutos');
const horas = document.getElementById('horas');

let tiempoLimite = null, tiempoPendiente, tiempoActual, tiempoRemanente, idIntervalo;


const iniciarTemporizador = () => {
    tiempoActual = new Date().getTime()
    if (tiempoLimite){
        tiempoLimite = tiempoInicio + tiempoActual;
        // tiempoInicio = 0;
    }
    else {
        let tiempoIngresado = (Number(segundos.value) + (Number(minutos.value) * 60)+ (Number(horas.value) * 3600));
        tiempoLimite = tiempoActual + tiempoIngresado * 1000; 
        if (idIntervalo) clearInterval(idIntervalo);
        temporizador()
    }
}

function temporizador(){
    idIntervalo = setInterval(() => {
        tiempoActual = new Date().getTime()
        tiempoRemanente = tiempoLimite - tiempoActual;
        formatoTiempo(tiempoRemanente);
        if(tiempoRemanente <= 0) clearInterval(idIntervalo)
    }, 1000) 

}

function formatoTiempo( tiempo ){
    let tiempoEnSegundos = tiempo / 1000, ObjetoTiempo;
    ObjetoTiempo.segundos = `0${Math.floor(tiempoEnSegundos % 60)}`.slice(-2);
}