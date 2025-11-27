//Ejercicio: Deteccion de Palíndromos
//Objetivo: crea una logica compleja encapsulada en una funcion
//un ejemplo de palindromo es "anilina" o "reconocer", oso 
//1. Crea una funcion llamada esPalindromo que reciba un texto y retorne true si es un palindromo y false si no lo es
function esPalindromo(texto) {
    // Eliminar espacios y convertir a minúsculas para una comparación precisa
    const textoLimpio = texto.replace(/\s+/g, '').toLowerCase();
    // Obtener la longitud del texto limpio
    const longitud = textoLimpio.length;
    // Comparar caracteres desde el inicio y el final hacia el centro
    for (let i = 0; i < longitud / 2; i++) {
        if (textoLimpio[i] !== textoLimpio[longitud - 1 - i]) {
            return false; // No es un palíndromo
        }
    }
    return true; // Es un palíndromo
}
