//Ejercicio: Array y Objetos 
//1 Array (listas)
//Crea una lista de tus 3 comidas favoritas 
let comidasFavoritas = ["Pizza", "Sushi", "Tacos"];

//2 Objeto (key y value)
//Crea un objeto que represente a una persona con las siguientes propiedades: nombre, edad, ciudad
let persona = {
    nombre: "Juan",
    edad: 30,
    ciudad: "Madrid",
    habilidades: ["programación", "dibujo", "ciclismo"],
    estatura: 1.75,
    programador: true
};
//Como accedo a la propiedad nombre de mi objeto persona
console.log(persona.nombre);

//Como accedo a la propiedad habilidades de mi objeto persona
console.log(persona.habilidades); 

//Como accedo a la habilidad de dibujo de mi objeto persona 
console.log(persona.habilidades[1]);

//3. array de objetos
//Crea una lista de 3 alumnos dandole el contexto que son alumnos con nombre y calificacion 
let alumnos = [
    { nombre: "Ana", calificacion: 85 },
    { nombre: "Luis", calificacion: 92 },
    { nombre: "Marta", calificacion: 78 },
    {nombre: "Carlos",}
];
//Escribre un bucle que recorra el array de alumnos e imprima solo los que tengan una calificacion mayor a 80
for (let i = 0; i < alumnos.length; i++) {
    if (alumnos[i].calificacion > 80) {
        console.log(alumnos[i].nombre + " tiene una calificación mayor a 80: " + alumnos[i].calificacion);
    }
}