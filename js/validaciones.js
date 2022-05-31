/*
No es una buena practica hacer un querySelector por cada input 
vamos a querer que nuestro código sea lo mas reutilizable posible 

const inputNombre = document.querySelector("#nombre"); 

inputNombre.addEventListener("blur", (evento)=>{
    validarLongitudInput(evento.target, 40);
})


*/

//=> data-tipo
//exporto par apoder usarlo en otros archivos 
export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    //verificar si cada uno de los input existen dentro de los validadores
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    console.log(input.parentElement);
    
    if(input.validity.valid){ //si es valid = true quiero que quite la clase
        input.parentElement.classList.remove("input-contacto-error");
        input.parentElement.querySelector(".input-mensaje-error").innerHTML= ""
    }else{ // valid = false,  que la agrege
        input.parentElement.classList.add("input-contacto-error");
        input.parentElement.querySelector(".input-mensaje-error").innerHTML = mostrarMensajeDeError(tipoDeInput,input)
    }

}

//arreglo 
const tipoErrores =[
    "valueMissing",
    "customError",
];

const mensajeDeError = {
    nombre:{
        valueMissing: "El campo nombre no puede estar vacio",
        customError: "No puede contener mas de 3 caracteres",
    },

    mensaje:{
        valueMissing: "El campo mensaje no puede estar vacio",
        customError: "No puede contener mas de 120 caracteres",
    }
}

//objeto
// nombreTipo -> funcion que recibe
const validadores={
    nombre: (input) => validarLongitudNombre(input),
    mensaje:(input) => validarLongitudMensaje(input),
};


function mostrarMensajeDeError(tipoInput, input){
    let mensaje = ""
    tipoErrores.forEach(error =>{
        if(input.validity[error]){
            console.log(tipoInput, error);
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoInput][error]);

            mensaje = mensajeDeError[tipoInput][error];
        }
    });

    return mensaje;
}
//accedo al valor del input no al objeto
//nombre <= 40
//msj <= 120
function validarLongitudNombre(input){
    const nombre = input.value;
    let msj = "";
    if(nombre.length > 40 ){
        msj = "No puede contener mas de 3 caracteres";
    }
    input.setCustomValidity(msj);
}

function validarLongitudMensaje(input){
    const mensaje = input.value;
    let msj = "";
    if(mensaje.length > 120){
        msj ="No puede contener mas de 120 caracteres";
    }

    input.setCustomValidity(msj);
}