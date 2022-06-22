let palabraRandom = ["COMPUTADORA", "PROGRAMACION", "JUEGO", "TECNOLOGIA", "ROBOT", "PAGINA", "TECLADO", "CELULAR", "MONITOR", "MOUSE", "NOTEBOOK", "PARLANTE", "IMPRESORA", "LASER", "CODIGO", "DOMINIO", "VARIABLE", "FUNCION", "CONSTANTE", "CADENA", "OBJETO", "ELEMENTO", "CLASE", "LISTA", "ESTILO", "IDENTIFICADOR", "ETIQUETA", "VALOR", "ARREGLO", "PALABRA", "OPERACION", "CALCULADORA", "MATEMATICA", "ALGORITMO", "NUMERO", "CONSOLA", "CONDICION", "RESULTADO", "INTERNET", "JUGADOR", "ENTRADA", "SALIDA", "TRANSFERENCIA", "LOGICA", "BLOCKCHAIN", "CRIPTOMONEDA", "DESARROLLADOR", "JAVASCRIPT", "SINTAXIS", "SEMANTICA", "NAVEGADOR", "SOFTWARE", "HARDWARE", "MAQUINA", "ARITMETICA", "INTELIGENCIA", "ARTIFICIAL", "BUCLE", "ENTIDAD", "NUCLEO", "PROCESADOR", "NOMENCLATURA", "AXIOMA", "LENGUAJE", "MARCADO", "HIPERTEXTO", "ITERACION", "BOOLEANO"];

let filtro;
let palabraSecreta;
let letrasPalabraSecreta;
let intentosRestantes;
let intentosRestantesHTML = document.querySelector(".intentos-restantes");
let letrasTeclado = document.querySelector(".lista-letras").childNodes;
let camposPalabra = document.querySelector(".palabra");
let campoLetra;

let botonNuevaPalabra = document.querySelector(".nueva-palabra");
botonNuevaPalabra.addEventListener('click', function() {
    filtro = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    palabraSecreta = palabraRandom[Math.floor(Math.random() * palabraRandom.length)];
    letrasPalabraSecreta = 0;
    intentosRestantes = 8;
    intentosRestantesHTML.innerHTML = "Intentos restantes: " + intentosRestantes;
    botonRendirse.classList.remove("botonOff");
    
    letrasTeclado.forEach(element => {
        element.className = "letra";
    });

    while(camposPalabra.firstChild) {
        camposPalabra.removeChild(camposPalabra.lastChild);
    }    

    for(let i = 0; i < palabraSecreta.length; i++) {
        campoLetra = document.createElement("span");
        campoLetra.classList.add("campo-letras");
        camposPalabra.appendChild(campoLetra);
    }
    dibujarBaseHorca();
});

var botonRendirse = document.querySelector(".rendirse");
botonRendirse.addEventListener('click', function() {
    intentosRestantesHTML.innerHTML = " Perdiste";
    for(let i = 0; i < palabraSecreta.length; i++) {
        camposPalabra.childNodes[i].innerHTML = palabraSecreta[i];
        camposPalabra.childNodes[i].className = "palabra-ahorcado-mal";
    }
    inhabilitar();
    dibujarAhorcado();
});

function inhabilitar() {
    botonRendirse.classList.add("botonOff");
    filtro = "";
    letrasTeclado.forEach(element => {
        element.className = "letra-bloqueada";
    });
}

function mostrarPalabraSecreta() {
    for(let i = 0; i < palabraSecreta.length; i++) {
        if(letrasPalabraSecreta == palabraSecreta.length) {
            camposPalabra.childNodes[i].className = "palabra-ahorcado-bien";
            intentosRestantesHTML.innerHTML = "Ganaste la partida, sos muy bueno! <br>";
            inhabilitar();
            dibujarSalvado();
        }
        if(intentosRestantes == 0) {
            camposPalabra.childNodes[i].innerHTML = palabraSecreta[i];
            camposPalabra.childNodes[i].className = "palabra-ahorcado-mal";
            intentosRestantesHTML.innerHTML = "Perdiste, volve a intentarlo <br>😰 ";
            inhabilitar();
            dibujarAhorcado();
        }
    }
}

function introducirLetras(key) {    
    let idLetra = "#" + key;
    let keyLetra = document.querySelector(idLetra);

    if(palabraSecreta.includes(key)) {
        for(let i = 0; i < palabraSecreta.length; i++) {
            if(key == palabraSecreta[i]) {
                letrasPalabraSecreta++;
                camposPalabra.childNodes[i].innerHTML = palabraSecreta[i];
                keyLetra.className = "letra-correcta";
            }            
        }    
    } else {
        intentosRestantes--;
        intentosRestantesHTML.innerHTML = "Intentos restantes: " + intentosRestantes;
        keyLetra.className = "letra-incorrecta";
        dibujarCanvas(intentosRestantes);
    }
    mostrarPalabraSecreta();
}

let keyLetra = document.querySelectorAll(".letra");
    keyLetra.forEach(letra => {
    letra.addEventListener('click', function(event) {
        var key = event.target.textContent;
        introducirLetras(key);
    });
});

let teclaPresionada = document.querySelector("html");
teclaPresionada.addEventListener("keydown", function(event) {
    let key = event.key.toUpperCase();
    if(filtro.includes(key)) {
        introducirLetras(key);
        filtro = filtro.replace(key, '');
    }
});