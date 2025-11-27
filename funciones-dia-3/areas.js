//Crea una funcion para calcular el area de un circulo dado su radio
/**
 * Calcula el área de un círculo dado su radio.
 * 
 * @param {number} radio - El radio del círculo en unidades de medida.
 * @returns {number} El área del círculo calculada usando la fórmula: π * r²
 * 
 * @example
 * // Calcula el área de un círculo con radio 5
 * areaCirculo(5); // retorna aproximadamente 78.54
 */
function areaCirculo(radio) {
    return Math.PI * Math.pow(radio, 2);
}
//Crea una funcion para calcular el area de un rectangulo dado su base y altura
/**
 * Calcula el área de un rectángulo.
 * @param {number} base - La base del rectángulo en unidades de medida.
 * @param {number} altura - La altura del rectángulo en unidades de medida.
 * @returns {number} El área del rectángulo (base * altura).
 * @example
 * // Retorna 20
 * areaRectangulo(4, 5);
 */
function areaRectangulo(base, altura) {
    return base * altura;
}
//vamos a calcular el volumen de un cilindro
//el volumen es area de la base (circulo) * altura
/**
 * Calcula el volumen de un cilindro multiplicando el área de la base circular por la altura.
 * 
 * @param {number} radio - El radio de la base circular del cilindro en unidades lineales
 * @param {number} altura - La altura del cilindro en unidades lineales
 * @returns {number} El volumen del cilindro en unidades cúbicas
 * 
 * @example
 * // Calcular el volumen de un cilindro con radio 5 y altura 10
 * const volumen = volumenCilindro(5, 10);
 * console.log(volumen); // Resultado: aproximadamente 785.4 (usando π ≈ 3.14159)
 */
function volumenCilindro(radio, altura) {
    var areaBase = areaCirculo(radio);
    return areaBase * altura;
}
/**
 * Calcula la derivada de un término polinomial de la forma ax^n.
 * La derivada de ax^n es n*a*x^(n-1)
 * 
 * @param {number} a - El coeficiente del término
 * @param {number} n - El exponente del término
 * @param {number} x - El valor de x en el que evaluar la derivada
 * @returns {number} El valor de la derivada en el punto x
 * 
 * @example
 * // Derivada de 3x^2 en x=4: 2*3*4^(2-1) = 24
 * derivadaPolinomial(3, 2, 4); // retorna 24
 */
function derivadaPolinomial(a, n, x) {
    return n * a * Math.pow(x, n - 1);
/**
 * Calcula la integral de un término polinomial de la forma ax^n.
 * La integral de ax^n es (a/n+1)x^(n+1) + C, donde C es la constante de integración.
 * 
 * @param {number} a - El coeficiente del término
 * @param {number} n - El exponente del término
 * @returns {string} La expresión de la integral en forma de cadena
 * 
 * @example
 * // Integral de 3x^2: (3/3)x^(2+1) + C = x^3 + C
 * const integral = integralPolinomial(3, 2);
 * console.log(integral); // Resultado: "1x^3 + C"
 */
function integralPolinomial(a, n) {
    const nuevoCoeficiente = a / (n + 1);
    const nuevoExponente = n + 1;
    return `${nuevoCoeficiente}x^${nuevoExponente} + C`;
}
}
