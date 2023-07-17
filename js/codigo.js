const segundos = document.getElementById('segundos');
const minutos = document.getElementById('minutos');
const horas = document.getElementById('horas');

segundos.addEventListener('keydown', filtro);
segundos.addEventListener('input', formatearTiempo);
segundos.addEventListener('input', limitarDigitos);
segundos.addEventListener('change', limitarSegundos);

minutos.addEventListener('keydown', filtro);
minutos.addEventListener('input', formatearTiempo);
minutos.addEventListener('input', limitarDigitos);
minutos.addEventListener('change', limitarMinutos);

horas.addEventListener('keydown', filtro);
horas.addEventListener('input', formatearTiempo);
horas.addEventListener('input', limitarDigitos);
horas.addEventListener('change', mantenerFormato);


minutos.addEventListener('input', formatearTiempo);
horas.addEventListener('input', formatearTiempo);

function formatearTiempo( evento ){
    let tiempo = evento.target.value;
    let input = evento.target
    formatearMensaje( tiempo, input );
    
}

function formatearMensaje( tiempo, input ){
    console.log(tiempo)
    if (tiempo > 0 && tiempo < 10){
        console.log(tiempo)
        input.value = `0${tiempo}`;
    }
}

function limitarDigitos( evento ){
    if (evento.target.value.length > 2 && evento.target.value[0] == 0){
        evento.target.value = evento.target.value.slice(1,3);
    }
    
    if( evento.target.value.length > 2 ) {
        evento.target.value = evento.target.value.slice(0,2)
    }
}

function filtro( evento)
{
var tecla = evento.key;
if (['.','e', '+', '-'].includes(tecla))
   evento.preventDefault();
}

function limitarSegundos( evento ){
    const objetominuto = document.getElementById('minutos');
    const minutos = objetominuto.value;
    const objetosegundo = evento.target
    const segundos = objetosegundo.value;

    if (segundos === '0'){
        objetosegundo.value = '00';
    }

    if (segundos > 60){
        let nuevoValorSegundos = Number(segundos) - 60
        if (nuevoValorSegundos < 10){
            objetosegundo.value = `0${nuevoValorSegundos}`
        }
        else {
            objetosegundo.value = nuevoValorSegundos;
        }
        
        if (Number(minutos) > 9){
            objetominuto.value = Number(minutos) + 1;
        }
        else if (minutos.length == 2 && minutos[0] == 0) {
            objetominuto.value = `0${Number(minutos[1]) + 1}`;
        }
        
    }
}

function limitarMinutos( evento ){
    const objetohora = document.getElementById('horas');
    const horas = objetohora.value;
    const objetominuto = evento.target
    const minutos = objetominuto.value;
   
    if (minutos === '0' || minutos === ''){
        objetominuto.value = '00';
    }

    if (minutos > 60){
        let nuevoValorMinutos = Number(minutos) - 60
        if (nuevoValorMinutos < 10){
            objetominuto.value = `0${nuevoValorMinutos}`
        }
        else {
            objetominuto.value = nuevoValorMinutos;
        }
        
        if (Number(horas) > 9){
            objetohora.value = Number(horas) + 1;
        }
        else if (horas.length == 2 && horas[0] == 0) {
            objetohora.value = `0${Number(horas[1]) + 1}`;
        }
    }
}

function mantenerFormato( evento ){
    const objetohora = evento.target;
    const horas = objetohora.value;

    if (horas === '0' || horas === ''){
        objetohora.value = '00';
    }
}

const botonMasSegundos = document.getElementById('BotonMasSegundos');
const botonMenosSegundos = document.getElementById('BotonMenosSegundos');

const bontonMasMinutos = document.getElementById('botonMasMinutos');
const bontonMenosMinutos = document.getElementById('botonMenosMinutos');

const bontonMasHoras = document.getElementById('botonMasHoras');
const bontonMenosHoras = document.getElementById('botonMenosHoras');

botonMasSegundos.addEventListener('click', () => {
    incrementar( segundos );
});
botonMenosSegundos.addEventListener('click', () => {
    decrementar( segundos );
});

bontonMasMinutos.addEventListener('click', () => {
    incrementar( minutos );
})
bontonMenosMinutos.addEventListener('click', () => {
    decrementar( minutos );
})

bontonMasHoras.addEventListener('click', () => {
    incrementar( horas );
})
bontonMenosHoras.addEventListener('click', () => {
    decrementar( horas );
})


function incrementar( input ){
    let tiempo = Number(input.value);
    if (tiempo < 60) {
        if (tiempo < 9){
            input.value = `0${++tiempo}`;
        }
        else {
            ++input.value
        }
    }
    
}

function decrementar( input ){
    let tiempo = Number(input.value);
    if (tiempo > 0){
        if (tiempo <= 10){
            input.value = `0${--tiempo}`;
        }
        else {
            --input.value
        }
    }
    
}

const botonNuevo = document.getElementById('botonNuevo');
botonNuevo.addEventListener('click', function(){
    segundos.value = '00'
    minutos.value = '00'
    horas.value = '00'
})

let idIntervalo, segundosTotales, segundosRestantes, idParpadeoPantalla;
const contenedor = document.getElementById('temporizador');

const BotonEmpezar = document.getElementById('botonEmpezar');
BotonEmpezar.addEventListener('click', function(){
    segundosTotales = (Number(horas.value) * 3600) + (Number(minutos.value) * 60) + Number(segundos.value);
    if (segundosTotales <= 0 && this.innerHTML == 'Empezar') alert('Por favor ingre un tiempo mayor a 0')
    else {
        if (this.innerHTML == 'Stop') 
        {
            parar();
            paraParpadeo();
            permitirModificaciones();
            
        }
        else {
            
            // segundosRestantes;
            idIntervalo = setInterval(() => {
                
                if (segundosTotales > 0) 
                {
                    segundosTotales--
                    console.log(segundosTotales)
                    // formatearMensaje(parseInt(segundosTotales / 3600), horas);
                    // alert('hora')
                    formatoTiempoCorriendo( horas, parseInt(segundosTotales / 3600) )
                    // horas.value = parseInt(segundosTotales / 3600);
                    segundosRestantes = segundosTotales % 3600;
                    console.log(segundosRestantes)
                    // formatearMensaje(parseInt(segundosRestantes / 60), minutos);
                    // alert('minutos')
                    formatoTiempoCorriendo( minutos, parseInt(segundosRestantes / 60) )
                    // minutos.value = parseInt(segundosRestantes / 60);
                    segundosRestantes = segundosRestantes % 60;
                    console.log(segundosRestantes)
                    // formatearMensaje(segundosRestantes, segundos)
                    // alert('segundos')
                    formatoTiempoCorriendo( segundos, segundosRestantes);
                    // segundos.value = segundosRestantes;
                }
                else {
                    clearInterval(idIntervalo);
                    mensajeTiempoTerminado()
                    idParpadeoPantalla = parpadearPantalla();
                    
                }
            }, 1000)
            permitirModificaciones();
            
        }
        this.innerHTML = this.innerHTML == 'Empezar' ? 'Stop' : 'Empezar';
    }
    

})

function parpadearPantalla(){
    contenedor.id = 'rojo';
    let id = setInterval(() => {
        contenedor.id = contenedor.id == 'temporizador' ? 'rojo' : 'temporizador'
    }, 1000);
    
    return id;
}

function paraParpadeo(){
    clearInterval(idParpadeoPantalla);
    contenedor.id = 'temporizador';
}

function formatoTiempoCorriendo( input, tiempo ){
    
    if (Number(tiempo) <= 9){
        
        input.value = `0${tiempo}`;
        
    }
    else {
        
        input.value = tiempo;
    }
}

function parar() {
    clearInterval(idIntervalo)
    formatoTiempoCorriendo( horas, parseInt(segundosTotales / 3600) )
    segundosRestantes = segundosTotales % 3600;
    formatoTiempoCorriendo( minutos, parseInt(segundosRestantes / 60) )
    segundosRestantes = segundosRestantes % 60;
    formatoTiempoCorriendo( segundos, segundosRestantes);
    if (!sonido.paused) 
    {
        sonido.pause()
    }
}

const sonido = document.getElementById('sonidoAviso');
function mensajeTiempoTerminado(){
    sonido.loop = true;
    sonido.play();
}

function permitirModificaciones(){
    let botones = document.getElementsByClassName('boton');
    for (let boton of botones){
        if (boton.id != 'botonEmpezar'){
            boton.disabled = boton.disabled === true ? false : true;
        }
    }
    let inputs = document.getElementsByTagName('input');
    for (let input of inputs) {
        input.readOnly = input.readOnly === true ? false : true;
    }
    
}







