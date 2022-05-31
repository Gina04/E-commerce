import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input"); // me regresa un arreglo

//y como todo arreglo los podemos iterar y aplico a cada input addEventListener
inputs.forEach(input => {
    input.addEventListener('blur', input =>{
        valida(input.target);
    })
})